import styles from "./DiscordStatus.module.css";

interface StatusHeaderProps {
  discordStatus?: string;
}

export const StatusHeader: React.FC<StatusHeaderProps> = ({
  discordStatus,
}) => {
  const getStatusText = (status: string | undefined) => {
    switch (status) {
      case "online":
        return "Currently online";
      case "idle":
        return "Currently idle";
      case "dnd":
        return "Currently busy";
      case "offline":
      default:
        return "Currently offline";
    }
  };

  return (
    <div className={styles.statusHeader}>
      <div
        className={`${styles.statusDot} ${styles[discordStatus || "offline"]}`}
      />
      <div className={styles.statusTextContainer}>
        <span>{getStatusText(discordStatus)}</span>
        <span className={styles.username}>discord: misfitdude</span>
      </div>
    </div>
  );
};
