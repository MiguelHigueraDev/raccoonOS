import { ReactElement, useRef, useState } from "react";
import classes from "./Window.module.css";
import Draggable from "react-draggable";
import WindowStore from "../../stores/WindowStore";

const Window = ({
  name = "Window",
  width = 600,
  height = 400,
  handleClose,
  handleHide,
  isHidden = false,
  children,
}: {
  name: string;
  width: number;
  height: number;
  handleClose: () => void;
  handleHide: () => void;
  isHidden: boolean;
  children?: ReactElement[] | ReactElement;
}) => {
  const { zIndex, incZIndex } = WindowStore();

  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  const [finalWidth, setFinalWidth] = useState<string>(width + "px");
  const [finalHeight, setFinalHeight] = useState<string>(height + "px");
  const [position, setPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });

  const windowRef = useRef<HTMLDivElement>(null);

  const handleMaximize = () => {
    if (!isMaximized) {
      // Store the current position before maximizing
      const transform = windowRef.current?.style.transform;
      const match = transform?.match(/translate\(([^,]+)px,\s*([^,]+)px\)/);
      if (match) {
        setPosition({ x: parseFloat(match[1]), y: parseFloat(match[2]) });
      }

      // Maximize the window
      setFinalWidth("100vw");
      setFinalHeight("calc(100vh - 52px)");
      windowRef.current?.style.setProperty("transform", "none");
    } else {
      // Restore the window to original size and position
      setFinalWidth(width + "px");
      setFinalHeight(height + "px");
      // Apply the stored position back
      windowRef.current?.style.setProperty(
        "transform",
        `translate(${position.x}px, ${position.y}px)`
      );
    }
    setIsMaximized(!isMaximized);
  };

  const putOnTop = () => {
    incZIndex();
    windowRef.current?.style.setProperty("z-index", zIndex.toString());
  };

  const handleDrag = (e, data) => {
    // Update position state during drag
    setPosition({ x: data.x, y: data.y });
  };

  const className = isHidden ? classes.minimized : classes.window;

  return (
    <Draggable
      bounds="parent"
      handle=".windowHandle"
      onMouseDown={putOnTop}
      onDrag={handleDrag}
      position={isMaximized ? { x: 0, y: 0 } : undefined} // Reset position if maximized
    >
      <div
        ref={windowRef}
        className={className}
        style={{ width: finalWidth, height: finalHeight }}
      >
        {/* Icons */}
        <div className={`${classes.windowHeader}`}>
          <div className={`${classes.windowName} windowHandle`}>
            <div>{name}</div>
          </div>
          <div className={classes.windowIcons}>
            <button onClick={handleHide}>
              <img src="./ui-icons/hide.svg" />
            </button>
            <button onClick={handleMaximize}>
              <img
                src={
                  isMaximized
                    ? "./ui-icons/minimize.svg"
                    : "./ui-icons/maximize.svg"
                }
              />
            </button>
            <button className="closeButton" onClick={handleClose}>
              <img src="./ui-icons/close.svg" />
            </button>
          </div>
        </div>
        {children}
      </div>
    </Draggable>
  );
};

export default Window;