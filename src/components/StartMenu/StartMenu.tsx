import classes from "./StartMenu.module.css";
import { IconPower } from "@tabler/icons-react";
import SearchBar from "./SearchBar";
import PinnedApplications from "./PinnedApplications";
import { App } from "../Desktop/Desktop";
import { useState } from "react";

const StartMenu = ({
  appList,
  numberOfOpenedApps,
  isOpen,
  handleOpenApp,
  handleToggleStartMenu,
}: {
  appList: App[];
  numberOfOpenedApps: number;
  isOpen: boolean;
  handleOpenApp: (appName: string) => void;
  handleToggleStartMenu: () => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Just eyeballed this but it works by calculating the left position of the start menu based on the number of opened apps
  const leftPosition = `calc((${numberOfOpenedApps} * -20px - ${numberOfOpenedApps}px * 5) + (50% - 250px))`;

  const handleOpenAppHidingStartMenu = (appName: string) => {
    handleToggleStartMenu();
    handleOpenApp(appName);
  };

  const updateSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }

  return (
    isOpen && (
      <>
        {/* This is the background that will close the start menu when clicked */}
        <div
          className={classes.startMenuBackground}
          onClick={handleToggleStartMenu}
        />
        <div style={{ left: leftPosition }} className={classes.startMenu}>
          <div style={{ padding: 16 }}>
            <span className={classes.raccoonOsTitle}>raccoonOS v1.0</span>
            <SearchBar searchTerm={searchTerm} updateInputValue={updateSearchTerm} />
          </div>
          <PinnedApplications
            appList={appList}
            handleOpenApp={handleOpenAppHidingStartMenu}
          />
          <div className={classes.shutdownSection}>
            <div className={classes.shutdownButton}>
              <IconPower />
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default StartMenu;
