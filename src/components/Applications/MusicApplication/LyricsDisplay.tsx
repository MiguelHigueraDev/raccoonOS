import React, { useEffect, useRef } from "react";
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
  const activeLyricRef = useRef<HTMLLIElement>(null);

  // Find the currently active lyric index
  const activeLyricIndex = currentTrack.lyrics!.findIndex((lyric, index) => {
    const nextLyric = currentTrack.lyrics![index + 1];
    return (
      currentTimeMs >= lyric.startTimeMs &&
      (!nextLyric || currentTimeMs < nextLyric.startTimeMs)
    );
  });

  // Auto-scroll to active lyric
  useEffect(() => {
    if (
      activeLyricRef.current &&
      lyricsContainerRef.current &&
      activeLyricIndex >= 0
    ) {
      const activeLyric = activeLyricRef.current;

      activeLyric.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  }, [activeLyricIndex, lyricsContainerRef]);

  const handleLyricClick = (time: number) => {
    handleSeek(time);
    setIsPlaying(true);
  };

  return (
    <ol className={classes.lyricsContainer} ref={lyricsContainerRef}>
      {currentTrack.lyrics!.map((lyric, index) => {
        const isActive = index === activeLyricIndex;
        const className = isActive ? classes.activeLyrics : undefined;
        return (
          <li
            key={index}
            className={className}
            ref={isActive ? activeLyricRef : null}
          >
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
