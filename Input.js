class Input {
  constructor(
    time,
    canvasSize,
    mousePosition,
    mouseLeftButtonDown,
    mouseRightButtonDown,
    mouseWheel,
    keyPressed,
    fractLevel,
    pointyUpward
  ) {
    this.time = time || 0;
    this.canvasSize = canvasSize || new Vec2();
    this.mousePosition = mousePosition || new Vec2();
    this.mouseLeftButtonDown = mouseLeftButtonDown || false;
    this.mouseRightButtonDown = mouseRightButtonDown || false;
    this.mouseWheel = mouseWheel || 0;
    this.keyPressed = keyPressed || null;
    this.fractLevel = fractLevel || 0;
    this.pointyUpward = pointyUpward || true;
  }
}