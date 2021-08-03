class Vec2 {
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }
  add(other) { return new Vec2(this.x + other.x, this.y + other.y); }
  sub(other) { return new Vec2(this.x - other.x, this.y - other.y); }
  mul(scalar) { return new Vec2(this.x * scalar, this.y * scalar); }
  clone() { return new Vec2(this.x, this.y); }
  length() { return Math.sqrt(this.x * this.x + this.y * this.y); }
}