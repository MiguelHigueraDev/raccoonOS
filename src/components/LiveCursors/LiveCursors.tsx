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
        const isCurrentClient = clientId !== undefined && id === clientId + "";
        const hasntMoved = pos.x === 0 && pos.y === 0;

        if (isCurrentClient || hasntMoved) {
          return null;
        }

        return (
          <svg
            key={id}
            width="30px"
            height="30px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              position: "absolute",
              left: pos.x,
              top: pos.y,
              transform: "translate(-50%, -50%)",
            }}
          >
            <path
              d="M3.1,4.46l7.21,15.92A1.17,1.17,0,0,0,12.5,20l1.26-6.23L20,12.5a1.17,1.17,0,0,0,.39-2.19L4.46,3.1A1,1,0,0,0,3.1,4.46Z"
              fill={getColorForId(parseInt(id))}
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
