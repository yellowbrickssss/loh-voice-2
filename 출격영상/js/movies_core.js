/* Movies Core Logic - Adapted from player_engine.js */

// Global state
var playlistAudio; // Will be the video element
var isPlaylistPlaying = false;
var currentTrackIndex = 0;
var repeatMode = 0; // 0: Off, 1: Loop All, 2: Repeat One
var isShuffle = false;

// Expose state
window.isPlaylistPlaying = isPlaylistPlaying;
window.currentTrackIndex = currentTrackIndex;

// --- Utility Functions ---
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return mins + ':' + (secs < 10 ? '0' : '') + secs;
}

function escapeHtml(text) {
    if (typeof text !== 'string') return '';
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// --- UI Sync Functions ---
function setPlayIcons(isPlaying) {
    const lpBtn = document.getElementById('p-play-btn');
    if (lpBtn) lpBtn.innerHTML = isPlaying ? '<i class="fa-solid fa-pause"></i>' : '<i class="fa-solid fa-play"></i>';
}

function syncLPPlayer(track) {
    // 1. Update Title & Artist
    const pTitle = document.getElementById('p-title');
    const pArtist = document.getElementById('p-artist');
    if (pTitle) pTitle.innerText = track.title || '';
    if (pArtist) pArtist.innerText = track.artist || '';

    // 2. Update LP Label Image
    const lpLabel = document.getElementById('lp-label-img');
    if (lpLabel && track.cover) {
        lpLabel.src = track.cover;
        
        // 3. Trigger Color Extraction (using global function from soundwave_all.js)
        if (typeof window.extractPointColor === 'function' && typeof window.updateVinylColor === 'function') {
            // Use setTimeout to ensure image load start or just call it
            // soundwave_all.js extractPointColor handles image loading internally
            window.extractPointColor(track.cover, window.updateVinylColor);
        }
    }
}

function syncPlaylistActive() {
    document.querySelectorAll('.lp-pl-item').forEach(function(el) {
        var idx = parseInt(el.getAttribute('data-track-index'), 10);
        if (idx === currentTrackIndex) el.classList.add('active');
        else el.classList.remove('active');
    });
}

function syncLPSlidingState() {
    const lpPlayer = document.getElementById('lp-player');
    const lpDisc = document.querySelector('.lp-disc');
    if (!lpPlayer || !lpDisc) return;

    if (isPlaylistPlaying) {
        lpPlayer.classList.add('playing');
        // Ensure the slide-out animation (left: 35%) is applied via CSS class
    } else {
        lpPlayer.classList.remove('playing');
    }
}

function syncAllUI() {
    if (typeof playlistData === 'undefined' || !playlistData[currentTrackIndex]) return;
    var track = playlistData[currentTrackIndex];
    
    syncLPPlayer(track);
    syncPlaylistActive();
    setPlayIcons(isPlaylistPlaying);
    syncLPSlidingState();
}

// --- Track Control ---
function loadTrack(index) {
    if (index < 0 || index >= playlistData.length) return;

    currentTrackIndex = index;
    window.currentTrackIndex = index;
    var track = playlistData[index];
    if (!track) return;

    // 1. Set Video Source
    if (playlistAudio) {
        // Encode URI to handle spaces in filenames
        playlistAudio.src = encodeURI(track.video);
        playlistAudio.load(); // Important for video
    }

    // 2. Set Soundwave Source (if available)
    if (window.soundwaveInstance && window.soundwaveInstance.setTrackUrl) {
         // Pass the video URL. The library might try to fetch/decode it.
         window.soundwaveInstance.setTrackUrl(track.video);
    }

    // 3. Play
    if (playlistAudio) {
        var playPromise = playlistAudio.play();
        if (playPromise !== undefined) {
            playPromise.then(function() {
                isPlaylistPlaying = true;
                window.isPlaylistPlaying = true;
                syncAllUI();
            }).catch(function(error) {
                console.warn("Playback prevented:", error);
                isPlaylistPlaying = false;
                syncAllUI();
            });
        }
    }
}

function prevTrack() {
    var nextIndex = currentTrackIndex - 1;
    if (nextIndex < 0) nextIndex = playlistData.length - 1;
    loadTrack(nextIndex);
}

function nextTrack() {
    if (isShuffle) {
        let nextIndex = Math.floor(Math.random() * playlistData.length);
        if (playlistData.length > 1 && nextIndex === currentTrackIndex) {
            nextIndex = (nextIndex + 1) % playlistData.length;
        }
        loadTrack(nextIndex);
        return;
    }
    var nextIndex = currentTrackIndex + 1;
    if (nextIndex >= playlistData.length) nextIndex = 0;
    loadTrack(nextIndex);
}

function togglePlaylistAudio() {
    if (!playlistAudio) return;
    
    if (isPlaylistPlaying) {
        playlistAudio.pause();
        isPlaylistPlaying = false;
        syncAllUI();
    } else {
        // If source is empty, load first track
        if (!playlistAudio.src || playlistAudio.src === "" || playlistAudio.src === window.location.href) {
            loadTrack(0);
        } else {
            playlistAudio.play().then(function() {
                isPlaylistPlaying = true;
                syncAllUI();
            }).catch(function(e) {
                console.warn("Play failed", e);
            });
        }
    }
}

// --- Seek Bar & Progress ---
function updatePhoneProgress() {
    if (!playlistAudio || !playlistAudio.duration) return;
    
    var pct = (playlistAudio.currentTime / playlistAudio.duration) * 100;
    var progressBar = document.getElementById('phone-progress');
    if (progressBar) progressBar.style.width = pct + '%';
    
    var curTimeEl = document.getElementById('phone-current-time');
    var totTimeEl = document.getElementById('phone-total-time');
    
    if (curTimeEl) curTimeEl.textContent = formatTime(playlistAudio.currentTime);
    if (totTimeEl) totTimeEl.textContent = formatTime(playlistAudio.duration);
}

function seekPlaylistAudio(clientX) {
    var bar = document.getElementById('phone-progress-bar');
    if (!bar || !playlistAudio || !playlistAudio.duration) return;
    
    var rect = bar.getBoundingClientRect();
    var x = (typeof clientX === 'number') ? clientX - rect.left : 0;
    var percent = Math.max(0, Math.min(1, x / rect.width));
    playlistAudio.currentTime = percent * playlistAudio.duration;
}

// --- Soundwave Initialization ---
function initSoundwaveForMovies() {
    if (typeof Soundwave === 'undefined') return;
    var container = document.getElementById('lp-soundwave');
    if (!container) return;

    if (window.soundwaveInstance && typeof window.soundwaveInstance.destroy === 'function') {
        window.soundwaveInstance.destroy();
        window.soundwaveInstance = null;
    }

    // Logic from player_engine.js (lines 522-544)
    var isDesktop = typeof window.matchMedia === 'function' && window.matchMedia('(min-width: 1200px)').matches;
    var isSmallMobile = typeof window.matchMedia === 'function' && window.matchMedia('(max-width: 440px)').matches;
    var innerRadius = isDesktop ? 132 : (isSmallMobile ? 75 : 85);

    // EXACT Configuration from player_engine.js
    window.soundwaveInstance = Soundwave.create(container, playlistAudio, {
        mode: 'realtime',
        style: {
            layout: 'ring',
            ringStyle: 'spectrum',
            ringCenter: [0.5, 0.5],
            spectrumNumPoints: 100,
            spectrumWaveAmp: 0.1,
            glowBlur: 18,
            spectrumRotationOffset: (22.5 * Math.PI / 180),
            spectrumInnerRadius: innerRadius,
            ripple: false,
            colors: {
                spectrumFillBlue: 'rgba(255, 255, 255, 0.95)', 
                spectrumFillGold: 'rgba(255, 255, 255, 0.95)',
                spectrumGlow: 'rgba(255, 255, 255, 0.8)'
            }
        }
    });

    // Initial Track URL for Soundwave (if available)
    if (typeof playlistData !== 'undefined' && playlistData[currentTrackIndex]) {
        var t = playlistData[currentTrackIndex];
        if (t && t.video && window.soundwaveInstance && window.soundwaveInstance.setTrackUrl) {
            window.soundwaveInstance.setTrackUrl(t.video);
        }
    }
}


// --- Main Initialization ---
var isPlaylistInitialized = false;
function initPlaylist() {
    if (isPlaylistInitialized) return;
    isPlaylistInitialized = true;

    // 1. Get Video Element
    playlistAudio = document.getElementById('tv-video-player');
    if (!playlistAudio) {
        console.error("Video element #tv-video-player not found!");
        return;
    }
    
    // 2. Event Listeners
    playlistAudio.addEventListener('timeupdate', updatePhoneProgress);
    playlistAudio.addEventListener('ended', function() {
        if (repeatMode === 2) {
            // Repeat One
            playlistAudio.currentTime = 0;
            playlistAudio.play();
        } else if (repeatMode === 1) {
            // Loop All
            nextTrack();
        } else {
            // Off (No Repeat)
            // Check if it is the last track
            if (currentTrackIndex < playlistData.length - 1) {
                nextTrack();
            } else {
                // Stop playback
                isPlaylistPlaying = false;
                window.isPlaylistPlaying = false;
                syncAllUI();
            }
        }
    });
    // On play/pause, update UI state
    playlistAudio.addEventListener('play', function() {
        isPlaylistPlaying = true;
        window.isPlaylistPlaying = true;
        syncAllUI();
    });
    playlistAudio.addEventListener('pause', function() {
        isPlaylistPlaying = false;
        window.isPlaylistPlaying = false;
        syncAllUI();
    });

    // 3. Render Playlist Items
    const listContainer = document.getElementById('lp-playlist-list');
    if (listContainer && typeof playlistData !== 'undefined') {
        listContainer.innerHTML = '';
        playlistData.forEach((track, i) => {
            const item = document.createElement('div');
            item.className = 'lp-pl-item';
            item.setAttribute('data-track-index', i);
            item.onclick = function() { loadTrack(i); }; // Use function wrapper
            
            const idxDiv = document.createElement('div');
            idxDiv.className = 'lp-pl-idx';
            idxDiv.innerText = String(i + 1).padStart(2, '0');
            
            const infoDiv = document.createElement('div');
            infoDiv.className = 'lp-pl-info';
            
            const titleDiv = document.createElement('div');
            titleDiv.className = 'lp-pl-title';
            titleDiv.innerText = track.title;
            
            const artistDiv = document.createElement('div');
            artistDiv.className = 'lp-pl-artist';
            artistDiv.innerText = track.artist;
            
            infoDiv.appendChild(titleDiv);
            infoDiv.appendChild(artistDiv);
            
            item.appendChild(idxDiv);
            item.appendChild(infoDiv);
            
            listContainer.appendChild(item);
        });
    }

    // 4. Initialize Soundwave
    initSoundwaveForMovies();

    // 5. Initial UI Sync (load first track info without playing)
    if (playlistData.length > 0) {
        // Just set src but don't play
        playlistAudio.src = encodeURI(playlistData[0].video);
        // Removed explicit pause() to prevent "interrupted by a call to pause" error
        // since we haven't called play() yet, it shouldn't auto-play without autoplay attribute.
        
        // Also trigger color extraction for the first track
        syncLPPlayer(playlistData[0]);
        // Set active class
        syncPlaylistActive();
    }
}

// Expose to window
window.initPlaylist = initPlaylist;
window.prevTrack = prevTrack;
window.nextTrack = nextTrack;
window.togglePlaylistAudio = togglePlaylistAudio;
window.seekPlaylistAudio = seekPlaylistAudio;
window.toggleRepeat = function() {
    // Cycle: 0 (Off) -> 1 (Loop All) -> 2 (Repeat One) -> 0
    repeatMode = (repeatMode + 1) % 3;
    
    // UI Update
    const btn = document.querySelector('.lp-ctrl-side i.fa-repeat')?.parentElement;
    if (btn) {
        // Reset basic state
        btn.classList.remove('active');
        btn.classList.remove('repeat-one');
        btn.innerHTML = '<i class="fa-solid fa-repeat"></i>';

        if (repeatMode === 1) {
            // Loop All
            btn.classList.add('active');
        } else if (repeatMode === 2) {
            // Repeat One
            btn.classList.add('active');
            btn.classList.add('repeat-one');
            // We use CSS to add the '1' via ::after, so we keep the icon as is
        }
    }
};

window.toggleShuffle = function() {
    isShuffle = !isShuffle;
    const btn = document.querySelector('.lp-ctrl-side i.fa-shuffle')?.parentElement;
    if (btn) {
        if (isShuffle) btn.classList.add('active');
        else btn.classList.remove('active');
    }
};

// Auto-init on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPlaylist);
} else {
    initPlaylist();
}
