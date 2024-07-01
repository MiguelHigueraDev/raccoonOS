import { IconX } from '@tabler/icons-react';
import classes from './Notification.module.css';
import { ReactNode } from 'react';

const Notification = ({
  title,
  message,
  handleRemoveNotification,
}: {
  title: string;
  message: ReactNode;
  handleRemoveNotification: () => void;
}) => {
  return (
    <li className={classes.notification}>
      <div>
        <h2>{title}</h2>
        <button aria-label="Close notification" onClick={handleRemoveNotification}><IconX size={16} /></button>
      </div>
      <p>{message}</p>
    </li>
  );
};

export default Notification;
