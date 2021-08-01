class App {
  constructor(canvas) {
    this.startTime = new Date();
    this.frames = 0;
    this.input = new Input();
    const updateSize = () => {
      canvas.width = document.body.clientWidth;
      canvas.height = document.body.clientHeight;
      this.input.canvasSize = new Size(canvas.width, canvas.height);
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
    this.content = null;
  }

  drawDebug() {
    const elapsedTime = (new Date() - this.startTime)/1000;
    const lines = [
      `Canvas size: ${this.input.canvasSize.width}x${this.input.canvasSize.height}`,
      `Mouse position: (${this.input.mousePosition.x}; ${this.input.mousePosition.y})`,
      `Mouse buttons: [${this.input.mouseLeftButtonDown ? 'L' : ' '}|${this.input.mouseWheel}|${this.input.mouseRightButtonDown ? 'R' : ' '}]`,
      `Key pressed: ${this.input.keyPressed || 'none'}`,
      `ElapsedTime: ${elapsedTime}s`,
      `Frames: ${this.frames}, FPS: ${(this.frames/elapsedTime).toFixed(1)}`
    ];
    drawMultiline(this.context2D, lines.filter(line => !!line));
  };

  start() {
    this.startTime = new Date();
    const loop = (time) => {
      this.context2D.save();
      this.frames++;
      this.context2D.fillStyle = '#111116';
      this.context2D.strokeStyle = '#ee8800';
      this.context2D.fillRect(0, 0, this.input.canvasSize.width, this.input.canvasSize.height);

      this.content.draw(this.context2D, this.input);

      this.drawDebug();
      this.context2D.restore();

      window.requestAnimationFrame(loop);
    };
    loop(this.startTime.getTime());
  }
}