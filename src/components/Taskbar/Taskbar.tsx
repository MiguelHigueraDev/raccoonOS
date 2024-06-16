import TaskbarIcon from '../TaskbarIcon/TaskbarIcon'
import classes from './Taskbar.module.css'
const Taskbar = () => {
  return (
    <nav className={classes.taskbarContainer}>
      <TaskbarIcon iconUrl="./taskbar-icons/misfitos-logo.png" alt="Start Menu" />
    </nav>
  )
}

export default Taskbar