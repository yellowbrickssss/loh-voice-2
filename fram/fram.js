const FRAM_DATA =[
        {
        id: "water_fram",
        name: "프람",
        element: "water",
        title: "강철의 수호자",
        image: "asset/fram/water_fram.png",
        voices: [
                        {
                id: "v_auto_1772018041",
                label: "자기소개",
                transcript: "어떤 상대가 나와도 나에게 맡겨줘.",
                audio: "asset/fram/프람 - 물/물-프람_자기소개.mp3"
            },
            {
                id: "v_auto_1772018101",
                label: "영웅 영입 1",
                transcript: "프람 베르그, 언제까지나 변치 않는 충성을 맹세하겠어.",
                audio: "asset/fram/프람 - 물/물-프람_영웅영입1.mp3"
            },
            {
                id: "v_auto_1772018130",
                label: "영웅 영입 2",
                transcript: "내가 모두를 지킬게, 로드!",
                audio: "asset/fram/프람 - 물/물-프람_영웅영입2.mp3"
            },
            {
                id: "v_auto_1772018159",
                label: "영웅 영입 3",
                transcript: "모두에게 부끄럽지 않은 기사가 될게!",
                audio: "asset/fram/프람 - 물/물-프람_영웅영입3.mp3"
            },
            {
                id: "v_auto_1772018191",
                label: "영웅 초월 1",
                transcript: "이제 좀 더 성장할 수 있는 거야?",
                audio: "asset/fram/프람 - 물/물-프람_영웅초월1.mp3"
            },
            {
                id: "v_auto_1772018246",
                label: "영웅 초월 2",
                transcript: "한계 돌파! 고마워, 로드!",
                audio: "asset/fram/프람 - 물/물-프람_영웅초월2.mp3"
            },
            {
                id: "v_auto_1772018270",
                label: "영웅 초월 3",
                transcript: "강해질 수 있다는 건 기분 좋네!",
                audio: "asset/fram/프람 - 물/물-프람_영웅초월3.mp3"
            },
            {
                id: "v_auto_1772018311",
                label: "영웅 각성 1",
                transcript: "좋아. 로드의 힘이 될 수 있겠어!",
                audio: "asset/fram/프람 - 물/물-프람_영웅각성1.mp3"
            },
            {
                id: "v_auto_1772018341",
                label: "영웅 각성 2",
                transcript: "언제까지나 로드의 검이 될게!",
                audio: "asset/fram/프람 - 물/물-프람_영웅각성2.mp3"
            },
            {
                id: "v_auto_1772018375",
                label: "영웅 각성 3",
                transcript: "어라. 더 강해진 거야? 나 아무것도 안 했는데?",
                audio: "asset/fram/프람 - 물/물-프람_영웅각성3.mp3"
            },
            {
                id: "v_auto_1772018403",
                label: "타이틀 콜",
                transcript: "Lord Of Heroes.",
                audio: "asset/fram/프람 - 물/물-프람_타이틀콜.mp3"
            },
            {
                id: "v_auto_1772018736",
                label: "영웅 화면 1",
                transcript: "대련은 항상 실전 같이! 봐주는 건 없어!",
                audio: "asset/fram/프람 - 물/물-프람_영웅화면01.mp3"
            },
            {
                id: "v_auto_1772018754",
                label: "영웅 화면 2",
                transcript: "어? 무슨 일 있어?",
                audio: "asset/fram/프람 - 물/물-프람_영웅화면02.mp3"
            },
            {
                id: "v_auto_1772018764",
                label: "영웅 화면 2",
                transcript: "힘든 일이 있으면 언제든지 얘기해.",
                audio: "asset/fram/프람 - 물/물-프람_영웅화면03.mp3"
            },
            {
                id: "v_auto_1772018838",
                label: "영웅 화면 4",
                transcript: "어, 말투…? 고, 고쳐야 할까? 아아, 아니라면 다행이네!",
                audio: "asset/fram/프람 - 물/물-프람_영웅화면04.mp3"
            },
            {
                id: "v_auto_1772018865",
                label: "영웅 화면 5",
                transcript: "고기도 좋지만 감자 포타주가 제일 맛있지!",
                audio: "asset/fram/프람 - 물/물-프람_영웅화면05.mp3"
            },
            {
                id: "v_auto_1772018900",
                label: "영웅 화면 6",
                transcript: "산수 문제 같은 거 물어보지 마! 잘 못 한다고.",
                audio: "asset/fram/프람 - 물/물-프람_영웅화면06.mp3"
            },
            {
                id: "v_auto_1772018935",
                label: "영웅 화면 7",
                transcript: "듀렌달? 이거 물려받은 거라, 나도 잘 몰라.",
                audio: "asset/fram/프람 - 물/물-프람_영웅화면07.mp3"
            },
            {
                id: "v_auto_1772018958",
                label: "영웅 화면 8",
                transcript: "정말 시원한 전투가 뭔지 보여줄까?",
                audio: "asset/fram/프람 - 물/물-프람_영웅화면08.mp3"
            },
            {
                id: "v_auto_1772018991",
                label: "영웅 화면 9",
                transcript: "로드! 기다렸다고!",
                audio: "asset/fram/프람 - 물/물-프람_영웅화면09.mp3"
            },
            {
                id: "v_auto_1772019031",
                label: "영웅 화면 10",
                transcript: "어서 와, 로드! 왜 이렇게 늦었어?",
                audio: "asset/fram/프람 - 물/물-프람_영웅화면10.mp3"
            }
        ]
    }
]

if (typeof window !== "undefined") {
    if (!Array.isArray(window.HERO_DATA)) {
        window.HERO_DATA = [];
    }
    window.HERO_DATA.push(...FRAM_DATA);
}