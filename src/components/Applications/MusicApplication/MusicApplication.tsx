import { WindowProps } from "../../../shared/WindowProps";
import Window from "../../Window/Window";
import AudioPlayer from "./AudioPlayer";
import { TrackList } from "./TrackList";

const MusicApplication = ({ winProps }: { winProps: WindowProps }) => {
  return (
    winProps.isOpen && (
      <Window
        name="Music"
        isHidden={winProps.isHidden}
        handleClose={winProps.handleClose}
        handleHide={winProps.handleHide}
        width={600}
        height={600}
        appName={winProps.appName}
        zIndex={winProps.zIndex}
        nonResizable
      >
        <div style={{ padding: 16, height: "calc(100% - 34px)" }}>
          <AudioPlayer trackList={TrackList} />
        </div>
      </Window>
    )
  );
};

export default MusicApplication;
