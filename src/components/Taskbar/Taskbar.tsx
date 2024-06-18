import { ReactElement } from "react";
import TaskbarIcon from "../TaskbarIcon/TaskbarIcon";
import classes from "./Taskbar.module.css";
const Taskbar = ({ children }: { children: ReactElement[] | ReactElement }) => {
  return (
    <nav className={classes.taskbarContainer}>
      <TaskbarIcon
        handleClick={() => {}}
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
