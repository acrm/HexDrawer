class HexStorage {
  constructor() {
    this.dictionary = {};
  }
  add(hex) {
    this.dictionary[hex.index] = hex;
  }
  get(index) {
    return this.dictionary[index] || null;
  }
}