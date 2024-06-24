import classes from "./GamesApplication.module.css";
import { WindowProps } from "../../../shared/WindowProps";
import Window from "../../Window/Window";
import { games } from "./games";
import { IconBrandSteam } from "@tabler/icons-react";

const GamesApplication = ({ winProps }: { winProps: WindowProps }) => {
  return (
    winProps.isOpen && (
      <Window
        name="Recommended Games"
        isHidden={winProps.isHidden}
        handleClose={winProps.handleClose}
        handleHide={winProps.handleHide}
        width={1100}
        height={800}
        appName={winProps.appName}
        zIndex={winProps.zIndex}
      >
        <div className={classes.window}>
          <h1 className={classes.gamesTitle}>These are some of my favorite video games</h1>
          {games.map((game, index) => (
            <div key={index} className={classes.gameContainer}>
              <img src={game.image} alt={game.title} />

              <div key={index} className={classes.gameInfo}>
                <h2>{game.title}</h2>
                <p>{game.review}</p>
                <a href={game.url} target="_blank" rel="noreferrer" style={{width: 24}}>
                  <IconBrandSteam className={classes.steamIcon} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </Window>
    )
  );
};

export default GamesApplication;
