class HexCell {
  static fractalizationFactor = 1 / Math.sqrt(3);
  static __debug__cellsCount = 0;
  constructor(parent, subIndex) {
    if (HexCell.__debug__cellsCount === 0) {
      HexCell.__debug__cellsCount = 1;
    }

    this.radius = 300;
    this.fractLevel = (parent && parent.fractLevel + 1) || 0;
    this.name = (parent && parent.name + subIndex) || 'A';
    this.children = [];
  }
  draw (context2D, input) {
    if (input.fractLevel > this.fractLevel && this.children.length === 0) {
      for (let i = 0; i < 7; i++) {
        this.children.push(new HexCell(this, i));
      }
      HexCell.__debug__cellsCount += 7;
    }
    if (input.fractLevel <= this.fractLevel && this.children.length > 0) {
      this.children = [];
      HexCell.__debug__cellsCount -= 7;
    }

    context2D.save();
    context2D.beginPath();
    const angleShift = this.fractLevel % 2 === 0 ? 0 : Math.PI / 6;
    for (let i = 0; i < 6; i++) {
      const x = Math.cos(Math.PI * 2 / 6 * i + angleShift) * this.radius;
      const y = Math.sin(Math.PI * 2 / 6 * i + angleShift) * this.radius;
      if (i == 0) context2D.moveTo(x, y);
      else context2D.lineTo(x, y);
    }
    context2D.closePath();
    context2D.stroke();

    if (this.children.length === 0) {
      context2D.save();
      context2D.font = '100px monospace';
      context2D.fillStyle = '#ee8800';
      context2D.fillText(this.name, 0, 0);
      context2D.restore();
    }

    if (this.children.length === 7) {
      for (let i = 0; i < 7; i++) {
        context2D.save();

        if (i > 0) {
          const x = Math.cos(Math.PI * 2 / 6 * (i - 1) + angleShift) * this.radius;
          const y = Math.sin(Math.PI * 2 / 6 * (i - 1) + angleShift) * this.radius;
          context2D.translate(x, y);
        }
        context2D.scale(HexCell.fractalizationFactor, HexCell.fractalizationFactor);
        this.children[i].draw(context2D, input);

        context2D.restore();
      }
    }
    context2D.restore();
  }
}