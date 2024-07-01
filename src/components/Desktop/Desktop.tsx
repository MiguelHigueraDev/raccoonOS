import { useEffect, useState } from 'react';
import AppIcon from '../AppIcon/AppIcon';
import classes from './Desktop.module.css';
import Taskbar from '../Taskbar/Taskbar';
import TaskbarIcon from '../TaskbarIcon/TaskbarIcon';
import MusicApplication from '../Applications/MusicApplication/MusicApplication';
import ResumeApplication from '../Applications/ResumeApplication/ResumeApplication';
import WindowStore from '../../stores/WindowStore';
import DiscordApplication from '../Applications/DiscordApplication/DiscordApplication';
import ProjectsApplication from '../Applications/ProjectsApplication/ProjectsApplication';
import AboutMeApplication from '../Applications/AboutMeApplication/AboutMeApplication';
import TechApplication from '../Applications/TechApplication/TechApplication';
import ContactApplication from '../Applications/ContactApplication/ContactApplication';
import CreditsApplication from '../Applications/CreditsApplication/CreditsApplication';
import MobileWarning from '../MobileWarning/MobileWarning';
import GamesApplication from '../Applications/GamesApplication/GamesApplication';
import PedroStore from '../../stores/PedroStore';

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

interface AppState {
  isOpen: boolean;
  isHidden: boolean;
}

interface AppStates {
  [key: string]: AppState;
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

const apps: App[] = [
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

const Desktop = () => {
  const { incZIndex, getZIndex } = WindowStore();
  const { stopPedroAudio } = PedroStore();

  const [numberOfOpenedApps, setNumberOfOpenedApps] = useState(0);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

  const [appStates, setAppStates] = useState<AppStates>(() =>
    apps.reduce((acc, app) => {
      // @ts-expect-error - Fix type later
      acc[app.name] = { isOpen: false, isHidden: false };
      return acc;
    }, {})
  );

  const handleOpenApp = (appName: string) => {
    incZIndex(appName);
    setAppStates((prevState) => ({
      ...prevState,
      [appName]: { isOpen: true, isHidden: false },
    }));
  };

  const handleTaskbarIconClick = (appName: string) => {
    incZIndex(appName);
    setAppStates((prevState) => ({
      ...prevState,
      [appName]: {
        ...prevState[appName],
        isHidden: !prevState[appName].isHidden,
      },
    }));
  };

  const toggleStartMenu = () => {
    // Disable the "Pedro" easter egg when clicking on this if it's active
    document.getElementById('background')?.classList.remove('pedro');
    document.getElementById('desktop')?.classList.remove('pedro-hides-desktop');
    stopPedroAudio();

    setIsStartMenuOpen(!isStartMenuOpen);
  };

  // Update the number of opened apps to display the start menu in the correct position
  useEffect(() => {
    setNumberOfOpenedApps(
      Object.values(appStates).filter((app) => app.isOpen).length
    );
  }, [setNumberOfOpenedApps, appStates]);

  return (
    <>
      <MobileWarning />
      <div id="desktop" className={classes.desktop}>
        {/* Desktop Icons */}
        {apps.map(({ name, icon, title, position }) => (
          <AppIcon
            key={name}
            onDoubleClick={() => handleOpenApp(name)}
            iconUrl={icon}
            name={title}
            position={position}
          />
        ))}

        {/* Hyperlinks */}
        <AppIcon
          onDoubleClick={() =>
            window.open('https://github.com/MiguelHigueraDev/raccoonOS')
          }
          iconUrl="./app-icons/github.svg"
          name="Source"
          position={{ x: 100, y: 120 }}
        />

        {/* Applications */}
        {apps.map(({ name, Component }) => (
          <Component
            key={name}
            winProps={{
              appName: name,
              isOpen: appStates[name].isOpen,
              isHidden: appStates[name].isHidden,
              handleClose: () =>
                setAppStates((prevState) => ({
                  ...prevState,
                  [name]: { ...prevState[name], isOpen: false },
                })),
              handleHide: () =>
                setAppStates((prevState) => ({
                  ...prevState,
                  [name]: { ...prevState[name], isHidden: true },
                })),
              zIndex: getZIndex(name),
            }}
          />
        ))}
      </div>
      <Taskbar
        appList={apps}
        numberOfOpenedApps={numberOfOpenedApps}
        isStartMenuOpen={isStartMenuOpen}
        handleToggleStartMenu={toggleStartMenu}
        handleOpenApp={handleOpenApp}
      >
        {/* Taskbar Icons */}
        {apps.map(({ name, icon, title }) => (
          <TaskbarIcon
            key={name}
            iconUrl={icon}
            isAppOpen={appStates[name].isOpen}
            isAppHidden={appStates[name].isHidden}
            handleClick={() => handleTaskbarIconClick(name)}
            alt={title}
          />
        ))}
      </Taskbar>
    </>
  );
};

export default Desktop;
