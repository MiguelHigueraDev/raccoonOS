import classes from "./TaskbarIcon.module.css";

const TaskbarIcon = ({
  isAppOpen,
  isAppHidden,
  handleClick,
  iconUrl,
  alt,
  showIndicator = true,
}: {
  isAppOpen: boolean;
  isAppHidden: boolean;
  handleClick: () => void;
  iconUrl: string;
  alt: string;
  showIndicator?: boolean;
}) => {
  return (
    isAppOpen && (
      <button className={classes.taskbarButton} onClick={handleClick}>
        <img src={iconUrl} alt={alt} className={classes.taskbarIcon} />
        {showIndicator && (
          <div
            className={`${classes.indicator} ${
              isAppHidden ? classes.hiddenIndicator : classes.visibleIndicator
            }`}
          ></div>
        )}
      </button>
    )
  );
};

export default TaskbarIcon;
