import { useState } from "react";
import AppIcon from "../AppIcon/AppIcon";
import classes from "./Desktop.module.css";
import Taskbar from "../Taskbar/Taskbar";
import TaskbarIcon from "../TaskbarIcon/TaskbarIcon";
import MusicApplication from "../Applications/MusicApplication";

const Desktop = () => {
  const [testAppOpen, setTestAppOpen] = useState(false);
  const [testAppHidden, setTestAppHidden] = useState(false);

  const handleOpenApp = (appName: string) => {
    switch (appName) {
      case "testApp":
        setTestAppOpen(true);
        setTestAppHidden(false);
        break;
      default:
        break;
    }
  };

  const handleTaskbarIconClick = (appName: string) => {
    switch (appName) {
      case "testApp":
        setTestAppHidden(!testAppHidden);
        break;
      default:
        break;
    }
  }

  return (
    <>
      <div className={classes.desktop}>
        <AppIcon
          onDoubleClick={() => handleOpenApp("testApp")}
          iconUrl="./app-icons/music.png"
          name="Music"
        />
        <MusicApplication
          isOpen={testAppOpen}
          isHidden={testAppHidden}
          handleClose={() => setTestAppOpen(false)}
          handleHide={() => setTestAppHidden(true)}
        />
      </div>
      <Taskbar>
        <TaskbarIcon
          iconUrl="./app-icons/music.png"
          isAppOpen={testAppOpen}
          handleClick={() => handleTaskbarIconClick("testApp")}
          alt="Music"
        ></TaskbarIcon>
      </Taskbar>
    </>
  );
};

export default Desktop;
