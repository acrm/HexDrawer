class Scene {
  constructor() {
    this.origin = null;
    this.cameraPosition = new Vec2();
    this.lastMousePosition = null;
    this.content = null;
    this.zoom = 1;
  }

  update(input) {
    if (input.mouseLeftButtonDown) {
      const change = input.mousePosition.sub(this.lastMousePosition || input.mousePosition);
      this.cameraPosition = this.cameraPosition.add(change);
    }
    this.zoom = Math.pow(Math.sqrt(3), -input.mouseWheel);
    this.origin = input.canvasSize
      .mul(0.5)
      .add(this.cameraPosition);

    const relativeInput = {
      ...input,
      mousePosition: input.mousePosition.sub(this.origin).mul(1/this.zoom)
    };
    this.content.update(relativeInput);

    this.lastMousePosition = input.mousePosition;
  }

  draw(context2D) {
    context2D.save();

    context2D.scale(this.zoom, this.zoom);
    context2D.translate(this.origin.x / this.zoom, this.origin.y / this.zoom);
    this.content.draw(context2D);

    context2D.restore();
  }
}