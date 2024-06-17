import Draggable from "react-draggable";
import classes from "./AppIcon.module.css";

const AppIcon = ({
  iconUrl,
  name,
  onDoubleClick,
}: {
  iconUrl: string;
  name: string;
  onDoubleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}) => {
  return (
    <Draggable bounds="parent">
      <div className={classes.iconContainer} onDoubleClick={onDoubleClick}>
        <img src={iconUrl} alt={name} />
        <div>{name}</div>
      </div>
    </Draggable>
  );
};

export default AppIcon;
