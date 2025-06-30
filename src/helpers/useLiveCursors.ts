import { useEffect, useState, useCallback, useRef } from "react";
import {
  LiveCursor,
  CursorPosition,
  RelativeCursorPosition,
} from "./LiveCursor";

enum MessageType {
  InitialConnection = 0x01,
  InitialUserList = 0x02,
  UserJoined = 0x03,
  UserLeft = 0x04,
  UserMovedCursor = 0x05,
  UserStartedClicking = 0x06,
  UserStoppedClicking = 0x07,
}

enum ConnectionStatus {
  Disconnected,
  Connecting,
  Connected,
}

const createCursorPositionMessage = (
  position: RelativeCursorPosition
): ArrayBuffer => {
  // Convert relative positions (0-1) to absolute positions (0-65535) (uint16 range)
  const x = Math.floor(position.xRelative * 65535);
  const y = Math.floor(position.yRelative * 65535);

  const buffer = new ArrayBuffer(5);
  const view = new DataView(buffer);

  view.setUint8(0, MessageType.UserMovedCursor);
  view.setUint16(1, x);
  view.setUint16(3, y);

  return buffer;
};

const createCursorClickMessage = (isClicking: boolean): ArrayBuffer => {
  const buffer = new ArrayBuffer(2);
  const view = new DataView(buffer);

  view.setUint8(
    0,
    isClicking
      ? MessageType.UserStartedClicking
      : MessageType.UserStoppedClicking
  );
  return buffer;
};

const THROTTLE_MS = 50;

const useLiveCursors = (url: string, throttleMs: number = THROTTLE_MS) => {
  const [cursors, setCursors] = useState<Record<number, CursorPosition>>({});
  const [clientId, setClientId] = useState<number | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(
    ConnectionStatus.Disconnected
  );
  const lastUpdateTimeRef = useRef(0);
  const wsRef = useRef<WebSocket | null>(null);
  const pendingUpdateRef = useRef(false);
  const positionRef = useRef<CursorPosition>({ x: 0, y: 0, isClicking: false });
  const cursorManagerRef = useRef<LiveCursor>(new LiveCursor());
  const [viewportSize, setViewportSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const viewportSizeRef = useRef(viewportSize);
  viewportSizeRef.current = viewportSize;

  const normalizePosition = useCallback(
    (x: number, y: number): RelativeCursorPosition => {
      return LiveCursor.absoluteToRelative({ x, y }, viewportSizeRef.current);
    },
    []
  );

  const throttledSendPosition = useCallback(() => {
    const now = Date.now();

    if (now - lastUpdateTimeRef.current >= throttleMs) {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        const relativePos = normalizePosition(
          positionRef.current.x,
          positionRef.current.y
        );

        const binaryMessage = createCursorPositionMessage(relativePos);
        wsRef.current.send(binaryMessage);
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
    setConnectionStatus(ConnectionStatus.Connecting);
    const ws = new WebSocket(url);
    wsRef.current = ws;
    ws.binaryType = "arraybuffer";

    ws.onopen = () => {
      console.log("WebSocket connection established with live cursors");
      setConnectionStatus(ConnectionStatus.Connected);
    };

    ws.onerror = (error) => {
      console.error(
        "Error establishing connection with live cursors WebSocket server:",
        error
      );
    };

    ws.onclose = (event) => {
      setConnectionStatus(ConnectionStatus.Disconnected);
      cursorManagerRef.current = new LiveCursor();
      setCursors({});
      if (!event.wasClean) {
        console.error("WebSocket connection closed unexpectedly:", event);
      }
    };

    ws.onmessage = (event) => {
      if (event.data instanceof ArrayBuffer) {
        const view = new DataView(event.data);
        const messageType = view.getUint8(0);

        // First byte is always the message type
        switch (messageType) {
          case MessageType.InitialConnection:
            setClientId(view.getUint8(1));
            break;

          case MessageType.InitialUserList:
            for (let i = 1; i < event.data.byteLength; i++) {
              const id = view.getUint8(i);
              if (id !== clientId) {
                cursorManagerRef.current.addOrUpdate(id, {
                  x: 0,
                  y: 0,
                  isClicking: false,
                });
              }
            }
            setCursors(cursorManagerRef.current.getAll());
            break;
          case MessageType.UserJoined: {
            const joinedId = view.getUint8(1);
            cursorManagerRef.current.addOrUpdate(joinedId, {
              x: 0,
              y: 0,
              isClicking: false,
            });
            setCursors(cursorManagerRef.current.getAll());
            break;
          }
          case MessageType.UserLeft: {
            const leftId = view.getUint8(1);
            cursorManagerRef.current.remove(leftId);
            setCursors(cursorManagerRef.current.getAll());
            break;
          }
          case MessageType.UserMovedCursor: {
            if (event.data.byteLength >= 5) {
              const id = view.getUint8(1);
              const xRelative = view.getUint16(2, false) / 65535;
              const yRelative = view.getUint16(4, false) / 65535;

              // Convert to absolute position
              const position = LiveCursor.relativeToAbsolute(
                { xRelative, yRelative },
                viewportSizeRef.current
              );

              // Preserve clicking state when updating position
              const currentCursor = cursorManagerRef.current.get(id);
              const isClicking = currentCursor?.isClicking || false;

              cursorManagerRef.current.addOrUpdate(id, {
                ...position,
                isClicking,
              });
              setCursors(cursorManagerRef.current.getAll());
            }
            break;
          }
          case MessageType.UserStartedClicking: {
            const id = view.getUint8(1);
            const cursor = cursorManagerRef.current.get(id);
            if (cursor) {
              cursorManagerRef.current.addOrUpdate(id, {
                ...cursor,
                isClicking: true,
              });
              setCursors(cursorManagerRef.current.getAll());
            }
            break;
          }
          case MessageType.UserStoppedClicking: {
            const id = view.getUint8(1);
            const cursor = cursorManagerRef.current.get(id);
            if (cursor) {
              cursorManagerRef.current.addOrUpdate(id, {
                ...cursor,
                isClicking: false,
              });
              setCursors(cursorManagerRef.current.getAll());
            }
            break;
          }
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      positionRef.current = {
        x: e.clientX,
        y: e.clientY,
        isClicking: positionRef.current.isClicking,
      };
      throttledSendPosition();
    };

    const handleMouseClick = (e: MouseEvent) => {
      if (e.button === 0) {
        const isClicking = e.type === "mousedown";
        positionRef.current.isClicking = isClicking;
        if (wsRef.current?.readyState === WebSocket.OPEN) {
          const binaryMessage = createCursorClickMessage(isClicking);
          wsRef.current.send(binaryMessage);
        }
      }
    };

    const handleResize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousedown", handleMouseClick);
    window.addEventListener("mouseup", handleMouseClick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousedown", handleMouseClick);
      window.removeEventListener("mouseup", handleMouseClick);
      pendingUpdateRef.current = false;
      ws.close();
      wsRef.current = null;
      setConnectionStatus(ConnectionStatus.Disconnected);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);
  return { cursors, clientId, connectionStatus };
};

export default useLiveCursors;
