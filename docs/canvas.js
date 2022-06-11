
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

function drawSmallPassive(canvas, { x, y }) {
  return new Promise(resolve => {
    const ctx = canvas.getContext('2d');
    const r = 15;
    const image = new Image();
    image.onload = drawImageActualSize;
    image.src = './assets/small_passive.png';

    function drawImageActualSize() {
      ctx.beginPath();
      ctx.arc(x + r * 2, y +  r * 2, r, 0, 2 * Math.PI);
      ctx.fillStyle = '#150f0a';
      ctx.fill();
      ctx.closePath();

      ctx.drawImage(this, x, y);
      resolve();
    }
  });
}

const smallPassivesPositions = [
  { x: 300, y: 315 },
  { x: 235, y: 80 },
  { x: 365, y: 80 },
  { x: 427, y: 190 },
  { x: 172, y: 190 },
  { x: 358, y: 300 },
  { x: 241, y: 300 },
];

async function drawSmallPassives(canvas, nbrPassives) {
  await drawSmallPassive(canvas, smallPassivesPositions[0]);
  await drawSmallPassive(canvas, smallPassivesPositions[1]);
  await drawSmallPassive(canvas, smallPassivesPositions[2]);

  if (nbrPassives > 8) {
    await drawSmallPassive(canvas, smallPassivesPositions[3]);
  }
  if (nbrPassives > 9) {
    await drawSmallPassive(canvas, smallPassivesPositions[4]);
  }

  if (nbrPassives > 10) {
    await drawSmallPassive(canvas, smallPassivesPositions[5]);
  }

  if (nbrPassives > 11) {
    await drawSmallPassive(canvas, smallPassivesPositions[6]);
  }
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

function displaySkillText(canvas, skill, x, y, textPosition) {
  const fontSize = 20;
  const padding = 20;
  const imageSize = 30;

  const textCtx = canvas.getContext("2d");
  textCtx.font = `${fontSize}px Noto Sans`;
  textCtx.textBaseline = "middle";
  textCtx.fillStyle = '#edc577';

  let textX;
  let textY;

  if (!textPosition) {
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
}

function drawSkill(canvas, x, y, skill, textPosition) {
  if (!skill) {
    // draw small passive instead
    return drawSmallPassive(canvas, { x, y });
  }

  return new Promise(resolve => {
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    const image = new Image();
    image.onload = drawImage;
    image.src = './assets/notable.png';

    ctx.arc(x + 30, y + 30, 20, 0, 2 * Math.PI);
    ctx.fillStyle = '#150f0a';
    ctx.fill();

    function drawImage() {
      ctx.drawImage(this, x, y);
      displaySkillText(canvas, skill, x, y, textPosition);
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


