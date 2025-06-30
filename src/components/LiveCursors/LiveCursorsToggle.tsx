interface LiveCursorsToggleProps {
  showLiveCursors: boolean;
  setShowLiveCursors: React.Dispatch<React.SetStateAction<boolean>>;
}

const LiveCursorsToggle: React.FC<LiveCursorsToggleProps> = ({
  showLiveCursors,
  setShowLiveCursors,
}) => {
  return (
    <div
      className="live-cursors-toggle"
      onClick={() => setShowLiveCursors((prev) => !prev)}
      style={{
        position: "absolute",
        fontSize: "12px",
        bottom: "70px",
        left: "20px",
        backgroundColor: "black",
        color: "white",
        border: "1px solid white",
        padding: "10px",
        borderRadius: "5px",
        cursor: "pointer",
        zIndex: 1000,
      }}
    >
      {showLiveCursors ? "Hide Live Cursors" : "Show Live Cursors"}
    </div>
  );
};

export default LiveCursorsToggle;
