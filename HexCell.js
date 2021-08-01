class HexCell {
  draw (ctx, input) {
    const r = 100;
    const centerX = 400;
    const centerY = 400;
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const x = centerX + Math.cos(Math.PI * 2 / 6 * i) * r;
      const y = centerY + Math.sin(Math.PI * 2 / 6 * i) * r;
      if (i == 0)
        ctx.moveTo(x, y);
      else
        ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
  }
}