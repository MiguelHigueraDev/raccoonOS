import classes from "./SeekBar.module.css";
import { RefObject } from "react";

interface SeekBarProps {
  audioRef: RefObject<HTMLAudioElement>;
  progressRef: RefObject<HTMLInputElement>;
  currentTime: number;
  duration: number;
}

const SeekBar: React.FC<SeekBarProps> = ({
  audioRef,
  progressRef,
  currentTime,
  duration,
}) => {
  const handleProgressChange = () => {
    audioRef.current!.currentTime = +progressRef.current!.value;
  };

  const formatTime = (time: number) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60)
        .toString()
        .padStart(1, "0");
      const seconds = Math.floor(time % 60)
        .toString()
        .padStart(2, "0");
      return `${minutes}:${seconds}`;
    }

    return "0:00";
  };

  return (
    <div className={classes.seekBar}>
      <span>{formatTime(currentTime)}</span>
      <input
        type="range"
        ref={progressRef}
        defaultValue={0}
        onChange={handleProgressChange}
      />
      <span>{formatTime(duration)}</span>
    </div>
  );
};

export default SeekBar;
