import Window from "../../Window/Window";
import AudioPlayer from "./AudioPlayer";
import { TrackList } from "./TrackList";

const MusicApplication = ({
  isOpen,
  isHidden,
  handleClose,
  handleHide,
}: {
  isOpen: boolean;
  isHidden: boolean;
  handleClose: () => void;
  handleHide: () => void;
}) => {
  return (
    isOpen && (
      <Window
        name="Music"
        isHidden={isHidden}
        handleClose={handleClose}
        handleHide={handleHide}
        width={600}
        height={600}
      >
        <div style={{ padding: 16, height: "100%" }}>
          <AudioPlayer trackList={TrackList} />
        </div>
      </Window>
    )
  );
};

export default MusicApplication;
