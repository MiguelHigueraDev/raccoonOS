import classes from './TaskbarClock.module.css'
const TaskbarClock = () => {
  return (
    <div className={classes.clock}>
        <time>14:45</time>
        <time>28/06/2024</time>
    </div>
  )
}

export default TaskbarClock