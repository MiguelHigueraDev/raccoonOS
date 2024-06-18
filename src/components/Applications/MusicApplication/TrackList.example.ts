// This is an example of how to use the TrackList component
// The actual TrackList isn't provided because of copyright reasons
// Fill in the TrackList with your own songs and covers
// And rename this file to TrackList.ts

// Export this TrackList to use it in the MusicApplication component
const TrackList: Track[] = [
    {
        name: "Cradles",
        artist: "Sub Urban",
        src: "./songs/cradles.mp3",
        coverArt: "./covers/cradles.jpg",
        lyrics: [
            {
                "startTimeMs": 12660,
                "text": "Enter lyrics here",
            },
            {
                "startTimeMs": 18690,
                "text": "With their timestamps in milliseconds",
            },
            {
                "startTimeMs": 24720,
                "text": "One",
            },
            {
                "startTimeMs": 30780,
                "text": "Two",
            },
            {
                "startTimeMs": 36780,
                "text": "Three",
            },
        ]
    },
    {
        name: "Bones",
        artist: "Imagine Dragons",
        src: "./songs/bones.mp3",
        coverArt: "./covers/bones.jpg",
    },
    {
        name: "Let It Be",
        artist: "The Beatles",
        src: "./songs/letitbe.mp3",
        coverArt: "./covers/letitbe.jpg",
    },
];

// Uncomment this section

// export interface Track {
//     name: string;
//     artist: string;
//     src: string;
//     coverArt: string;
//     lyrics?: Lyrics[];
// }
// 
// export interface Lyrics {
//     startTimeMs: number;
//     text: string;
// }