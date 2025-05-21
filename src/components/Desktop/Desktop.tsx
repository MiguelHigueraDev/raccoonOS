import { useEffect, useState, useRef, useCallback } from "react";
import AppIcon from "../AppIcon/AppIcon";
import classes from "./Desktop.module.css";
import Taskbar from "../Taskbar/Taskbar";
import TaskbarIcon from "../TaskbarIcon/TaskbarIcon";
import WindowStore from "../../stores/WindowStore";
import MobileWarning from "../MobileWarning/MobileWarning";
import PedroStore from "../../stores/PedroStore";
import { apps } from "./apps";
import DiscordApplication from "../Applications/DiscordApplication/DiscordApplication";
import { DraggableEvent, DraggableData } from "react-draggable";

interface AppState {
  isOpen: boolean;
  isHidden: boolean;
}

interface AppStates {
  [key: string]: AppState;
}

const Desktop: React.FC = () => {
  const { incZIndex, getZIndex } = WindowStore();
  const { stopPedroAudio } = PedroStore();

  const [numberOfOpenedApps, setNumberOfOpenedApps] = useState(0);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

  const [appStates, setAppStates] = useState<AppStates>(() =>
    apps.reduce((acc: AppStates, app) => {
      acc[app.name] = { isOpen: false, isHidden: false };
      return acc;
    }, {})
  );

  // New state for selection and dragging
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [selectionEnd, setSelectionEnd] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [selectedAppNames, setSelectedAppNames] = useState<Set<string>>(
    new Set()
  );

  const appIconRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());
  const desktopRef = useRef<HTMLDivElement>(null);

  const [iconPositions, setIconPositions] = useState<
    Map<string, { x: number; y: number }>
  >(() => {
    const initialPositions = new Map<string, { x: number; y: number }>();
    apps.forEach((app) => {
      initialPositions.set(app.name, app.position || { x: 20, y: 20 });
    });
    initialPositions.set("sourceGithub", { x: 100, y: 420 }); // For the hyperlink icon
    return initialPositions;
  });

  const [isGroupDragging, setIsGroupDragging] = useState(false);
  const [dragStartPositions, setDragStartPositions] = useState<
    Map<string, { x: number; y: number }>
  >(new Map());
  const [draggedIconInitialPos, setDraggedIconInitialPos] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const handleOpenApp = (appName: string) => {
    const appsToOpen = selectedAppNames.has(appName)
      ? Array.from(selectedAppNames)
      : [appName];

    appsToOpen.forEach((name) => {
      // Check if the name exists in appStates before trying to open
      if (appStates[name]) {
        incZIndex(name);
        setAppStates((prevState) => ({
          ...prevState,
          [name]: { isOpen: true, isHidden: false },
        }));
      } else if (name === "sourceGithub") {
        // Special handling for non-app items like the GitHub link
        window.open("https://github.com/MiguelHigueraDev/raccoonOS");
      }
    });

    if (appsToOpen.length > 0 && !isGroupDragging) {
      setSelectedAppNames(new Set());
    }
  };

  const handleTaskbarIconClick = (appName: string) => {
    incZIndex(appName);
    setAppStates((prevState) => ({
      ...prevState,
      [appName]: {
        ...prevState[appName],
        isHidden: !prevState[appName].isHidden,
      },
    }));
  };

  const toggleStartMenu = () => {
    // Disable the "Pedro" easter egg when clicking on this if it's active
    document.getElementById("background")?.classList.remove("pedro");
    document.getElementById("desktop")?.classList.remove("pedro-hides-desktop");
    stopPedroAudio();

    setIsStartMenuOpen(!isStartMenuOpen);
  };

  // Update the number of opened apps to display the start menu in the correct position
  useEffect(() => {
    setNumberOfOpenedApps(
      Object.values(appStates).filter((app) => app.isOpen).length
    );
  }, [setNumberOfOpenedApps, appStates]);

  const handleDesktopMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    const desktopCurrent = desktopRef.current;
    if (!desktopCurrent) return;

    const isDirectlyOnDesktop = event.target === desktopCurrent;
    let isClickOnAppIcon = false;
    // Check if the click target is an AppIcon or its child
    if (!isDirectlyOnDesktop) {
      for (const ref of appIconRefs.current.values()) {
        if (ref && ref.contains(event.target as Node)) {
          isClickOnAppIcon = true;
          break;
        }
      }
    }

    if (isDirectlyOnDesktop) {
      if (!event.shiftKey && !event.ctrlKey && !event.metaKey) {
        setSelectedAppNames(new Set());
      }
      setIsSelecting(true);
      const desktopRect = desktopCurrent.getBoundingClientRect();
      const x = event.clientX - desktopRect.left;
      const y = event.clientY - desktopRect.top;
      setSelectionStart({ x, y });
      setSelectionEnd({ x, y });
    } else if (!isClickOnAppIcon) {
      // Clicked outside desktop and not on an app icon (e.g., on a window)
      if (!event.shiftKey && !event.ctrlKey && !event.metaKey) {
        setSelectedAppNames(new Set());
      }
      setIsSelecting(false);
      setSelectionStart(null);
      setSelectionEnd(null);
    }
    // If isClickOnAppIcon, selection is handled by AppIcon's onClick -> handleAppIconClick
    // and drag is handled by AppIcon's onDragStart -> onIconDragStart
  };

  const handleDesktopMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isSelecting || !selectionStart || !desktopRef.current) return;

    const desktopRect = desktopRef.current.getBoundingClientRect();
    const currentX = event.clientX - desktopRect.left;
    const currentY = event.clientY - desktopRect.top;
    setSelectionEnd({ x: currentX, y: currentY });

    const tempSelectionArea = {
      x1: Math.min(selectionStart.x, currentX),
      y1: Math.min(selectionStart.y, currentY),
      x2: Math.max(selectionStart.x, currentX),
      y2: Math.max(selectionStart.y, currentY),
    };

    // Start with current selection if Shift is pressed, otherwise start fresh for this drag-select
    const currentSelectedDuringDrag = new Set<string>(
      event.shiftKey ? selectedAppNames : new Set()
    );

    // Iterate over all known icons (apps and hyperlinks)
    iconPositions.forEach((_, name) => {
      const iconRef = appIconRefs.current.get(name);
      if (iconRef) {
        const iconBoundingRect = iconRef.getBoundingClientRect();
        // Adjust iconRect to be relative to the desktop div
        const relativeIconRect = {
          top: iconBoundingRect.top - desktopRect.top,
          left: iconBoundingRect.left - desktopRect.left,
          bottom: iconBoundingRect.bottom - desktopRect.top,
          right: iconBoundingRect.right - desktopRect.top,
        };

        // Check for intersection
        const intersects =
          relativeIconRect.left < tempSelectionArea.x2 &&
          relativeIconRect.right > tempSelectionArea.x1 &&
          relativeIconRect.top < tempSelectionArea.y2 &&
          relativeIconRect.bottom > tempSelectionArea.y1;

        if (intersects) {
          currentSelectedDuringDrag.add(name);
        }
      }
    });
    setSelectedAppNames(currentSelectedDuringDrag);
  };

  const handleDesktopMouseUp = () => {
    setIsSelecting(false);
  };

  const getSelectionRectStyle = (): React.CSSProperties => {
    if (!isSelecting || !selectionStart || !selectionEnd) {
      return { display: "none" };
    }
    const x = Math.min(selectionStart.x, selectionEnd.x);
    const y = Math.min(selectionStart.y, selectionEnd.y);
    const width = Math.abs(selectionStart.x - selectionEnd.x);
    const height = Math.abs(selectionStart.y - selectionEnd.y);
    return {
      position: "absolute",
      left: x,
      top: y,
      width,
      height,
      border: "1px dashed #0078D4",
      backgroundColor: "rgba(0, 120, 212, 0.1)",
      zIndex: 100, // Above icons, below windows
    };
  };

  const setAppIconRef = useCallback(
    (name: string, el: HTMLDivElement | null) => {
      if (el) {
        appIconRefs.current.set(name, el);
      } else {
        appIconRefs.current.delete(name);
      }
    },
    []
  );

  const handleAppIconClick = (
    appName: string,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    event.stopPropagation();

    if (event.shiftKey) {
      setSelectedAppNames((prev) => {
        const newSelection = new Set(prev);
        if (newSelection.has(appName)) newSelection.delete(appName);
        else newSelection.add(appName);
        return newSelection;
      });
    } else if (event.ctrlKey || event.metaKey) {
      setSelectedAppNames((prev) => {
        const newSelection = new Set(prev);
        if (newSelection.has(appName)) newSelection.delete(appName);
        else newSelection.add(appName);
        return newSelection;
      });
    } else {
      if (!selectedAppNames.has(appName) || selectedAppNames.size > 1) {
        setSelectedAppNames(new Set([appName]));
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedAppNames(new Set());
        setIsSelecting(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Drag handlers for AppIcon
  const onIconDragStart = (
    appName: string,
    _e: DraggableEvent,
    data: DraggableData
  ): void | false => {
    if (!selectedAppNames.has(appName)) {
      setSelectedAppNames(new Set([appName]));
      setIsGroupDragging(false);
    }

    if (selectedAppNames.has(appName) && selectedAppNames.size > 1) {
      setIsGroupDragging(true);
      const currentPosMap = new Map<string, { x: number; y: number }>();
      selectedAppNames.forEach((name) => {
        const pos = iconPositions.get(name) || { x: 0, y: 0 };
        currentPosMap.set(name, pos);
      });
      setDragStartPositions(currentPosMap);
      setDraggedIconInitialPos({ x: data.x, y: data.y });
    } else {
      setIsGroupDragging(false);
      setDragStartPositions(new Map());
      setDraggedIconInitialPos(null);
    }
    return;
  };

  const onIconDrag = (
    appName: string,
    _e: DraggableEvent,
    data: DraggableData
  ): void | false => {
    if (
      isGroupDragging &&
      selectedAppNames.size > 1 &&
      draggedIconInitialPos &&
      dragStartPositions.size > 0
    ) {
      const deltaX = data.x - draggedIconInitialPos.x;
      const deltaY = data.y - draggedIconInitialPos.y;

      const newPosState = new Map(iconPositions);
      selectedAppNames.forEach((name) => {
        const originalPos = dragStartPositions.get(name);
        if (originalPos) {
          newPosState.set(name, {
            x: originalPos.x + deltaX,
            y: originalPos.y + deltaY,
          });
        }
      });
      setIconPositions(newPosState);
    } else {
      setIconPositions((prev) =>
        new Map(prev).set(appName, { x: data.x, y: data.y })
      );
    }
    return;
  };

  const onIconDragStop = (
    appName: string,
    _e: DraggableEvent,
    data: DraggableData
  ): void | false => {
    if (isGroupDragging) {
      // Final positions are already set in onIconDrag
    } else {
      setIconPositions((prev) =>
        new Map(prev).set(appName, { x: data.x, y: data.y })
      );
    }

    setIsGroupDragging(false);
    setDragStartPositions(new Map());
    setDraggedIconInitialPos(null);
    return;
  };

  return (
    <>
      <MobileWarning />
      <div
        id="desktop"
        className={classes.desktop}
        ref={desktopRef}
        onMouseDown={handleDesktopMouseDown}
        onMouseMove={handleDesktopMouseMove}
        onMouseUp={handleDesktopMouseUp}
        onMouseLeave={handleDesktopMouseUp}
        style={{ position: "relative", userSelect: "none" }}
      >
        {/* Selection Rectangle */}
        {isSelecting && selectionStart && selectionEnd && (
          <div style={getSelectionRectStyle()} />
        )}

        {/* Desktop Icons */}
        {apps.map(({ name, icon, title }) => {
          const currentPosition = iconPositions.get(name) ||
            apps.find((a) => a.name === name)?.position || { x: 0, y: 0 };
          return (
            <AppIcon
              key={name}
              appRef={(el: HTMLDivElement | null) => setAppIconRef(name, el)}
              onDoubleClick={() => handleOpenApp(name)}
              onClick={(event: React.MouseEvent<HTMLDivElement>) =>
                handleAppIconClick(name, event)
              }
              iconUrl={icon}
              name={title}
              controlledPosition={currentPosition}
              isSelected={selectedAppNames.has(name)}
              onDragStart={(e: DraggableEvent, dragData: DraggableData) =>
                onIconDragStart(name, e, dragData)
              }
              onDrag={(e: DraggableEvent, dragData: DraggableData) =>
                onIconDrag(name, e, dragData)
              }
              onDragStop={(e: DraggableEvent, dragData: DraggableData) =>
                onIconDragStop(name, e, dragData)
              }
            />
          );
        })}

        {/* Hyperlinks */}
        {(() => {
          const name = "sourceGithub";
          const currentPosition = iconPositions.get(name) || { x: 100, y: 420 };
          return (
            <AppIcon
              key={name}
              appRef={(el: HTMLDivElement | null) => setAppIconRef(name, el)}
              onDoubleClick={() =>
                window.open("https://github.com/MiguelHigueraDev/raccoonOS")
              }
              onClick={(event: React.MouseEvent<HTMLDivElement>) =>
                handleAppIconClick(name, event)
              }
              iconUrl="./app-icons/github.svg"
              name="Source"
              controlledPosition={currentPosition}
              isSelected={selectedAppNames.has(name)}
              onDragStart={(e: DraggableEvent, dragData: DraggableData) =>
                onIconDragStart(name, e, dragData)
              }
              onDrag={(e: DraggableEvent, dragData: DraggableData) =>
                onIconDrag(name, e, dragData)
              }
              onDragStop={(e: DraggableEvent, dragData: DraggableData) =>
                onIconDragStop(name, e, dragData)
              }
            />
          );
        })()}

        {/* Applications */}
        {apps.map(({ name, Component }) => (
          <Component
            key={name}
            winProps={{
              appName: name,
              isOpen: appStates[name].isOpen,
              isHidden: appStates[name].isHidden,
              handleClose: () =>
                setAppStates((prevState) => ({
                  ...prevState,
                  [name]: { ...prevState[name], isOpen: false },
                })),
              handleHide: () =>
                setAppStates((prevState) => ({
                  ...prevState,
                  [name]: { ...prevState[name], isHidden: true },
                })),
              zIndex: getZIndex(name),
            }}
          />
        ))}
      </div>
      <Taskbar
        appList={apps}
        numberOfOpenedApps={numberOfOpenedApps}
        isStartMenuOpen={isStartMenuOpen}
        handleToggleStartMenu={toggleStartMenu}
        handleOpenApp={handleOpenApp}
      >
        {/* Taskbar Icons */}
        {apps.map(({ name, icon, title }) => (
          <TaskbarIcon
            key={name}
            iconUrl={icon}
            isAppOpen={appStates[name].isOpen}
            isAppHidden={appStates[name].isHidden}
            handleClick={() => handleTaskbarIconClick(name)}
            alt={title}
          />
        ))}
      </Taskbar>
      <DiscordApplication
        winProps={{
          appName: "discord",
          isOpen: false,
          isHidden: true,
          handleClose: () => {},
          handleHide: () => {},
          zIndex: 0,
        }}
      />
    </>
  );
};

export default Desktop;
