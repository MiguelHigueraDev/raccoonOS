import React from "react";
import classes from "./LyricsDisplay.module.css";
import { Track } from "./TrackList";

interface LyricsDisplayProps {
  currentTrack: Track;
  currentTime: number;
  handleSeek: (time: number) => void;
  lyricsContainerRef: React.RefObject<HTMLOListElement>;
  setIsPlaying: (isPlaying: boolean) => void;
}

const LyricsDisplay: React.FC<LyricsDisplayProps> = ({
  currentTrack,
  currentTime,
  handleSeek,
  lyricsContainerRef,
  setIsPlaying,
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
