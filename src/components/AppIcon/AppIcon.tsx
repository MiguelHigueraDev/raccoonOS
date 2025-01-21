import Draggable from "react-draggable";
import classes from "./AppIcon.module.css";

export interface AppIconCoordinates {
  x: number;
  y: number;
}

interface AppIconProps {
  iconUrl: string;
  name: string;
  onDoubleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  position?: AppIconCoordinates;
}

const AppIcon: React.FC<AppIconProps> = ({
  iconUrl,
  name,
  onDoubleClick,
  position = { x: 20, y: 20 },
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

export default AppIcon;
