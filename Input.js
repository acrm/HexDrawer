class Input {
  constructor(
    time,
    canvasSize,
    mousePosition,
    mouseLeftButtonDown,
    mouseRightButtonDown,
    mouseWheel,
    keyPressed,
    fractLevel
  ) {
    this.time = time || 0;
    this.canvasSize = canvasSize || new Size();
    this.mousePosition = mousePosition || new Vec2();
    this.mouseLeftButtonDown = mouseLeftButtonDown || false;
    this.mouseRightButtonDown = mouseRightButtonDown || false;
    this.mouseWheel = mouseWheel || 0;
    this.keyPressed = keyPressed || null;
    this.fractLevel = fractLevel || 0;
  }
}