import classes from "./StartMenu.module.css";

const StartMenu = ({
  numberOfOpenedApps,
  isOpen,
}: {
  numberOfOpenedApps: number;
  isOpen: boolean;
}) => {
  // Just eyeballed this but it works by calculating the left position of the start menu based on the number of opened apps
  const leftPosition = `calc((${numberOfOpenedApps} * -20px - ${numberOfOpenedApps}px * 5) + (50% - 45px))`;

  return (
    isOpen && (
      <div
        style={{ left: leftPosition }}
        className={classes.startMenu}
      >
        StartMenu
      </div>
    )
  );
};

export default StartMenu;
