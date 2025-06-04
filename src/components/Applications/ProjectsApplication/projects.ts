export interface Project {
  name: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  repoUrl?: string;
  image: string;
}

export const projects: Project[] = [
  {
    name: "Ciudad Portuaria",
    description:
      "Web application made for CityLab Bío Bío and Puertos de Talcahuano that allows users to simulate the impact of various factors on the city of Talcahuano, Chile. It runs simulations and displays the results in a user-friendly way, allowing users to visualize the effects of different scenarios on the city, while allowing them to make changes as well.",
    technologies: [
      "React",
      "TypeScript",
      "React Router",
      "Zod",
      "Zustand",
      "HTML",
      "CSS",
    ],
    image: "/projects/ciudad-portuaria.webp",
  },
  {
    name: "Ferretería Cerro Colorado",
    description:
      "Single-page application made for a local hardware store. It allows the store to keep track of inventory and to sell products, generating Chilean SII DTEs (Documento Tributario Electrónico). It also allows the store to view sales reports, to see statistics, and more.",
    technologies: ["PHP", "Laravel", "MySQL", "Vue", "HTML", "CSS"],
    image: "/projects/ferreteria.webp",
  },
  {
    name: "Reviewizer",
    description:
      "Web Application that lets you search Steam games to get an AI-generated summary of their reviews, listing their positives and negatives.",
    technologies: ["React", "TypeScript", "NextJS", "HTML", "CSS"],
    image: "/projects/reviewizer.webp",
    liveUrl: "https://reviewizer.miguelhiguera.dev",
    repoUrl: "https://github.com/MiguelHigueraDev/reviewizer",
  },
  {
    name: "URL Shortener",
    description:
      "URL shortener. Uses Spring Boot and Angular, providing a separation between backend and frontend. Links are stored in a Postgres database. Containerized in a Docker container.",
    technologies: ["Spring Boot", "Java", "Angular", "TypeScript", "Docker"],
    image: "/projects/shortener.webp",
    repoUrl: "https://github.com/MiguelHigueraDev/url-shortener",
  },
  {
    name: "dorg",
    description:
      "CLI tool that allows you to quickly organize files in a folder, creating folders and moving files so they are sorted by their creation date. Learned Rust just to make this.",
    technologies: ["Rust"],
    image: "/projects/dorg.webp",
    repoUrl: "https://github.com/MiguelHigueraDev/dorg",
  },
  {
    name: "Discord Card React",
    description:
      "React component that renders a Discord-style card. It can sync with your real Discord status, showing the games you play or the music you are listening to. Modular and customizable.",
    technologies: ["React", "TypeScript", "CSS", "HTML"],
    image: "/projects/discord-card.webp",
    liveUrl: "https://discord.miguelhiguera.dev/",
    repoUrl: "https://github.com/MiguelHigueraDev/discord-card-react",
  },
  {
    name: "MoodList",
    description:
      "Web application that uses the Spotify API to show recommendations based on your musical tastes and various parameters such as its energy level, positivity, etc.",
    technologies: ["Svelte", "HTML", "CSS"],
    image: "/projects/moodlist.webp",
    repoUrl: "https://github.com/MiguelHigueraDev/moodlist",
  },
  {
    name: "IP Log Filter",
    description:
      "Lightweight application that allows you to filter a list of IPs obtained from a log to easily ban using the IPTables syntax.",
    technologies: ["React", "HTML", "CSS"],
    image: "/projects/iplog.webp",
    liveUrl: "https://iplog-filter.vercel.app",
    repoUrl: "https://github.com/MiguelHigueraDev/ip-log-filter",
  },
];
