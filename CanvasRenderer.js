class CanvasRenderer {
  constructor(canvas, content) {
    this.canvas = canvas;
    this.content = content;

    this.startTime = new Date();
    this.frames = 0;
    this.previousSecond = new Date();
    this.previousSecondFrames = 0;
    this.fps = 0;
    this.context2D = canvas.getContext('2d');
  }

  drawDebug() {
    const lines = [
      `Canvas size: ${this.canvas.width}x${this.canvas.height}`,
      // `Mouse position: (${this.input.mousePosition.x}; ${this.input.mousePosition.y})`,
      // `Mouse buttons: [${this.input.mouseLeftButtonDown ? 'L' : ' '}|${this.input.mouseWheel}|${this.input.mouseRightButtonDown ? 'R' : ' '}]`,
      // `Key pressed: ${this.input.keyPressed || 'none'}`,
      `ElapsedTime: ${(this.elapsedMilliseconds/1000).toFixed(1)}s`,
      `Frames: ${this.frames}, FPS: ${(this.fps).toFixed(0)}`,
      `Hex Cells: ${HexCell.__debug__cellsCount}`
    ];
    this.drawMultiline(lines.filter(line => !!line));
  };

  drawMultiline(lines) {
    this.context2D.save();
    const fontSize = 10;
    this.context2D.font = `${fontSize}px monospace`;
    const spacing = 2;
    let offset = 0;
    let maxWidth = 0;
    lines.forEach(line => {
      offset += spacing + fontSize;
      maxWidth = Math.max(maxWidth, this.context2D.measureText(line).width);
    });
    this.context2D.fillStyle = '#aacccccc';
    this.context2D.fillRect(0, 0, 4*spacing + maxWidth, offset + 4*spacing);
  
    this.context2D.fillStyle = 'black';
    offset = spacing;
    lines.forEach(line => {
      offset += spacing + fontSize;
      this.context2D.fillText(line, 2*spacing, offset);
    });
    this.context2D.restore();
  }

  start() {
    this.previousTimestamp = 0;
    this.previousTimestampFrames = 0;
    this.fps = 0;

    const loop = (elapsedMilliseconds) => {
      this.elapsedMilliseconds = elapsedMilliseconds;
      this.context2D.save();
      this.frames++;
      if(elapsedMilliseconds - this.previousTimestamp > 1000) {
        this.fps = (this.frames - this.previousTimestampFrames)/(elapsedMilliseconds - this.previousTimestamp)*1000;
        this.previousTimestampFrames = this.frames;
        this.previousTimestamp = elapsedMilliseconds;
      }
      this.context2D.fillStyle = '#111116';
      this.context2D.strokeStyle = '#ee8800';
      this.context2D.fillRect(0, 0, this.canvas.width, this.canvas.height);

      this.content.draw(this.context2D);

      this.drawDebug();
      this.context2D.restore();

      window.requestAnimationFrame(loop);
    };
    loop(0);
  }
}