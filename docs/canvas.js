function circle(ctx, x, y, r, lineWidth, color) {
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color;
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.stroke();
};

function fill(ctx, color) {
  ctx.fillStyle = color;
  ctx.fill();
};

function drawJewelOutline(canvas, x, y, r) {
  const outlineCtx = canvas.getContext("2d");
  outlineCtx.beginPath();

  circle(outlineCtx, x, y, r, 7, '#af7d44');
  circle(outlineCtx, x, y, r, 3, '#f4ebd3');
  circle(outlineCtx, x, y, r, 1, '#d8b589');

  outlineCtx.closePath();

  const smallConnector = canvas.getContext("2d");
  smallConnector.beginPath();
  circle(smallConnector, x, y + r, 12,7, '#af7d44');
  circle(smallConnector, x, y + r, 12,3, '#f4ebd3');
  circle(smallConnector, x, y + r, 12, 1, '#d8b589');
  fill(smallConnector,'black');
  smallConnector.closePath();

  const connectorLine = canvas.getContext("2d");
  connectorLine.moveTo(x, y + r + 13);
  connectorLine.lineTo(x, y + r + 80);
  connectorLine.lineWidth = 4;
  connectorLine.stroke();
  connectorLine.closePath();
};

function drawSkillCircle(canvas, x, y, r, skillName, top = true) {
  if (!skillName) {
    return;
  }

  const ctx = canvas.getContext("2d");
  ctx.beginPath();

  circle(ctx, x, y, r, 10, '#996928');
  circle(ctx, x, y, r, 9, '#e0871b');
  circle(ctx, x, y, r, 8, '#ffcc5c');
  circle(ctx, x, y, r, 7, '#b28861');
  circle(ctx, x, y, r, 6, '#ffffff');
  circle(ctx, x, y, r, 5, '#e2c6b3');
  circle(ctx, x, y, r, 4, '#edc577');

  fill(ctx,'black');

  ctx.closePath();

  const fontSize = 20;
  ctx.font = `${fontSize}px Noto Sans`;
  ctx.textBaseline = "middle";
  const padding = 20;
  const textY = top ? y - r - padding * 1.5 : y + r + padding * 1.5;

  const width = ctx.measureText(skillName).width;
  const bgX = x - (width + padding) / 2;
  const bgY = textY - (fontSize + padding) / 2;

  ctx.fillStyle = 'black';
  ctx.fillRect(bgX, bgY, width + padding, fontSize + padding);
  ctx.stroke();

  ctx.fillStyle = '#edc577';
  ctx.textAlign = 'center';
  ctx.fillText(skillName, x, textY);
}

export function drawCanvas(skills) {
  if (!skills.length) {
    return;
  }
  const canvas = document.getElementById("canvas");

  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);

  drawJewelOutline(canvas,330, 200, 120);

  drawSkillCircle(canvas, 330, 80, 25, skills[1]);
  drawSkillCircle(canvas, 225, 250, 25, skills[0]);
  drawSkillCircle(canvas, 440, 250, 25, skills[2], false);
};


