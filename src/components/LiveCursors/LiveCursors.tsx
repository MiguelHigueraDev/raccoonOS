import React from "react";

interface CursorPosition {
  x: number;
  y: number;
}

interface Cursors {
  [id: string]: CursorPosition;
}

interface LiveCursorsProps {
  cursors: Cursors;
}

const LiveCursors: React.FC<LiveCursorsProps> = ({ cursors }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 9999,
        overflow: "hidden",
      }}
    >
      {Object.entries(cursors).map(([id, pos]) => (
        <div
          key={id}
          className="cursor"
          style={{
            position: "absolute",
            left: pos.x,
            top: pos.y,
            width: "10px",
            height: "10px",
            background: "red",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  );
};

export default LiveCursors;
