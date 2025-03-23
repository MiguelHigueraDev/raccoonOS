import { useEffect, useState, useCallback, useRef } from "react";

const THROTTLE_MS = 50;

const useLiveCursors = (url: string, throttleMs: number = THROTTLE_MS) => {
  const [cursors, setCursors] = useState({});
  const lastUpdateTimeRef = useRef(0);
  const wsRef = useRef<WebSocket | null>(null);
  const pendingUpdateRef = useRef(false);
  const positionRef = useRef({ x: 0, y: 0 });
  const [viewportSize, setViewportSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const normalizePosition = useCallback(
    (x: number, y: number) => {
      return {
        xRelative: x / viewportSize.width,
        yRelative: y / viewportSize.height,
      };
    },
    [viewportSize]
  );

  const throttledSendPosition = useCallback(() => {
    const now = Date.now();

    if (now - lastUpdateTimeRef.current >= throttleMs) {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        const { xRelative, yRelative } = normalizePosition(
          positionRef.current.x,
          positionRef.current.y
        );

        wsRef.current.send(
          JSON.stringify({
            xRelative,
            yRelative,
          })
        );
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
      // Convert relative coordinates back to pixels for local use
      const xRelative = data.xRelative || data.x;
      const yRelative = data.yRelative || data.y;

      const x = Math.round(xRelative * viewportSize.width);
      const y = Math.round(yRelative * viewportSize.height);
      setCursors((prev) => ({ ...prev, [data.id]: { x, y } }));
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
