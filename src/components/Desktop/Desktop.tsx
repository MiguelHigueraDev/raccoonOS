import { useState } from "react";
import AppIcon from "../AppIcon/AppIcon";
import classes from "./Desktop.module.css";
import Taskbar from "../Taskbar/Taskbar";
import TaskbarIcon from "../TaskbarIcon/TaskbarIcon";
import MusicApplication from "../Applications/MusicApplication/MusicApplication";
import ResumeApplication from "../Applications/ResumeApplication/ResumeApplication";
import WindowStore from "../../stores/WindowStore";
import DiscordApplication from "../Applications/DiscordApplication/DiscordApplication";

const Desktop = () => {
  const { incZIndex } = WindowStore();

  const [musicAppOpen, setMusicAppOpen] = useState(false);
  const [musicAppHidden, setMusicAppHidden] = useState(false);

  const [resumeAppOpen, setResumeAppOpen] = useState(false);
  const [resumeAppHidden, setResumeAppHidden] = useState(false);

  const [discordAppOpen, setDiscordAppOpen] = useState(false);
  const [discordAppHidden, setDiscordAppHidden] = useState(false);

  // Make sure to increase the z index when opening an app
  const handleOpenApp = (appName: string) => {
    incZIndex();
    switch (appName) {
      case "testApp":
        setMusicAppOpen(true);
        setMusicAppHidden(false);
        break;
      case "resumeApp":
        setResumeAppOpen(true);
        setResumeAppHidden(false);
        break;
      case "discordApp":
        setDiscordAppOpen(true);
        setDiscordAppHidden(false);
        break;
      default:
        break;
    }
  };

  const handleTaskbarIconClick = (appName: string) => {
    incZIndex();
    switch (appName) {
      case "testApp":
        setMusicAppHidden(!musicAppHidden);
        break;
      case "resumeApp":
        setResumeAppHidden(!resumeAppHidden);
        break;
      case "discordApp":
        setDiscordAppHidden(!discordAppHidden);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className={classes.desktop}>
        {/* Desktop Icons */}
        <AppIcon
          onDoubleClick={() => handleOpenApp("testApp")}
          iconUrl="./app-icons/music.png"
          name="Music"
          position={{ x: 20, y: 20 }}
        />
        <AppIcon
          onDoubleClick={() => handleOpenApp("resumeApp")}
          iconUrl="./app-icons/resume.svg"
          name="Resume"
          position={{ x: 20, y: 120 }}
        />
        <AppIcon
          onDoubleClick={() => handleOpenApp("discordApp")}
          iconUrl="./app-icons/discord.svg"
          name="Discord"
          position={{ x: 20, y: 320 }}
        />

        {/* Hyperlinks */}
        <AppIcon
          onDoubleClick={() => window.open("https://github.com/MiguelHigueraDev/misfit-os/")}
          iconUrl="./app-icons/github.svg"
          name="Source"
          position={{ x: 20, y: 220 }}
        />
        {/* Applications */}
        <MusicApplication
          isOpen={musicAppOpen}
          isHidden={musicAppHidden}
          handleClose={() => setMusicAppOpen(false)}
          handleHide={() => setMusicAppHidden(true)}
        />
        <ResumeApplication
          isOpen={resumeAppOpen}
          isHidden={resumeAppHidden}
          handleClose={() => setResumeAppOpen(false)}
          handleHide={() => setResumeAppHidden(true)}
        />
        <DiscordApplication
          isOpen={discordAppOpen}
          isHidden={discordAppHidden}
          handleClose={() => setDiscordAppOpen(false)}
          handleHide={() => setDiscordAppHidden(true)}
        />

      </div>
      <Taskbar>
        {/* Taskbar Icons */}
        <TaskbarIcon
          iconUrl="./app-icons/music.png"
          isAppOpen={musicAppOpen}
          isAppHidden={musicAppHidden}
          handleClick={() => handleTaskbarIconClick("testApp")}
          alt="Music"
        ></TaskbarIcon>
        <TaskbarIcon
          iconUrl="./app-icons/resume.svg"
          isAppOpen={resumeAppOpen}
          isAppHidden={resumeAppHidden}
          handleClick={() => handleTaskbarIconClick("resumeApp")}
          alt="Resume"
        ></TaskbarIcon>
        <TaskbarIcon
          iconUrl="./app-icons/discord.svg"
          isAppOpen={discordAppOpen}
          isAppHidden={discordAppHidden}
          handleClick={() => handleTaskbarIconClick("discordApp")}
          alt="Discord"
        ></TaskbarIcon>
      </Taskbar>
    </>
  );
};

export default Desktop;
