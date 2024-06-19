import classes from "./MobileWarning.module.css";

const MobileWarning = () => {
  return (
    <div className={classes.mobileWarning}>
        <p>Sorry, this website isn't optimized for mobile devices because it simulates a desktop OS. Please try visiting this website using a computer.</p>
    </div>
  )
}

export default MobileWarning