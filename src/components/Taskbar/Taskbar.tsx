import { ReactElement } from "react";
import TaskbarIcon from "../TaskbarIcon/TaskbarIcon";
import classes from "./Taskbar.module.css";
import StartMenu from "../StartMenu/StartMenu";
const Taskbar = ({
  numberOfOpenedApps,
  isStartMenuOpen,
  handleToggleStartMenu,
  children,
}: {
  numberOfOpenedApps: number;
  isStartMenuOpen: boolean;
  handleToggleStartMenu: () => void;
  children: ReactElement[] | ReactElement;
}) => {
  return (
    <nav className={classes.taskbarContainer}>
      <StartMenu numberOfOpenedApps={numberOfOpenedApps} isOpen={isStartMenuOpen} />
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
