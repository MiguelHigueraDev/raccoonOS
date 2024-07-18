import { useEffect, useState } from 'react';
import AppIcon from '../AppIcon/AppIcon';
import classes from './Desktop.module.css';
import Taskbar from '../Taskbar/Taskbar';
import TaskbarIcon from '../TaskbarIcon/TaskbarIcon';
import WindowStore from '../../stores/WindowStore';
import MobileWarning from '../MobileWarning/MobileWarning';
import PedroStore from '../../stores/PedroStore';
import { apps } from './apps';
import DiscordApplication from '../Applications/DiscordApplication/DiscordApplication';

interface AppState {
  isOpen: boolean;
  isHidden: boolean;
}

interface AppStates {
  [key: string]: AppState;
}

const Desktop = () => {
  const { incZIndex, getZIndex } = WindowStore();
  const { stopPedroAudio } = PedroStore();

  const [numberOfOpenedApps, setNumberOfOpenedApps] = useState(0);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

  const [appStates, setAppStates] = useState<AppStates>(() =>
    apps.reduce((acc: AppStates, app) => {
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
          position={{ x: 100, y: 420 }}
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
      <DiscordApplication winProps={{appName: 'discord', isOpen: false, isHidden: true, handleClose: () => {}, handleHide: () => {}, zIndex: 0}} />
    </>
  );
};

export default Desktop;
