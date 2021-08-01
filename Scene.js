class Scene {
  constructor() {
    this.cameraPosition = null;
    this.lastMousePosition = null;
    this.content = null;
  }

  draw(context2D, input) {
    if (this.cameraPosition === null) {
      this.cameraPosition = input.canvasSize.toVec2().mul(0.5);
    }

    if (input.mouseLeftButtonDown) {
      const change = input.mousePosition.sub(this.lastMousePosition || input.mousePosition);
      this.cameraPosition = this.cameraPosition.add(change);
    }

    context2D.save();

    const zoom = Math.pow(1.5, -input.mouseWheel);
    context2D.scale(zoom, zoom);
    context2D.translate(this.cameraPosition.x/zoom, this.cameraPosition.y/zoom);
    this.content.draw(context2D, input);

    context2D.restore();

    this.lastMousePosition = input.mousePosition;
  }
}