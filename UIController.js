class UIController {
  constructor(hexGrid) {
    this.canvas = document.getElementById('canvas');
    this.fractInput = document.getElementById('fract-input');
    this.pointyInput = document.getElementById('pointy-input');
    this.cellInfo = document.getElementById('cell-info');
    this.indexInput = document.getElementById('cell-index');
    this.colorInput = document.getElementById('cell-color');

    this.hexGrid = hexGrid;
    this.input = new Input();

    this.renderer = new CanvasRenderer(this.canvas, this.hexGrid);

    window.addEventListener("load", () => {
      this.renderer.start();
    });

    const updateSize = () => {
      this.canvas.width = document.body.clientWidth;
      this.canvas.height = document.body.clientHeight;
      this.input.canvasSize = new Vec2(canvas.width, canvas.height);
      this.notifyInputUpdate();
    };
    window.addEventListener('resize', updateSize);
    updateSize();

    this.hexGrid.addListener('cellSelected', ({index, hex}) => {
      this.indexInput.value = index || '';
      this.indexInput.dispatchEvent(new Event('change'));
      if (hex) {
        this.colorInput.value = hex.color;
      }
    });

    this.indexInput.addEventListener('change', e => {
      if (e.target.value == '') this.cellInfo.classList.add('hidden');
      else this.cellInfo.classList.remove('hidden');
    });

    this.canvas.addEventListener('mousemove', (e) => {
      const rect = e.target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      this.input.mousePosition = new Vec2(x, y);
      this.notifyInputUpdate();
    });

    this.canvas.addEventListener('mouseup', (e) => {
      this.input.mouseLeftButtonDown = false;
      this.input.mouseRightButtonDown = false;
      this.notifyInputUpdate();
    });

    this.canvas.addEventListener('mousedown', (e) => {
      this.input.mouseLeftButtonDown = e.buttons & 1;
      this.input.mouseRightButtonDown = e.buttons & 2;
      this.notifyInputUpdate();
    });

    this.canvas.addEventListener('wheel', (e) => {
      this.input.mouseWheel += Math.sign(e.deltaY);
      this.notifyInputUpdate();
      e.preventDefault();
    });

    this.canvas.addEventListener('contextmenu', e => {
      e.preventDefault();
    });

    document.addEventListener('keydown', e => {
      this.input.keyPressed = e.code;
      this.notifyInputUpdate();
    });

    document.addEventListener('keyup', e => {
      this.input.keyPressed = null;
      this.notifyInputUpdate();
    });

    this.fractInput.addEventListener('change', e => {
      this.input.fractLevel = parseInt(e.target.value);
      localStorage.setItem('fractLevel', this.input.fractLevel);
      this.notifyInputUpdate();
    });
    this.input.fractLevel = parseInt(localStorage.getItem('fractLevel') || 0);
    this.fractInput.value = this.input.fractLevel;

    this.pointyInput.addEventListener('change', e => {
      this.input.pointyUpward = e.target.checked;
      localStorage.setItem('pointyUpward', this.input.pointyUpward);
    });
    this.input.pointyUpward = localStorage.getItem('pointyUpward') === 'true';
    this.pointyInput.checked = this.input.pointyUpward;

    this.colorInput.addEventListener('change', e => {
      this.input.color = e.target.value;
      this.notifyInputUpdate();
      this.hexGrid.setColor(this.input.color);
    });
    this.notifyInputUpdate();
  }

  notifyInputUpdate() {
    this.hexGrid.update(this.input);
  }
}