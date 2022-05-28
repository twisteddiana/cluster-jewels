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

/*function drawJewelOutline(canvas, x, y, r) {
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
};*/

const TO_RADIANS = Math.PI/180;
function drawOrbit(canvas, x, y, r) {
  return new Promise(resolve => {
    const ctx = canvas.getContext('2d');
    const image = new Image(240, 240);
    image.onload = drawImageActualSize;
    image.src = './assets/orbit.png';

    function drawImageActualSize() {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(r * TO_RADIANS);
      ctx.translate(-x, -y);
      ctx.drawImage(this, x, y);
      ctx.restore();

      resolve();
    }
  });
}

function drawSockets(canvas) {
  return new Promise(resolve => {
    const ctx = canvas.getContext('2d');
    const image = new Image(240, 240);
    image.onload = drawImageActualSize;
    image.src = './assets/socket3.png';

    function drawImageActualSize() {
      ctx.drawImage(this, 180, 115);
      ctx.drawImage(this, 400, 115);
      resolve();
    }
  });
}

function drawSmallPassive(ctx, thisObj, x, y) {
  const r = 15;
  ctx.beginPath();
  ctx.arc(x + r * 2, y +  r * 2, r, 0, 2 * Math.PI);
  ctx.fillStyle = '#150f0a';
  ctx.fill();
  ctx.closePath();

  ctx.drawImage(thisObj, x, y);
}

function drawSmallPassives(canvas, nbrPassives) {
  return new Promise(resolve => {
    const ctx = canvas.getContext('2d');
    const image = new Image(240, 240);
    image.onload = drawImageActualSize;
    image.src = './assets/small_passive3.png';

    function drawImageActualSize() {
      drawSmallPassive(ctx, this, 300, 315);
      drawSmallPassive(ctx, this, 235, 80);
      drawSmallPassive(ctx, this, 365, 80);

      if (nbrPassives > 8) {
        drawSmallPassive(ctx, this, 427, 190);
      }
      if (nbrPassives > 9) {
        drawSmallPassive(ctx, this, 172, 190);
      }

      if (nbrPassives > 10) {
        drawSmallPassive(ctx, this, 358, 300);
      }

      if (nbrPassives > 11) {
        drawSmallPassive(ctx, this, 241, 300);
      }

      resolve();
    }
  });
}

function drawConnectorLine(canvas) {
  return new Promise(resolve => {
    const ctx = canvas.getContext('2d');
    const image = new Image(240, 240);
    image.onload = drawImageActualSize;
    image.src = './assets/line.png';
    function drawImageActualSize() {
      ctx.save();
      ctx.translate(100, 100);
      ctx.rotate(90 * TO_RADIANS);
      ctx.translate(-100, -100);
      ctx.drawImage(this, 350, -135, 100, 15);
      ctx.restore();
      resolve();
    }
  });
}

async function drawJewelOutline(canvas, nbrPassives) {
  // orbit is not perfect
  await drawOrbit(canvas, 190, 80, 0);
  await drawOrbit(canvas, 464, 79, 90);
  await drawOrbit(canvas, 191, 354, -90);
  await drawOrbit(canvas, 465, 353, 180);
  await drawConnectorLine(canvas);

  await drawSockets(canvas);
  await drawSmallPassives(canvas, nbrPassives);

}

function drawSkill(canvas, x, y, skill, top = true) {
  if (!skill) {
    return;
  }

  return new Promise(resolve => {
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    const image = new Image(240, 240);
    image.onload = drawImageActualSize;
    image.src = './assets/notable2.png';

    ctx.arc(x + 30, y + 30, 20, 0, 2 * Math.PI);
    ctx.fillStyle = '#150f0a';
    ctx.fill();

    function drawImageActualSize() {
      ctx.drawImage(this, x, y);

      // draw circle
      //


      /*const fontSize = 20;
      const padding = 20;
      const imageSize = 30;

      ctx.font = `${fontSize}px Noto Sans`;
      ctx.textBaseline = "middle";

      const textY = top ? y - padding * 1.5 : y + imageSize * 2 + padding * 1.5;

      const width = ctx.measureText(skill.name).width;
      const bgX = x - (width + padding) / 2 + imageSize;
      const bgY = textY - (fontSize + padding) / 2;

      ctx.fillStyle = 'black';
      ctx.fillRect(bgX, bgY, width + padding, fontSize + padding);
      ctx.stroke();

      ctx.fillStyle = '#edc577';
      ctx.textAlign = 'center';
      ctx.fillText(skill.name, x + imageSize, textY);*/

      resolve();
    }
  });
}

/*
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
}*/

function drawJewelBackground(canvas) {
  const ctx = canvas.getContext("2d");
  return new Promise(resolve => {
    const image = new Image(240, 240);
    image.onload = drawImageActualSize;
    image.src = './assets/jewel_background.png';
    function drawImageActualSize() {
      ctx.drawImage(this, 185, 75);
      ctx.save();
      ctx.rotate(180 * TO_RADIANS);
      ctx.translate(-469, -363);
      ctx.drawImage(this, 0, 0);
      ctx.restore();
      resolve();
    }
  });
}

export async function drawCanvas(skills, nbrPassives) {
  if (!skills.length) {
    return;
  }
  const canvas = document.getElementById("canvas");

  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);

  await drawJewelBackground(canvas);
  await drawJewelOutline(canvas, nbrPassives);

  await drawSkill(canvas, 300, 60, skills[1]);
  await drawSkill(canvas, 410, 250, skills[0]);
  await drawSkill(canvas, 190, 250, skills[2], false);
  // drawSkillCircle(canvas, 330, 80, 25, skills[1]);
  // drawSkillCircle(canvas, 225, 250, 25, skills[0]);
  // drawSkillCircle(canvas, 440, 250, 25, skills[2], false);
};


