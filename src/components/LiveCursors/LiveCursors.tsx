import React, { useEffect, useRef, useState } from "react";

interface CursorPosition {
  x: number;
  y: number;
  isClicking?: boolean;
}

interface Cursors {
  [id: string]: CursorPosition;
}

interface LiveCursorsProps {
  cursors: Cursors;
  clientId?: string | number | null;
}

interface InterpolatedCursor extends CursorPosition {
  targetX: number;
  targetY: number;
  isClicking: boolean;
}

interface InterpolatedCursors {
  [id: string]: InterpolatedCursor;
}

const colorCache: Record<string, string> = {};

function getColorForId(id: number): string {
  const idStr = id.toString();

  if (colorCache[idStr]) {
    return colorCache[idStr];
  }

  const prime = 83;
  const goldenRatioConjugate = 0.618033988749895;
  const hue = ((id * prime * goldenRatioConjugate) % 1) * 360;
  const saturation = 85 + (id % 3) * 5;
  const lightness = 50 + (id % 5) * 2;

  colorCache[idStr] = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  return colorCache[idStr];
}

function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

const LiveCursors: React.FC<LiveCursorsProps> = ({ cursors, clientId }) => {
  const [smoothCursors, setSmoothCursors] = useState<InterpolatedCursors>({});
  const animationFrameRef = useRef<number | null>(null);
  const cursorsRef = useRef<InterpolatedCursors>({});

  // Update target positions when cursors prop changes and handle disconnected cursors
  useEffect(() => {
    const updatedCursors: InterpolatedCursors = {};
    const activeCursorIds = new Set(Object.keys(cursors));

    // Skip cursors that are not active (disconnected)
    Object.entries(cursorsRef.current).forEach(([id, cursor]) => {
      if (activeCursorIds.has(id)) {
        updatedCursors[id] = { ...cursor };
      }
    });

    // Add or update cursors from the incoming prop
    Object.entries(cursors).forEach(([id, pos]) => {
      if (!updatedCursors[id]) {
        // New cursor - initialize at target position
        updatedCursors[id] = {
          x: pos.x,
          y: pos.y,
          targetX: pos.x,
          targetY: pos.y,
          isClicking: pos.isClicking || false,
        };
      } else {
        // Existing cursor - update target position only
        updatedCursors[id].targetX = pos.x;
        updatedCursors[id].targetY = pos.y;
        // Update clicking state immediately
        updatedCursors[id].isClicking = pos.isClicking || false;
      }
    });

    cursorsRef.current = updatedCursors;
    setSmoothCursors({ ...updatedCursors });
  }, [cursors]);

  useEffect(() => {
    const interpolateCursors = () => {
      const updated = { ...cursorsRef.current };

      Object.keys(updated).forEach((id) => {
        const cursor = updated[id];
        const dx = cursor.targetX - cursor.x;
        const dy = cursor.targetY - cursor.y;

        if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
          cursor.x = cursor.targetX;
          cursor.y = cursor.targetY;
        } else {
          cursor.x = lerp(cursor.x, cursor.targetX, 0.1);
          cursor.y = lerp(cursor.y, cursor.targetY, 0.1);
        }
      });

      cursorsRef.current = updated;
      setSmoothCursors({ ...updated });

      animationFrameRef.current = requestAnimationFrame(interpolateCursors);
    };

    animationFrameRef.current = requestAnimationFrame(interpolateCursors);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 99999999999,
        overflow: "hidden",
      }}
    >
      {Object.entries(smoothCursors).map(([id, pos]) => {
        const isCurrentClient = clientId !== undefined && id === clientId + "";
        const hasntMoved = pos.x === 0 && pos.y === 0;

        if (isCurrentClient || hasntMoved) {
          return null;
        }

        const cursorColor = getColorForId(parseInt(id));
        const fillColor = pos.isClicking ? "white" : cursorColor;

        return (
          <svg
            key={id}
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              position: "absolute",
              left: pos.x,
              top: pos.y,
              transform: "translate(-50%, -50%)",
              transition: "none",
            }}
          >
            <path
              d="M3.1,4.46l7.21,15.92A1.17,1.17,0,0,0,12.5,20l1.26-6.23L20,12.5a1.17,1.17,0,0,0,.39-2.19L4.46,3.1A1,1,0,0,0,3.1,4.46Z"
              fill={fillColor}
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      })}
    </div>
  );
};

export default LiveCursors;
