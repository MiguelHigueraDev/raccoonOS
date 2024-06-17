import { ReactElement } from "react";
import TaskbarIcon from "../TaskbarIcon/TaskbarIcon";
import classes from "./Taskbar.module.css";
const Taskbar = ({ children }: { children: ReactElement[] | ReactElement }) => {
  return (
    <nav className={classes.taskbarContainer}>
      <TaskbarIcon
        handleClick={() => {}}
        isAppOpen={true}
        iconUrl="./taskbar-icons/misfitos-logo.png"
        alt="Start Menu"
      />
      {children}
    </nav>
  );
};

export default Taskbar;
