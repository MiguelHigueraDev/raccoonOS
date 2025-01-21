import { IconX } from "@tabler/icons-react";
import classes from "./Notification.module.css";
import React, { ReactNode } from "react";

interface NotificationProps {
  title: string;
  message: ReactNode;
  handleRemoveNotification: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  title,
  message,
  handleRemoveNotification,
}) => {
  return (
    <li className={classes.notification}>
      <div>
        <h2>{title}</h2>
        <button
          aria-label="Close notification"
          onClick={handleRemoveNotification}
        >
          <IconX size={16} />
        </button>
      </div>
      <p>{message}</p>
    </li>
  );
};

export default Notification;
