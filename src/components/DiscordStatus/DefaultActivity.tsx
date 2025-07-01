import styles from "./DiscordStatus.module.css";

interface Activity {
  name: string;
  state?: string;
  details?: string;
  assets?: {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
  };
  application_id?: string;
}

interface DefaultActivityProps {
  activity?: Activity;
}

export const DefaultActivity: React.FC<DefaultActivityProps> = ({ activity }) => {
  if (!activity) return null;
  
  const getActivityIcon = () => {
    if (activity.assets?.large_image || activity.assets?.small_image) {
      const imageId = activity.assets.large_image || activity.assets.small_image;
      if (activity.application_id && imageId) {
        return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${imageId}.png`;
      }
    }
    return null;
  };

  const iconUrl = getActivityIcon();
  
  return (
    <div className={styles.defaultActivityContainer}>
      <div className={styles.defaultActivityHeader}>
        Playing {activity.name}
      </div>
      
      <div className={styles.defaultActivityInfo}>
        {iconUrl && (
          <img
            className={styles.defaultActivityIcon}
            src={iconUrl}
            alt={activity.name}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        )}
        
        <div className={styles.defaultActivityDetails}>
          <div className={styles.defaultActivityName}>{activity.name}</div>
          {activity.details && (
            <div className={styles.defaultActivityDescription}>{activity.details}</div>
          )}
          {activity.state && (
            <div className={styles.defaultActivityState}>{activity.state}</div>
          )}
        </div>
      </div>
    </div>
  );
};