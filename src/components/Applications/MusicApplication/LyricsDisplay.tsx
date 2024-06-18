import classes from "./LyricsDisplay.module.css";
import { Track } from "./TrackList";

const LyricsDisplay = ({
  currentTrack,
  currentTime,
  handleSeek,
}: {
  currentTrack: Track;
  currentTime: number;
  handleSeek: (time: number) => void;
}) => {
  const currentTimeMs = currentTime * 1000;

  return (
    <ol className={classes.lyricsContainer}>
      {currentTrack.lyrics!.map((lyric, index) => {
        const isActive = currentTimeMs >= lyric.startTimeMs;
        const className = isActive ? classes.activeLyrics : undefined;
        return (
          <li key={index} className={className}>
            <button onClick={() => handleSeek(lyric.startTimeMs / 1000)}>{lyric.text}</button>
          </li>
        );
      })}
    </ol>
  );
};

export default LyricsDisplay;
