import Draggable from "react-draggable";
import classes from "./AppIcon.module.css";

const AppIcon = ({
  iconUrl,
  name,
  onDoubleClick,
  position = { x: 20, y: 20 },
}: {
  iconUrl: string;
  name: string;
  onDoubleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  position?: AppIconCoordinates;
}) => {
  return (
    <Draggable bounds="parent" defaultPosition={position}>
      <div className={classes.iconContainer} onDoubleClick={onDoubleClick}>
        <img src={iconUrl} alt={name} />
        <div>{name}</div>
      </div>
    </Draggable>
  );
};

export interface AppIconCoordinates {
  x: number;
  y: number;
}

export default AppIcon;