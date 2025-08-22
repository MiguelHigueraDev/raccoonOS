import { useEffect, useState } from "react";
import { Game, GameWithExtraInfo } from "./types";

export const useRecentGames = () => {
  const [recentGames, setRecentGames] = useState<GameWithExtraInfo[]>([]);

  useEffect(() => {
    const fetchRecentGames = async () => {
      const response = await fetch("https://steam.miguelhiguera.dev/api/games");
      const games: Game[] = await response.json();
      const gamesWithImage = games.map((game) => ({
        ...game,
        imageUrl: getImageUrl(game.appid, game.img_icon_url),
        formatted2WeeksPlaytime: formatPlaytime(game.playtime_2weeks),
        formattedPlaytimeForever: formatPlaytime(game.playtime_forever),
      }));
      setRecentGames(gamesWithImage);
    };

    fetchRecentGames();
  }, []);

  return { recentGames };
};

const getImageUrl = (appid: number, hash: string) => {
  return `https://media.steampowered.com/steamcommunity/public/images/apps/${appid}/${hash}.jpg`;
};

const formatPlaytime = (playtime: number) => {
  const hours = Math.floor(playtime / 60);
  const minutes = playtime % 60;
  if (hours < 1) {
    return `${minutes}m`;
  }
  return `${hours}h ${minutes}m`;
};
