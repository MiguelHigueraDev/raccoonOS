import React from "react";
import Draggable, { DraggableEvent, DraggableData } from "react-draggable";
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
  controlledPosition?: AppIconCoordinates;
  isSelected?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  appRef?: (el: HTMLDivElement | null) => void;
  onDragStart?: (e: DraggableEvent, data: DraggableData) => void | false;
  onDrag?: (e: DraggableEvent, data: DraggableData) => void | false;
  onDragStop?: (e: DraggableEvent, data: DraggableData) => void | false;
}

const AppIcon: React.FC<AppIconProps> = ({
  iconUrl,
  name,
  onDoubleClick,
  position,
  controlledPosition,
  isSelected = false,
  onClick,
  appRef,
  onDragStart,
  onDrag,
  onDragStop,
}) => {
  const nodeRef = React.useRef(null); // Needed for react-draggable strict mode

  // Determine if the component is controlled or uncontrolled regarding its position
  const isControlled = controlledPosition !== undefined;
  const draggablePosition = isControlled ? controlledPosition : undefined;
  const defaultPosition = isControlled
    ? undefined
    : position || { x: 20, y: 20 };

  return (
    <Draggable
      bounds="parent"
      position={draggablePosition}
      defaultPosition={defaultPosition}
      nodeRef={nodeRef}
      onStart={onDragStart}
      onDrag={onDrag}
      onStop={onDragStop}
    >
      <div
        ref={(el) => {
          (nodeRef as React.MutableRefObject<HTMLDivElement | null>).current =
            el;
          if (appRef) appRef(el);
        }}
        className={`${classes.iconContainer} ${
          isSelected ? classes.selected : ""
        }`}
        onDoubleClick={onDoubleClick}
        onClick={onClick}
      >
        <img src={iconUrl} alt={name} />
        <div>{name}</div>
      </div>
    </Draggable>
  );
};

export default AppIcon;
