export interface Game {
    title: string,
    review: string,
    genres: string[],
    url: string,
    image: string
}

export const games: Game[] = [
    {
        title: "The Talos Principle",
        review: "A first-person puzzle game with a philosophical story. The game has a lot of challenging but satisfying puzzles that require creative thinking. It's a game that presents a lot of interesting ideas and makes you think about the nature of reality and existence.",
        genres: ["Puzzle"],
        url: "https://store.steampowered.com/app/257510/The_Talos_Principle/",
        image: "./games/the-talos-principle.webp",
    },
    {
        title: "The Talos Principle 2",
        review: "The sequel to The Talos Principle. The game explores new philosophical themes and has a ton of new mechanics to explore in each level. The environments are stunning and showcase the power of Unreal Engine 5.",
        genres: ["Puzzle"],
        url: "https://store.steampowered.com/app/835960/The_Talos_Principle_2/",
        image: "./games/the-talos-principle-2.webp",
    },
    {
        title: "Half-Life: Alyx",
        review: "A virtual reality first-person shooter set in the Half-Life universe. The game has a great story and mechanics, arguably the best VR game I've played. Worth getting a VR headset just to play this game.",
        genres: ["Shooter"],
        url: "https://store.steampowered.com/app/546560/HalfLife_Alyx/",
        image: "./games/half-life-alyx.webp",
    },
    {
        title: "Celeste",
        review: "A challenging platformer with a touching story about anxiety and depression. The game is hard but fair, and it has a great soundtrack. The game's challenges and collectibles make it quite replayable, and it encourages speed runs.",
        genres: ["Platformer", "2D"],
        url: "https://store.steampowered.com/app/504230/Celeste/",
        image: "./games/celeste.webp",
    },
    {
        title: "Deep Rock Galactic",
        review: "A cooperative first-person shooter with mining elements. Like a combination of Minecraft and a first-person shooter. The game has a lot of variety in its missions because they are procedurally generated. Quite fun with friends.",
        genres: ["Shooter"],
        url: "https://store.steampowered.com/app/548430/Deep_Rock_Galactic/",
        image: "/games/deep-rock-galactic.webp",
    },
    /*
    {
        title: "Portal 2",
        review: "A first-person puzzle game with an interesting story and memorable characters. The game has a lot of puzzles that require creative thinking.",
        genres: ["Puzzle"],
        url: "https://store.steampowered.com/app/620/Portal_2/",
        image: "./games/portal-2.webp",
    },
    */
    {
        title: "Hades",
        review: "A roguelike dungeon crawler themed around Greek mythology with a great story and characters, something that's not common in the genre. The game has a lot of variety in its weapons and upgrades, which makes it very replayable.",
        genres: ["Roguelike"],
        url: "https://store.steampowered.com/app/1145360/Hades/",
        image: "./games/hades.webp",
    }
]