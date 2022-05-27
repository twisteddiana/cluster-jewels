function circle(ctx, x, y, r, lineWidth, color) {
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color;
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.stroke();
};

function drawCircle(canvas, x, y, r) {
  const ctx = canvas.getContext("2d");
  ctx.beginPath();

  circle(ctx, x, y, r, 7, '#af7d44');
  circle(ctx, x, y, r, 3, '#f4ebd3');
  circle(ctx, x, y, r, 1, '#d8b589');

  ctx.closePath();
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

  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = 'black';
  ctx.fill();

  ctx.closePath();

  ctx.font = '20px Noto Sans';
  ctx.textBaseline = "middle";
  const padding = 20;
  const textY = top ? y - r - padding * 1.5 : y + r + padding * 1.5;

  const width = ctx.measureText(skillName).width;
  const bgX = x - (width + padding) / 2;
  const bgY = textY - (20 + padding) / 2;

  ctx.fillStyle = 'black';
  ctx.fillRect(bgX, bgY, width + padding, 20 + padding);
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

  // jewel outline
  drawCircle(canvas,330, 200, 120);

  drawSkillCircle(canvas, 330, 80, 25, skills[1]);
  drawSkillCircle(canvas, 225, 250, 25, skills[0]);
  drawSkillCircle(canvas, 440, 250, 25, skills[2], false);
};


