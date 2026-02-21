const KARTIS_DATA =[
        {
        id: "light_kartis",
        name: "카르티스",
        element: "light",
        title: "재앙의 대적자",
        image: "kartis/kartis.png",
        voices: [
        ]
    }
]

if (typeof window !== "undefined") {
    if (!Array.isArray(window.HERO_DATA)) {
        window.HERO_DATA = [];
    }
    window.HERO_DATA.push(...KARTIS_DATA);
}