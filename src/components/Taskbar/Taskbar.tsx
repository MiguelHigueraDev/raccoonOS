import { ReactElement } from "react";
import TaskbarIcon from "../TaskbarIcon/TaskbarIcon";
import classes from "./Taskbar.module.css";
import StartMenu from "../StartMenu/StartMenu";
import { App } from "../Desktop/Desktop";
const Taskbar = ({
  appList,
  numberOfOpenedApps,
  isStartMenuOpen,
  handleToggleStartMenu,
  handleOpenApp,
  children,
}: {
  appList: App[];
  numberOfOpenedApps: number;
  isStartMenuOpen: boolean;
  handleToggleStartMenu: () => void;
  handleOpenApp: (appName: string) => void;
  children: ReactElement[] | ReactElement;
}) => {
  return (
    <nav className={classes.taskbarContainer}>
      <StartMenu numberOfOpenedApps={numberOfOpenedApps} isOpen={isStartMenuOpen} appList={appList} handleOpenApp={handleOpenApp} />
      <TaskbarIcon
        handleClick={handleToggleStartMenu}
        isAppOpen={true}
        isAppHidden={false}
        iconUrl="./taskbar-icons/misfitos-logo.png"
        alt="Start Menu"
        showIndicator={false}
      />
      {children}
    </nav>
  );
};

export default Taskbar;
