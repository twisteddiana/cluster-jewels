
const TO_RADIANS = Math.PI/180;
function drawOrbit(canvas, x, y, r) {
  return new Promise(resolve => {
    const ctx = canvas.getContext('2d');
    const image = new Image();
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
    const image = new Image();
    image.onload = drawImageActualSize;
    image.src = './assets/socket.png';

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
    const image = new Image();
    image.onload = drawImageActualSize;
    image.src = './assets/small_passive.png';

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
    const image = new Image();
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

function drawSkill(canvas, x, y, skill, textPosition) {
  if (!skill) {
    // draw small passive instead
    return new Promise(resolve => {
      const ctx = canvas.getContext('2d');
      const image = new Image();
      image.onload = drawImageActualSize;
      image.src = './assets/small_passive.png';

      function drawImageActualSize() {
        drawSmallPassive(ctx, this, x, y);
        resolve();
      }
    })
  }

  return new Promise(resolve => {
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    const image = new Image();
    image.onload = drawImageActualSize;
    image.src = './assets/notable.png';

    ctx.arc(x + 30, y + 30, 20, 0, 2 * Math.PI);
    ctx.fillStyle = '#150f0a';
    ctx.fill();

    function drawImageActualSize() {
      ctx.drawImage(this, x, y);

      const fontSize = 20;
      const padding = 20;
      const imageSize = 30;

      const textCtx = canvas.getContext("2d");
      textCtx.font = `${fontSize}px Noto Sans`;
      textCtx.textBaseline = "middle";
      textCtx.fillStyle = '#edc577';


      const width = textCtx.measureText(skill.name).width;
      let textX;
      let textY;

      if (!textPosition) {
        // middle
        textCtx.textAlign = 'center';
        textX = x + imageSize;
        textY = y - padding;
      } else if (textPosition > 0) {
        textCtx.textAlign = 'left';
        textX = x;
        textY = y + 100;
      } else {
        textCtx.textAlign = 'right';
        textX = x + imageSize * 2;
        textY = y + 100;
      }

      textCtx.fillText(skill.name, textX, textY);

      resolve();
    }
  });
}

function drawJewelBackground(canvas) {
  const ctx = canvas.getContext("2d");
  return new Promise(resolve => {
    const image = new Image();
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

  // left
  await drawSkill(canvas, 190, 250, skills[0], -1);
  // back
  await drawSkill(canvas, 300, 60, skills[1], 0);
  // right
  await drawSkill(canvas, 410, 250, skills[2], 1);
};


