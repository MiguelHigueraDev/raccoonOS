import classes from "./TrackDisplay.module.css";
import { RefObject } from "react";
import { Track } from "./TrackList";
import { IconFileMusic } from "@tabler/icons-react";

const TrackDisplay = ({
  currentTrack,
  audioRef,
  progressRef,
  setDuration,
  handleNext,
}: {
  currentTrack: Track;
  audioRef: RefObject<HTMLAudioElement>;
  progressRef: RefObject<HTMLInputElement>;
  setDuration: (duration: number) => void;
  handleNext: () => void;
}) => {
  const handleLoadedMetadata = () => {
    const seconds = audioRef.current!.duration;
    setDuration(seconds);
    progressRef.current!.max = seconds.toString();
  };

  return (
    <div>
      <audio
        src={currentTrack.src}
        ref={audioRef}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleNext}
      />
      <div className={classes.trackInfo}>
        <div className={classes.trackCoverArt}>
          {currentTrack.coverArt ? (
            <img src={currentTrack.coverArt} alt={currentTrack.name} />
          ) : (
            <div>
              <span className={classes.noTrackCoverArt}>
                <IconFileMusic />
              </span>
            </div>
          )}
        </div>
        <div className={classes.text}>
          <div className={classes.title}>{currentTrack.name}</div>
          <div className={classes.artist}>{currentTrack.artist}</div>
        </div>
      </div>
    </div>
  );
};

export default TrackDisplay;
