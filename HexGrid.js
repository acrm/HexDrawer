class HexGrid extends EventSourceBase {
  constructor() {
    super(['cellSelected']);
    this.content = new HexCell();

    this.origin = null;
    this.cameraPosition = new Vec2();
    this.lastMousePosition = null;
    this.zoom = 1;
    this.hexStorage = new HexStorage();
    this.selectedCellIndex = null;
    this.selectedHex = null;
    this.currentColor = '#000000';
    this.fractLevel = 0;
  }

  notifyCellSelected(index, content) {
    this.notify('cellSelected', { index, content });
  }

  setColor(color) {
    if (this.selectedHex) {
      this.selectedHex.color = color;
    }
    this.currentColor = color;
  }

  update(input) {
    this.fractLevel = input.fractLevel;
    const cachedSelectedCellIndex = this.selectedCellIndex;

    if (input.mouseRightButtonDown) {
      const change = input.mousePosition.sub(this.lastMousePosition || input.mousePosition);
      this.cameraPosition = this.cameraPosition.add(change);
    }

    if (input.mouseLeftButtonDown) {
      this.selectedCellIndex = null;
    }

    this.zoom = Math.pow(Math.sqrt(3), -input.mouseWheel);
    this.origin = input.canvasSize
      .mul(0.5)
      .add(this.cameraPosition);

    const relativeInput = {
      ...input,
      setCellIndex: index => {
        this.selectedCellIndex = index;
      },
      mousePosition: input.mousePosition.sub(this.origin).mul(1/this.zoom)
    };
    this.content.update(relativeInput, this.hexStorage);

    if (this.selectedCellIndex != cachedSelectedCellIndex) {
      if (this.selectedCellIndex != null) {
        this.hexStorage.get(this.selectedCellIndex);
        let hex = this.hexStorage.get(this.selectedCellIndex);
        if (!hex) {
          hex = new Hex(this.selectedCellIndex, this.currentColor);
          this.hexStorage.add(hex);
        }
        this.selectedHex = hex;
      }
      else {
        this.selectedHex = null;
      }
      this.notifyCellSelected(this.selectedCellIndex, this.selectedHex);
    }

    this.lastMousePosition = input.mousePosition;
  }

  draw(context2D) {
    context2D.save();

    context2D.scale(this.zoom, this.zoom);
    context2D.translate(this.origin.x / this.zoom, this.origin.y / this.zoom);

    for (let level = 0; level <= this.fractLevel; level++) {
      this.content.draw(context2D, level);
    }

    context2D.restore();
  }
}