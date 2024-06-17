import classes from "./TaskbarIcon.module.css";

const TaskbarIcon = ({
  isAppOpen,
  handleClick,
  iconUrl,
  alt,
}: {
  isAppOpen: boolean;
  handleClick: () => void;
  iconUrl: string;
  alt: string;
}) => {

  return isAppOpen && <img src={iconUrl} alt={alt} onClick={handleClick} className={classes.taskbarIcon} />;
};

export default TaskbarIcon;
