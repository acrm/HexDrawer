class Size {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  toVec2() { return new Vec2(this.width, this.height); }
}