import { useLanyard } from "react-use-lanyard";
import styles from "./DiscordStatus.module.css";
import { StatusHeader } from "./StatusHeader";
import { SpotifyPlayer } from "./SpotifyPlayer";
import { DefaultActivity } from "./DefaultActivity";

export const DiscordStatus: React.FC = () => {
  const { loading, status } = useLanyard({
    userId: "205519765312241665",
    socket: true,
  });

  if (loading || !status) return null;

  const spotify = status.activities?.find(
    (activity) => activity.type === 2 && activity.name === "Spotify"
  );

  return (
    <div className={styles.discordStatus}>
      <StatusHeader discordStatus={status.discord_status} />
      
      {spotify ? (
        <SpotifyPlayer spotify={spotify} />
      ) : (
        <DefaultActivity activity={status.activities?.[0]} />
      )}
    </div>
  );
};