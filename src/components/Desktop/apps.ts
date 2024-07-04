import DiscordApplication from '../Applications/DiscordApplication/DiscordApplication';
import ProjectsApplication from '../Applications/ProjectsApplication/ProjectsApplication';
import AboutMeApplication from '../Applications/AboutMeApplication/AboutMeApplication';
import TechApplication from '../Applications/TechApplication/TechApplication';
import ContactApplication from '../Applications/ContactApplication/ContactApplication';
import CreditsApplication from '../Applications/CreditsApplication/CreditsApplication';
import MusicApplication from '../Applications/MusicApplication/MusicApplication';
import ResumeApplication from '../Applications/ResumeApplication/ResumeApplication';
import GamesApplication from '../Applications/GamesApplication/GamesApplication';

export const apps: App[] = [
  {
    name: 'aboutMeApp',
    Component: AboutMeApplication,
    icon: './app-icons/aboutme.svg',
    title: 'About Me',
    position: { x: 20, y: 20 },
  },
  {
    name: 'projectsApp',
    Component: ProjectsApplication,
    icon: './app-icons/projects.svg',
    title: 'Projects',
    position: { x: 20, y: 120 },
  },
  {
    name: 'resumeApp',
    Component: ResumeApplication,
    icon: './app-icons/resume.svg',
    title: 'Resume',
    position: { x: 20, y: 320 },
  },
  {
    name: 'contactApp',
    Component: ContactApplication,
    icon: './app-icons/contact.svg',
    title: 'Contact',
    position: { x: 20, y: 220 },
  },
  {
    name: 'techApp',
    Component: TechApplication,
    icon: './app-icons/tech.svg',
    title: 'Tech',
    position: { x: 20, y: 420 },
  },
  {
    name: 'musicApp',
    Component: MusicApplication,
    icon: './app-icons/music.svg',
    title: 'Music',
    position: { x: 100, y: 220 },
  },
  {
    name: 'discordApp',
    Component: DiscordApplication,
    icon: './app-icons/discord.svg',
    title: 'Discord',
    position: { x: 100, y: 320 },
  },
  {
    name: 'gamesApp',
    Component: GamesApplication,
    icon: './app-icons/games.svg',
    title: 'Games',
    position: { x: 100, y: 420 },
  },
  {
    name: 'creditsApp',
    Component: CreditsApplication,
    icon: './app-icons/credits.svg',
    title: 'Credits',
    position: { x: 100, y: 20 },
  },
];

export interface App {
  name: string;
  icon: string;
  title: string;
  position: Position;
  Component: React.ComponentType<AppComponentProps>;
}

interface Position {
  x: number;
  y: number;
}

interface AppComponentProps {
  winProps: {
    appName: string;
    isOpen: boolean;
    isHidden: boolean;
    handleClose: () => void;
    handleHide: () => void;
    zIndex: number;
  };
}
