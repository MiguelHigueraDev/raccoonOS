import styles from "./DiscordStatus.module.css";

interface Activity {
  name: string;
  state?: string;
}

interface DefaultActivityProps {
  activity?: Activity;
}

export const DefaultActivity: React.FC<DefaultActivityProps> = ({ activity }) => {
  if (!activity) return null;
  
  return (
    <div className={styles.defaultActivity}>
      <span className={styles.activityText}>
        {activity.name}
        {activity.state && ` - ${activity.state}`}
      </span>
    </div>
  );
};