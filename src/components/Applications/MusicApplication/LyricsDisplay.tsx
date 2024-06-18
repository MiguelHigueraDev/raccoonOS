import classes from "./LyricsDisplay.module.css";
import { Track } from "./TrackList";

const LyricsDisplay = ({
  currentTrack,
  currentTime,
  handleSeek,
  lyricsContainerRef,
  setIsPlaying,
}: {
  currentTrack: Track;
  currentTime: number;
  handleSeek: (time: number) => void;
  lyricsContainerRef: React.RefObject<HTMLOListElement>;
  setIsPlaying: (isPlaying: boolean) => void;
}) => {
  const currentTimeMs = currentTime * 1000;

  const handleLyricClick = (time: number) => {
    handleSeek(time);
    setIsPlaying(true);
  };

  return (
    <ol className={classes.lyricsContainer} ref={lyricsContainerRef}>
      {currentTrack.lyrics!.map((lyric, index) => {
        const isActive = currentTimeMs >= lyric.startTimeMs;
        const className = isActive ? classes.activeLyrics : undefined;
        return (
          <li key={index} className={className}>
            <button onClick={() => handleLyricClick(lyric.startTimeMs / 1000)}>
              {lyric.text}
            </button>
          </li>
        );
      })}
    </ol>
  );
};

export default LyricsDisplay;