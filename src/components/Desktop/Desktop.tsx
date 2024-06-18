import { useState } from "react";
import AppIcon from "../AppIcon/AppIcon";
import classes from "./Desktop.module.css";
import Taskbar from "../Taskbar/Taskbar";
import TaskbarIcon from "../TaskbarIcon/TaskbarIcon";
import MusicApplication from "../Applications/MusicApplication/MusicApplication";
import ResumeApplication from "../Applications/ResumeApplication/ResumeApplication";
import WindowStore from "../../stores/WindowStore";
import DiscordApplication from "../Applications/DiscordApplication/DiscordApplication";
import ProjectsApplication from "../Applications/ProjectsApplication/ProjectsApplication";
import AboutMeApplication from "../Applications/AboutMeApplication/AboutMeApplication";

const Desktop = () => {
  const { incZIndex } = WindowStore();

  const [musicAppOpen, setMusicAppOpen] = useState(false);
  const [musicAppHidden, setMusicAppHidden] = useState(false);

  const [resumeAppOpen, setResumeAppOpen] = useState(false);
  const [resumeAppHidden, setResumeAppHidden] = useState(false);

  const [discordAppOpen, setDiscordAppOpen] = useState(false);
  const [discordAppHidden, setDiscordAppHidden] = useState(false);

  const [projectsAppOpen, setProjectsAppOpen] = useState(false);
  const [projectsAppHidden, setProjectsAppHidden] = useState(false);

  const [aboutMeAppOpen, setAboutMeAppOpen] = useState(false);
  const [aboutMeAppHidden, setAboutMeAppHidden] = useState(false);

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
      case "projectsApp":
        setProjectsAppOpen(true);
        setProjectsAppHidden(false);
        break;
      case "aboutMeApp":
        setAboutMeAppOpen(true);
        setAboutMeAppHidden(false);
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
      case "projectsApp":
        setProjectsAppHidden(!projectsAppHidden);
        break;
      case "aboutMeApp":
        setAboutMeAppHidden(!aboutMeAppHidden);
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
        <AppIcon
          onDoubleClick={() => handleOpenApp("projectsApp")}
          iconUrl="./app-icons/projects.svg"
          name="Projects"
          position={{ x: 20, y: 420 }}
        />
        <AppIcon
          onDoubleClick={() => handleOpenApp("aboutMeApp")}
          iconUrl="./app-icons/aboutme.svg"
          name="About Me"
          position={{ x: 20, y: 520 }}
        />
        
        {/* Hyperlinks */}
        <AppIcon
          onDoubleClick={() =>
            window.open("https://github.com/MiguelHigueraDev/misfit-os/")
          }
          iconUrl="./app-icons/github.svg"
          name="Source"
          position={{ x: 20, y: 220 }}
        />
        {/* Applications */}
        <AboutMeApplication
          isOpen={aboutMeAppOpen}
          isHidden={aboutMeAppHidden}
          handleClose={() => setAboutMeAppOpen(false)}
          handleHide={() => setAboutMeAppHidden(true)}
        />
        <ProjectsApplication
          isOpen={projectsAppOpen}
          isHidden={projectsAppHidden}
          handleClose={() => setProjectsAppOpen(false)}
          handleHide={() => setProjectsAppHidden(true)}
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

        <MusicApplication
          isOpen={musicAppOpen}
          isHidden={musicAppHidden}
          handleClose={() => setMusicAppOpen(false)}
          handleHide={() => setMusicAppHidden(true)}
        />
      </div>
      <Taskbar>
        {/* Taskbar Icons */}
        <TaskbarIcon
          iconUrl="./app-icons/aboutme.svg"
          isAppOpen={aboutMeAppOpen}
          isAppHidden={aboutMeAppHidden}
          handleClick={() => handleTaskbarIconClick("aboutMeApp")}
          alt="About Me"
        ></TaskbarIcon>
        <TaskbarIcon
          iconUrl="./app-icons/resume.svg"
          isAppOpen={resumeAppOpen}
          isAppHidden={resumeAppHidden}
          handleClick={() => handleTaskbarIconClick("resumeApp")}
          alt="Resume"
        ></TaskbarIcon>
        <TaskbarIcon
          iconUrl="./app-icons/projects.svg"
          isAppOpen={projectsAppOpen}
          isAppHidden={projectsAppHidden}
          handleClick={() => handleTaskbarIconClick("projectsApp")}
          alt="Projects"
        ></TaskbarIcon>
        <TaskbarIcon
          iconUrl="./app-icons/discord.svg"
          isAppOpen={discordAppOpen}
          isAppHidden={discordAppHidden}
          handleClick={() => handleTaskbarIconClick("discordApp")}
          alt="Discord"
        ></TaskbarIcon>
        <TaskbarIcon
          iconUrl="./app-icons/music.png"
          isAppOpen={musicAppOpen}
          isAppHidden={musicAppHidden}
          handleClick={() => handleTaskbarIconClick("testApp")}
          alt="Music"
        ></TaskbarIcon>
      </Taskbar>
    </>
  );
};

export default Desktop;
