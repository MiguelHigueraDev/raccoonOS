import NotificationStore from '../../stores/NotificationStore';
import Notification from './Notification';
import classes from './NotificationsContainer.module.css';

const NotificationsContainer = () => {
  const { notifications, removeNotification } = NotificationStore();

  const handleRemoveNotification = (id: string) => {
    removeNotification(id);
  };

  return (
    notifications.length > 0 && (
      <ol className={classes.notificationsContainer}>
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            message={notification.message}
            title={notification.title}
            handleRemoveNotification={() =>
              handleRemoveNotification(notification.id)
            }
          />
        ))}
      </ol>
    )
  );
};

export default NotificationsContainer;
