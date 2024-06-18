import { RefObject } from "react";

const SeekBar = ({
  audioRef,
  progressRef,
  currentTime,
  duration,
}: {
  audioRef: RefObject<HTMLAudioElement>;
  progressRef: RefObject<HTMLInputElement>;
  currentTime: number;
  duration: number;
}) => {
  const handleProgressChange = () => {
    audioRef.current!.currentTime = +progressRef.current!.value;
  };

  const formatTime = (time: number) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60).toString().padStart(1, "0");
      const seconds = Math.floor(time % 60).toString().padStart(2, "0");
      return `${minutes}:${seconds}`;
    }

    return "0:00";
  };

  return (
    <div className="progressBar">
      <span className="currentTime">{formatTime(currentTime)}</span>
      <input
        type="range"
        ref={progressRef}
        defaultValue={0}
        onChange={handleProgressChange}
      />
      <span className="duration">{formatTime(duration)}</span>
    </div>
  );
};

export default SeekBar;
