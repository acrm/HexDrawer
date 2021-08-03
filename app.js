class App {
  constructor(canvas, fractInput, pointyInput) {
    this.startTime = new Date();
    this.frames = 0;
    this.previousSecond = new Date();
    this.previousSecondFrames = 0;
    this.fps = 0;
    this.input = new Input();
    const updateSize = () => {
      canvas.width = document.body.clientWidth;
      canvas.height = document.body.clientHeight;
      this.input.canvasSize = new Vec2(canvas.width, canvas.height);
    };
    window.addEventListener('resize', updateSize);
    updateSize();

    this.context2D = canvas.getContext('2d');
    canvas.addEventListener('mousemove', (e) => {
      const rect = e.target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      this.input.mousePosition = new Vec2(x, y);
    });
    canvas.addEventListener('mouseup', (e) => {
      this.input.mouseLeftButtonDown = false;
      this.input.mouseRightButtonDown = false;
    });
    canvas.addEventListener('mousedown', (e) => {
      this.input.mouseLeftButtonDown = e.buttons & 1;
      this.input.mouseRightButtonDown = e.buttons & 2;
    });
    canvas.addEventListener('wheel', (e) => {
      this.input.mouseWheel += Math.sign(e.deltaY);
      e.preventDefault();
    });
    canvas.addEventListener('contextmenu', e => {
      e.preventDefault();
    });
    document.addEventListener('keydown', e => {
      this.input.keyPressed = e.code;
    });
    document.addEventListener('keyup', e => {
      this.input.keyPressed = null;
    });
    fractInput.addEventListener('change', e => {
      this.input.fractLevel = parseInt(e.target.value);
    });
    pointyInput.addEventListener('change', e => {
      this.input.pointyUpward = e.target.checked;
    });
    this.content = null;
  }

  drawDebug() {
    const lines = [
      `Canvas size: ${this.input.canvasSize.width}x${this.input.canvasSize.height}`,
      `Mouse position: (${this.input.mousePosition.x}; ${this.input.mousePosition.y})`,
      `Mouse buttons: [${this.input.mouseLeftButtonDown ? 'L' : ' '}|${this.input.mouseWheel}|${this.input.mouseRightButtonDown ? 'R' : ' '}]`,
      `Key pressed: ${this.input.keyPressed || 'none'}`,
      `ElapsedTime: ${(this.elapsedMilliseconds/1000).toFixed(1)}s`,
      `Frames: ${this.frames}, FPS: ${(this.fps).toFixed(0)}`,
      `Hex Cells: ${HexCell.__debug__cellsCount}`
    ];
    drawMultiline(this.context2D, lines.filter(line => !!line));
  };

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
      this.context2D.fillRect(0, 0, this.input.canvasSize.x, this.input.canvasSize.y);

      this.content.update(this.input);
      this.content.draw(this.context2D);

      this.drawDebug();
      this.context2D.restore();

      window.requestAnimationFrame(loop);
    };
    loop(0);
  }
}