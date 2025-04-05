interface CursorPosition {
  x: number;
  y: number;
}

interface Cursors {
  [id: string]: CursorPosition;
}

interface LiveCursorsProps {
  cursors: Cursors;
  clientId?: string | number | null;
}

const LiveCursors: React.FC<LiveCursorsProps> = ({ cursors, clientId }) => {
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
      {Object.entries(cursors).map(([id, pos]) => {
        // Exclude the current client's cursor from rendering
        // Also skip cursors at position 0,0

        const isCurrentClient = clientId !== undefined && id === clientId + "";
        const hasntMoved = pos.x === 0 && pos.y === 0;

        if (isCurrentClient || hasntMoved) {
          return null;
        }

        return (
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
        );
      })}
    </div>
  );
};

export default LiveCursors;
