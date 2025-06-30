import styles from "./DiscordStatus.module.css";

interface ProgressBarProps {
  progress: number;
  currentTime: string;
  duration: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  currentTime, 
  duration 
}) => {
  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressBar}>
        <div 
          className={styles.progressFill} 
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className={styles.timeInfo}>
        <span>{currentTime}</span>
        <span>{duration}</span>
      </div>
    </div>
  );
};