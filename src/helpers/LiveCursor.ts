export interface CursorPosition {
  x: number;
  y: number;
  isClicking?: boolean;
}

export interface RelativeCursorPosition {
  xRelative: number;
  yRelative: number;
}

export class LiveCursor {
  private cursors: Record<number, CursorPosition> = {};

  // Add a cursor or update its position
  addOrUpdate(id: number, position: CursorPosition): void {
    this.cursors[id] = position;
  }

  // Remove a cursor by ID
  remove(id: number): void {
    if (this.cursors[id]) {
      delete this.cursors[id];
    }
  }

  // Get a specific cursor by ID
  get(id: number): CursorPosition | undefined {
    return this.cursors[id];
  }

  // Get all cursors
  getAll(): Record<string, CursorPosition> {
    return { ...this.cursors };
  }

  // Convert relative position to absolute based on viewport
  static relativeToAbsolute(
    relativePos: RelativeCursorPosition,
    viewportSize: { width: number; height: number }
  ): CursorPosition {
    return {
      x: Math.round(relativePos.xRelative * viewportSize.width),
      y: Math.round(relativePos.yRelative * viewportSize.height),
    };
  }

  // Convert absolute position to relative based on viewport
  static absoluteToRelative(
    position: CursorPosition,
    viewportSize: { width: number; height: number }
  ): RelativeCursorPosition {
    return {
      xRelative: position.x / viewportSize.width,
      yRelative: position.y / viewportSize.height,
    };
  }
}
