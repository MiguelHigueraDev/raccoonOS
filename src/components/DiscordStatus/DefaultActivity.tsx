import styles from "./DiscordStatus.module.css";

interface Activity {
  name: string;
  state?: string;
}

interface DefaultActivityProps {
  activity?: Activity;
}

export const DefaultActivity: React.FC<DefaultActivityProps> = ({ activity }) => {
  return (
    <div className={styles.defaultActivity}>
      {activity ? (
        <span className={styles.activityText}>
          {activity.name}
          {activity.state && ` - ${activity.state}`}
        </span>
      ) : (
        <span className={styles.activityText}>No activity</span>
      )}
    </div>
  );
};