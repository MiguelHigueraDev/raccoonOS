import classes from "./Controls.module.css";
import {
  IconPlayerPause,
  IconPlayerPlay,
  IconPlayerSkipBack,
  IconPlayerSkipForward,
  IconVolume,
  IconVolume2,
  IconVolume3,
} from "@tabler/icons-react";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { Track } from "./TrackList";

const Controls = ({
  tracks,
  trackIndex,
  setTrackIndex,
  setCurrentTrack,
  audioRef,
  progressRef,
  duration,
  setCurrentTime,
  handleNext,
  isPlaying,
  setIsPlaying,
}: {
  tracks: Track[];
  trackIndex: number;
  setTrackIndex: (index: number) => void;
  setCurrentTrack: (track: Track) => void;
  audioRef: RefObject<HTMLAudioElement>;
  progressRef: RefObject<HTMLInputElement>;
  duration: number;
  setCurrentTime: (time: number) => void;
  handleNext: () => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
}) => {
  const [volume, setVolume] = useState(45);
  const [muteVolume, setMuteVolume] = useState(false);

  const playAnimationRef = useRef<number>();

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, audioRef]);

  const repeat = useCallback(() => {
    const currentTime = audioRef.current!.currentTime;
    setCurrentTime(currentTime);

    progressRef.current!.value = currentTime.toString();
    progressRef.current!.style.setProperty(
      "--range-progress",
      `${(+progressRef.current!.value / duration) * 100}%`
    );

    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, progressRef, duration, setCurrentTime]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current!.play();
    } else {
      audioRef.current!.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    if (trackIndex === 0) {
      setTrackIndex(tracks.length - 1);
      setCurrentTrack(tracks[tracks.length - 1]);
    } else {
      setTrackIndex(trackIndex - 1);
      setCurrentTrack(tracks[trackIndex - 1]);
    }
  };

  useEffect(() => {
    if (audioRef) {
      audioRef.current!.volume = volume / 100;
      audioRef.current!.muted = muteVolume;
    }
  }, [volume, audioRef, muteVolume]);

  return (
    <div className={classes.controlsContainer}>
      <div className={classes.controls}>
        <button>
          <IconPlayerSkipBack onClick={handlePrevious} />
        </button>

        <button onClick={togglePlayPause}>
          {isPlaying ? <IconPlayerPause /> : <IconPlayerPlay />}
        </button>

        <button>
          <IconPlayerSkipForward onClick={handleNext} />
        </button>
      </div>
      <div className={classes.volume}>
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={(e) => setVolume(+e.target.value)}
        />
        <button onClick={() => setMuteVolume((prev) => !prev)}>
          {muteVolume || volume < 5 ? (
            <IconVolume3 />
          ) : volume < 40 ? (
            <IconVolume2 />
          ) : (
            <IconVolume />
          )}
        </button>
      </div>
    </div>
  );
};

export default Controls;
