import { useEffect, useState } from 'react';
import classes from './TaskbarClock.module.css';
const TaskbarClock = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const dateInterval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(dateInterval);
  }, []);

  const formatTime = (date: Date) => {
    const minutes = String(date.getHours()).padStart(2, '0');
    const seconds = String(date.getMinutes()).padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className={classes.clock}>
      <time>{formatTime(currentDate)}</time>
      <time>{formatDate(currentDate)}</time>
    </div>
  );
};

export default TaskbarClock;
