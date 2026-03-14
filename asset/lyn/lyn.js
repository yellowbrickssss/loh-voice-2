const LYN_DATA =[
        {
        id: "water_lyn",
        name: "린",
        element: "water",
        title: "축복받은 창조자",
        image: "asset/lyn/water_lyn.png",
        voices: [
            {
                id: "v_auto_1773453919",
                label: "자기소개",
                transcript: "필요한 연성품이 있으면 언제든 말씀하세요. 아, 재료는 있어야 해요.",
                audio: "asset/lyn/린-물/물-린 자기소개.mp3"
            },
            {
                id: "v_auto_1773453570",
                label: "영웅 영입",
                transcript: "린 블레이크는 로드에게 충성을 바칠 것을 굳게 다짐합니다. 저 말 안 틀렸죠?",
                audio: "asset/lyn/린-물/물-린 영입.mp3"
            },
            {
                id: "v_auto_1773453598",
                label: "영웅 영입 2",
                transcript: "새삼스럽지만 잘 부탁해요, 로드.",
                audio: "asset/lyn/린-물/물-린 영입 (1).mp3"
            },
            {
                id: "v_auto_1773453658",
                label: "영웅 초월 1",
                transcript: "로드, 앞으로도 곁에서 힘이 되어 드릴게요!",
                audio: "asset/lyn/린-물/물-린 초월.mp3"
            },
            {
                id: "v_auto_1773453741",
                label: "영웅 초월 2",
                transcript: "오오! 심기일전이에요!",
                audio: "asset/lyn/린-물/물-린 초월 (1).mp3"
            },
            {
                id: "v_auto_1773453676",
                label: "영웅 초월 3",
                transcript: "로드, 저 좀 더 성장했어요!",
                audio: "asset/lyn/린-물/물-린 초월 (2).mp3"
            },
            {
                id: "v_auto_1773453766",
                label: "영웅 초월 4",
                transcript: "나 자신을 넘어서는 것이 최고의 성장 아닐까요?",
                audio: "asset/lyn/린-물/물-린 초월 (3).mp3"
            },
                        {
                id: "v_auto_1773454071",
                label: "영웅 각성 1",
                transcript: "로드한테 도움이 될 수 있어서 기뻐요.",
                audio: "asset/lyn/린-물/물-린 각성.mp3"
            },
            {
                id: "v_auto_1773454095",
                label: "영웅 각성 2",
                transcript: "우와, 저 또 성장했어요? 너무 빠르지 않나?",
                audio: "asset/lyn/린-물/물-린 각성 (1).mp3"
            },
            {
                id: "v_auto_1773454127",
                label: "영웅 각성 3",
                transcript: "로드, 로드! 보세요, 저 어때 보여요?",
                audio: "asset/lyn/린-물/물-린 각성 (2).mp3"
            },
            {
                id: "v_auto_1773454162",
                label: "타이틀콜",
                transcript: "Lord Of Heroes.",
                audio: "asset/lyn/린-물/물-린 타이틀콜.mp3"
            }
        ]
    }
]

if (typeof window !== "undefined") {
    if (!Array.isArray(window.HERO_DATA)) {
        window.HERO_DATA = [];
    }
    window.HERO_DATA.push(...LYN_DATA);
}