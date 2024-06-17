import { ReactElement, useRef, useState } from "react";
import classes from "./Window.module.css";
import Draggable from "react-draggable";

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
  const [isMaximized, setIsMaximized] = useState<boolean>(true);
  const [finalWidth, setFinalWidth] = useState<string>(width + "px");
  const [finalHeight, setFinalHeight] = useState<string>(height + "px");

  const windowRef = useRef<HTMLDivElement>(null);

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
    if (isMaximized) {
      setFinalWidth("100vw");
      // Taskbar height is 52px
      setFinalHeight("calc(100vh - 52px)");

      // Reset window position to initial
      windowRef.current?.style.setProperty("transform", "translate(0, 0)");
    } else {
      setFinalWidth(width + "px");
      setFinalHeight(height + "px");
    }
  };

  const className = isHidden ? classes.minimized : classes.window;

  return (
    <Draggable bounds="parent" handle=".windowHeader">
      <div
        ref={windowRef}
        className={className}
        style={{ width: finalWidth, height: finalHeight }}
      >
        {/* Icons */}
        <div className={`${classes.windowHeader} windowHeader`}>
          <div>
            <div className={classes.windowName}>{name}</div>
          </div>
          <div className={classes.windowIcons}>
            <button onClick={handleHide}>
              <img src="./ui-icons/hide.svg" />
            </button>
            <button onClick={handleMaximize}>
              <img
                src={
                  isMaximized
                    ? "./ui-icons/maximize.svg"
                    : "./ui-icons/minimize.svg"
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
