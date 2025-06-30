import styles from "./LiveCursorsToggle.module.css";

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
      className={styles.liveCursorsToggle}
      onClick={() => setShowLiveCursors((prev) => !prev)}
    >
      <svg 
        className={styles.icon} 
        viewBox="0 0 24 24" 
        fill="currentColor"
      >
        {showLiveCursors ? (
          <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        ) : (
          <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
        )}
      </svg>
      <span className={styles.text}>
        {showLiveCursors ? "Hide" : "Show"} Live Cursors
      </span>
    </div>
  );
};

export default LiveCursorsToggle;