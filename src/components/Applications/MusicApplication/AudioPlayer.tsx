import classes from "./AudioPlayer.module.css";
import { Track } from "./TrackList";
import TrackDisplay from "./TrackDisplay";
import Controls from "./Controls";
import SeekBar from "./SeekBar";
import { useRef, useState } from "react";
import LyricsDisplay from "./LyricsDisplay";

const AudioPlayer = ({ trackList }: { trackList: Track[] }) => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(trackList[trackIndex]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLInputElement>(null);
  const lyricsContainerRef = useRef<HTMLOListElement | null>(null);

  const handleNext = () => {
    if (trackIndex >= trackList.length - 1) {
      setTrackIndex(0);
      setCurrentTrack(trackList[0]);
    } else {
      setTrackIndex(trackIndex + 1);
      setCurrentTrack(trackList[trackIndex + 1]);
    }
    lyricsContainerRef.current!.scrollTop = 0;
  };

  const handleSeek = (time: number) => {
    audioRef.current!.currentTime = time;
    setCurrentTime(time);
    setIsPlaying(true);
    audioRef.current!.play();
  };

  return (
    <div className={classes.audioPlayer}>
      <div className={classes.inner}>
        <TrackDisplay
          currentTrack={currentTrack}
          audioRef={audioRef}
          progressRef={progressRef}
          setDuration={setDuration}
          handleNext={handleNext}
        />
        <Controls
          tracks={trackList}
          trackIndex={trackIndex}
          setTrackIndex={setTrackIndex}
          setCurrentTrack={setCurrentTrack}
          audioRef={audioRef}
          progressRef={progressRef}
          duration={duration}
          setCurrentTime={setCurrentTime}
          handleNext={handleNext}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
        <SeekBar
          audioRef={audioRef}
          progressRef={progressRef}
          currentTime={currentTime}
          duration={duration}
        />
        <LyricsDisplay
          currentTrack={currentTrack}
          currentTime={currentTime}
          handleSeek={handleSeek}
          lyricsContainerRef={lyricsContainerRef}
          setIsPlaying={setIsPlaying}
        />
      </div>
    </div>
  );
};
export default AudioPlayer;
