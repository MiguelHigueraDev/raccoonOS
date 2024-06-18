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
  return (
    isAppOpen && (
      <button className={classes.taskbarButton} onClick={handleClick}>
        <img src={iconUrl} alt={alt} className={classes.taskbarIcon} />
      </button>
    )
  );
};

export default TaskbarIcon;
