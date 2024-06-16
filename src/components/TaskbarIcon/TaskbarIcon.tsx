import classes from './TaskbarIcon.module.css'

const TaskbarIcon = ({iconUrl, alt}: {iconUrl: string, alt: string}) => {
  return (
    <img src={iconUrl} alt={alt} className={classes.taskbarIcon} />
  )
}

export default TaskbarIcon