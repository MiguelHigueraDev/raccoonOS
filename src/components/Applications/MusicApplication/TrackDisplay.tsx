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
      <div className="audioInfo">
        <div className="coverArt">
          {currentTrack.coverArt ? (
            <img src={currentTrack.coverArt} alt={currentTrack.name} />
          ) : (
            <div className="iconWrapper">
              <span className="noCoverArtIcon">
                <IconFileMusic />
              </span>
            </div>
          )}
        </div>
        <div className="text">
          <div className="title">{currentTrack.name}</div>
          <div className="artist">{currentTrack.artist}</div>
        </div>
      </div>
    </div>
  );
};

export default TrackDisplay;
