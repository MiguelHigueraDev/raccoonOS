import { useEffect, useState, useCallback, useRef } from "react";
import {
  LiveCursor,
  CursorPosition,
  RelativeCursorPosition,
} from "./LiveCursor";

const THROTTLE_MS = 50;

const useLiveCursors = (url: string, throttleMs: number = THROTTLE_MS) => {
  const [cursors, setCursors] = useState<Record<string, CursorPosition>>({});
  const lastUpdateTimeRef = useRef(0);
  const wsRef = useRef<WebSocket | null>(null);
  const pendingUpdateRef = useRef(false);
  const positionRef = useRef<CursorPosition>({ x: 0, y: 0 });
  const cursorManagerRef = useRef<LiveCursor>(new LiveCursor());
  const [viewportSize, setViewportSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const normalizePosition = useCallback(
    (x: number, y: number): RelativeCursorPosition => {
      return LiveCursor.absoluteToRelative({ x, y }, viewportSize);
    },
    [viewportSize]
  );

  const throttledSendPosition = useCallback(() => {
    const now = Date.now();

    if (now - lastUpdateTimeRef.current >= throttleMs) {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        const relativePos = normalizePosition(
          positionRef.current.x,
          positionRef.current.y
        );

        wsRef.current.send(JSON.stringify(relativePos));
      }
      lastUpdateTimeRef.current = now;
      pendingUpdateRef.current = false;
    } else if (!pendingUpdateRef.current) {
      pendingUpdateRef.current = true;
      setTimeout(() => {
        throttledSendPosition();
      }, throttleMs - (now - lastUpdateTimeRef.current));
    }
  }, [throttleMs, normalizePosition]);

  useEffect(() => {
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.disconnected) {
        // Handle cursor disconnection
        cursorManagerRef.current.remove(data.id);
        setCursors(cursorManagerRef.current.getAll());
        return;
      }

      // Extract relative coordinates
      const relativePos: RelativeCursorPosition = {
        xRelative: data.xRelative || data.x,
        yRelative: data.yRelative || data.y,
      };

      // Convert to absolute position
      const position = LiveCursor.relativeToAbsolute(relativePos, viewportSize);

      // Update the cursor manager
      cursorManagerRef.current.addOrUpdate(data.id, position);

      // Update state with all cursors
      setCursors(cursorManagerRef.current.getAll());
    };

    const handleMouseMove = (e: MouseEvent) => {
      positionRef.current = { x: e.clientX, y: e.clientY };
      throttledSendPosition();
    };

    const handleResize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      pendingUpdateRef.current = false;
      ws.close();
      wsRef.current = null;
    };
  }, [url, throttledSendPosition, viewportSize]);

  return cursors;
};

export default useLiveCursors;
