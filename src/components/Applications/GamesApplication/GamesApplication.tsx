import classes from "./GamesApplication.module.css";
import { WindowProps } from "../../../shared/WindowProps";
import Window from "../../Window/Window";
import { IconBrandSteam } from "@tabler/icons-react";
import { useRecentGames } from "./useRecentGames";

const GamesApplication = ({ winProps }: { winProps: WindowProps }) => {
  const { recentGames } = useRecentGames();

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
          <h1 className={classes.gamesTitle}>
            These are the games I've been playing recently on Steam
          </h1>
          {recentGames.map((game, index) => (
            <article key={index} className={classes.gameContainer}>
              <img src={game.imageUrl} alt={game.name} />

              <div key={index} className={classes.gameInfo}>
                <h2>{game.name}</h2>
                <p>{game.formatted2WeeksPlaytime} last two weeks</p>
                <p>{game.formattedPlaytimeForever} played in total</p>
                <a
                  href={`https://store.steampowered.com/app/${game.appid}`}
                  target="_blank"
                  rel="noreferrer"
                  className={classes.gameUrl}
                >
                  <IconBrandSteam />
                  <span>Check out on Steam</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </Window>
    )
  );
};

export default GamesApplication;
