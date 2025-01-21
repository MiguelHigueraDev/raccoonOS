import React, { ReactElement } from "react";
import TaskbarIcon from "../TaskbarIcon/TaskbarIcon";
import classes from "./Taskbar.module.css";
import StartMenu from "../StartMenu/StartMenu";
import { App } from "../Desktop/apps";
import TaskbarClock from "./TaskbarClock";

interface TaskbarProps {
  appList: App[];
  numberOfOpenedApps: number;
  isStartMenuOpen: boolean;
  handleToggleStartMenu: () => void;
  handleOpenApp: (appName: string) => void;
  children: ReactElement[] | ReactElement;
}

const Taskbar: React.FC<TaskbarProps> = ({
  appList,
  numberOfOpenedApps,
  isStartMenuOpen,
  handleToggleStartMenu,
  handleOpenApp,
  children,
}) => {
  return (
    <>
      <nav className={classes.taskbarContainer}>
        <StartMenu
          numberOfOpenedApps={numberOfOpenedApps}
          isOpen={isStartMenuOpen}
          appList={appList}
          handleOpenApp={handleOpenApp}
          handleToggleStartMenu={handleToggleStartMenu}
        />
        <TaskbarIcon
          handleClick={handleToggleStartMenu}
          isAppOpen={true}
          isAppHidden={false}
          iconUrl="./taskbar-icons/raccoonos-logo.webp"
          alt="Start Menu"
          showIndicator={false}
        />
        {children}
      </nav>
      <TaskbarClock />
    </>
  );
};

export default Taskbar;
