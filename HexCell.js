class HexCell {
  static fractalizationFactor = 1 / Math.sqrt(3);
  static __debug__cellsCount = 0;
  constructor(parent, subIndex, position) {
    if (HexCell.__debug__cellsCount === 0) {
      HexCell.__debug__cellsCount = 1;
    }

    this.hover = false;
    this.pointyUpward = true;
    this.radius = 300;
    this.position = position || new Vec2();
    this.subIndex = subIndex || 0;
    this.childrenLimit = this.subIndex === 0 ? 7 : 1;
    this.angleShift = 0;
    this.fractLevel = (parent && parent.fractLevel + 1) || 0;
    this.scale = Math.pow(HexCell.fractalizationFactor, this.fractLevel);
    this.angleShift = (this.fractLevel % 2 === 0) ^ this.pointyUpward ? 0 : Math.PI / 6;
    this.name = (parent && parent.name + this.subIndex) || 'A';
    this.children = [];
  }

  update(input) {
    if (this.pointyUpward !== input.pointyUpward) {
      this.pointyUpward = input.pointyUpward;
      this.angleShift = (this.fractLevel % 2 === 0) ^ this.pointyUpward ? 0 : Math.PI / 6;
      this.createChildren();
    }
    this.checkFractalization(input.fractLevel);
    this.hover = input.fractLevel === this.fractLevel
      && input.mousePosition.sub(this.position).length() <= this.radius * this.scale;

    for (let i = 0; i < this.children.length; i++) {
      this.children[i].update(input);
    }
  }

  checkFractalization(fractLevel) {
    if (fractLevel > this.fractLevel && this.children.length === 0) {
      this.createChildren();
    }
    if (fractLevel <= this.fractLevel && this.children.length > 0) {
      this.clearChildren();
    }
  }

  createChildren() {
    this.clearChildren();
    for (let i = 0; i < this.childrenLimit; i++) {
      const position = this.position.clone();
      if (i > 0) {
        position.x += Math.cos(Math.PI * 2 / 6 * (i - 1) + this.angleShift) * this.radius * this.scale;
        position.y += Math.sin(Math.PI * 2 / 6 * (i - 1) + this.angleShift) * this.radius * this.scale;
      }
      this.children.push(new HexCell(this, i, position));
    }
    HexCell.__debug__cellsCount += this.children.length;
  }

  clearChildren() {
    HexCell.__debug__cellsCount -= this.children.length;
    this.children = [];
  }

  draw(context2D) {
    context2D.save();
    context2D.scale(this.scale, this.scale);
    context2D.translate(this.position.x / this.scale, this.position.y / this.scale);

    context2D.beginPath();
    for (let i = 0; i < 6; i++) {
      const x = Math.cos(Math.PI * 2 / 6 * i + this.angleShift) * this.radius;
      const y = Math.sin(Math.PI * 2 / 6 * i + this.angleShift) * this.radius;
      if (i == 0) context2D.moveTo(x, y);
      else context2D.lineTo(x, y);
    }
    context2D.closePath();
    context2D.stroke();
    if (this.hover) {
      context2D.fillStyle = '#002211';
      context2D.fill();
    }

    if (this.children.length === 0) {
      this.drawName(context2D);
    }

    context2D.restore();

    for (let i = 0; i < this.children.length; i++) {
      this.children[i].draw(context2D);
    }
  }

  drawName(context2D) {
    context2D.save();
    const textHeight = 200;
    context2D.font = `${textHeight}px monospace`;
    const textMetric = context2D.measureText(this.name);
     if (textMetric.width > 200) {
       const factor = 200/textMetric.width;
       context2D.scale(factor, factor);
     }
    context2D.fillStyle = '#ee8800';
    context2D.fillText(this.name, -textMetric.width/2, (textMetric.actualBoundingBoxAscent + textMetric.actualBoundingBoxDescent)/2);
    context2D.restore();
  }
}