import Window from "../../Window/Window";

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
      <Window name="Music" isHidden={isHidden} handleClose={handleClose} handleHide={handleHide} width={800} height={400}>
        <div style={{ padding: 16 }}>
          <p style={{ margin: 0 }}>Testing!</p>
        </div>
      </Window>
    )
  );
};

export default MusicApplication;
