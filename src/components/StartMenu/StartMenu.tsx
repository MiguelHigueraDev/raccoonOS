import { IconPower } from "@tabler/icons-react";
import classes from "./StartMenu.module.css";
import SearchBar from "./SearchBar";
import PinnedApplications from "./PinnedApplications";
import { App } from "../Desktop/Desktop";

const StartMenu = ({
  appList,
  numberOfOpenedApps,
  isOpen,
  handleOpenApp,
}: {
  appList: App[];
  numberOfOpenedApps: number;
  isOpen: boolean;
  handleOpenApp: (appName: string) => void;
}) => {
  // Just eyeballed this but it works by calculating the left position of the start menu based on the number of opened apps
  const leftPosition = `calc((${numberOfOpenedApps} * -20px - ${numberOfOpenedApps}px * 5) + (50% - 41px))`;

  return (
    isOpen && (
      <div style={{ left: leftPosition }} className={classes.startMenu}>
        <span className={classes.raccoonOsTitle}>raccoonOS v1.0</span>
        <SearchBar />
        <PinnedApplications appList={appList} handleOpenApp={handleOpenApp} />
        <div className={classes.shutdownSection}>
          <div>RaccoonDude</div>
          <div className={classes.shutdownButton}>
            <IconPower />
          </div>
        </div>
      </div>
    )
  );
};

export default StartMenu;
