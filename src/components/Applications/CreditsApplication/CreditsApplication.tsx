import classes from "./CreditsApplication.module.css";
import Window from "../../Window/Window";
import { WindowProps } from "../../../shared/WindowProps";
import { useState } from "react";
import MusicCredits from "./MusicCredits";
import SoftwareCredits from "./SoftwareCredits";
import SpecialThanks from "./SpecialThanks";

const CreditsApplication = ({ winProps }: { winProps: WindowProps }) => {
  type ButtonType = "Music" | "Software" | "Special Thanks";
  const [activeButton, setActiveButton] = useState<ButtonType>("Music");

  return (
    winProps.isOpen && (
      <Window
        name="Credits"
        isHidden={winProps.isHidden}
        handleClose={winProps.handleClose}
        handleHide={winProps.handleHide}
        width={800}
        height={500}
        appName={winProps.appName}
        zIndex={winProps.zIndex}
        nonResizable
      >
        <div className={classes.window}>
          <h1 className={classes.creditsTitle}>
            This project wouldn't have been possible without the fine work of
            these people. Thanks!
          </h1>
          <div className={classes.buttons}>
            <button
              className={`${classes.button} ${
                activeButton === "Music" && classes.active
              }`}
              onClick={() => setActiveButton("Music")}
            >
              Music
            </button>
            <button
              className={`${classes.button} ${
                activeButton === "Software" && classes.active
              }`}
              onClick={() => setActiveButton("Software")}
            >
              Software
            </button>
            <button
              className={`${classes.button} ${
                activeButton === "Special Thanks" && classes.active
              }`}
              onClick={() => setActiveButton("Special Thanks")}
            >
              Special Thanks
            </button>
          </div>

          <div className={classes.creditsContainer}>
            { activeButton === "Music" && (
              <MusicCredits />
            )}
            { activeButton === "Software" && (
              <SoftwareCredits />
            )}
            { activeButton === "Special Thanks" && (
              <SpecialThanks />
            )}
          </div>
        </div>
      </Window>
    )
  );
};

export default CreditsApplication;
