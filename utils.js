const drawMultiline = (context2D, lines) => {
  context2D.save();
  const fontSize = 10;
  context2D.font = `${fontSize}px monospace`;
  const spacing = 2;
  let offset = 0;
  let maxWidth = 0;
  lines.forEach(line => {
    offset += spacing + fontSize;
    maxWidth = Math.max(maxWidth, context2D.measureText(line).width);
  });
  context2D.fillStyle = '#cccccc';
  context2D.fillRect(0, 0, 4*spacing + maxWidth, offset + 4*spacing);

  context2D.fillStyle = 'black';
  offset = spacing;
  lines.forEach(line => {
    offset += spacing + fontSize;
    context2D.fillText(line, 2*spacing, offset);
  });
  context2D.restore();
};

const printVec3 = (v, precision) =>
  `[${v.x.toFixed(precision)}:${v.y.toFixed(precision)};${v.z.toFixed(precision)}]`;