import { useEffect, useState } from "react";
import styles from "./DiscordStatus.module.css";
import { ProgressBar } from "./ProgressBar";

interface SpotifyActivity {
  type: number;
  name: string;
  details?: string;
  state?: string;
  timestamps?: {
    start: number;
    end: number;
  };
  assets?: {
    large_image?: string;
    large_text?: string;
  };
}

interface SpotifyPlayerProps {
  spotify: SpotifyActivity;
}

export const SpotifyPlayer: React.FC<SpotifyPlayerProps> = ({ spotify }) => {
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const getProgress = () => {
    if (!spotify.timestamps?.start || !spotify.timestamps?.end) return 0;
    const start = spotify.timestamps.start;
    const end = spotify.timestamps.end;
    const now = currentTime;
    const progress = ((now - start) / (end - start)) * 100;
    return Math.min(Math.max(progress, 0), 100);
  };

  const getCurrentTime = () => {
    if (!spotify.timestamps?.start) return 0;
    return Math.max(currentTime - spotify.timestamps.start, 0);
  };

  const getDuration = () => {
    if (!spotify.timestamps?.start || !spotify.timestamps?.end) return 0;
    return spotify.timestamps.end - spotify.timestamps.start;
  };

  return (
    <div className={styles.nowPlaying}>
      <div className={styles.nowPlayingHeader}>Now Playing on Spotify</div>

      <div className={styles.trackInfo}>
        {spotify.assets?.large_image && (
          <img
            className={styles.albumArt}
            src={`https://i.scdn.co/image/${
              spotify.assets.large_image.split(":")[1]
            }`}
            alt={spotify.details || ""}
          />
        )}
        <div className={styles.trackDetails}>
          <div className={styles.trackName}>{spotify.details}</div>
          <div className={styles.artistName}>by {spotify.state}</div>
          {spotify.assets?.large_text && (
            <div className={styles.albumName}>
              on {spotify.assets.large_text}
            </div>
          )}
        </div>
      </div>

      <ProgressBar
        progress={getProgress()}
        currentTime={formatTime(getCurrentTime())}
        duration={formatTime(getDuration())}
      />
    </div>
  );
};
