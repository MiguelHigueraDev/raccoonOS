import classes from "./MobileWarning.module.css";

const MobileWarning: React.FC = () => {
  return (
    <div className={classes.mobileWarning}>
      <h1>:(</h1>
      <h2>raccoonOS error</h2>
      <p>
        Sorry, this website isn't optimized for mobile devices because it
        simulates a desktop OS. Please try visiting this website using a
        computer.
      </p>
      <img src="./cute-raccoon.webp" alt="Cute raccoon" />
    </div>
  );
};

export default MobileWarning;
