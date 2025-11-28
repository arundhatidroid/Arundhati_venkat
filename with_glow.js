

let table;
let totalRows;

let minTotalGHG = Infinity;
let maxTotalGHG = -Infinity;
let maxFactorValue = 0;

let song;
let isPlaying = false;

let spinAngle = 0;


let gardenOffsetY = 120;


let hoverActive = false;
let hoverLine1 = "";
let hoverLine2 = "";
let hoverX = 0;
let hoverY = 0;


let labelOffsetX = {
  "Beef (beef herd)": 14,
  "Berries & Grapes": -12,
  "Sunflower Oil": -8,
};


let ghgOffset = {
  "Beef (beef herd)": -20,
  "Citrus Fruit": 10,
  "Coffee": 6,
  "Lamb & Mutton": 5,
  "Dark Chocolate": 1,
  "Shrimps (farmed)": 10,
  "Peas": 10,
  "Potatoes": 7,
  "Rice": 10,
  "Root Vegetables": 10,
  "Soymilk": 10,
  "Apples": 10,
  "Bananas": 10,
  "Barley": 10,
  "Berries & Grapes": 10,
  "Cane Sugar": 10,
  "Cheese": 10,
  "Eggs": 10,
  "Fish (farmed)": 10,
  "Maize": 10,
  "Milk": 10,
  "Nuts": 10,
  "Onions & Leeks": 10,
  "Sunflower Oil": 10,
  "Tomatoes": 10,
  "Wheat & Rye": 10,
  "Wine": 10
};


let leafOverrides = {
  "Beef (beef herd)": {
    "Farm":     { dy: -0.7, scale: 0.8, angle: -29 },
    "Feed":     { dy: -5, scale: 0.9, angle: -40 },
    "Packaging":{ scale: 0.8, angle: -10, dy: 10 },
    "Retail":   { dy: -1, side: 1, angle: -35, scale: 0.7 },
    "Transport":{ dy: -1, side: 1, angle: -35, scale: 0.8 },
    "Processing":{ dy: 22, side: 1, angle: -35 },
    "Land Use": { dy: 22, side: -1, angle: -35 }
  },

  "Barley": {
    "Retail":   { scale: 0.9, dy: 15, side: 1, angle: -35 },
    "Farm":     { dy: 4, scale: 0.7 },
    "Feed":     { dy: 15, scale: 0.7 },
    "Processing":{ dy: 18, side: 1, angle: -35, scale: 0.7 },
    "Land Use": { dy: 18, side: -1, angle: -35, scale: 0.4 }
  },

  "Berries & Grapes": {
    "Retail":   { scale: 0.9, dy: 15, side: 1, angle: -35 },
    "Packaging":{ angle: -35, dy: -27 },
    "Land Use": { scale: 0.7 }
  },

  "Cheese": {
    "Farm":     { dy: 6, scale: 0.9, side: -1, angle: -30 },
    "Feed":     { dy: -5, scale: 0.9, side: 1, angle: -35 },
    "Transport":{ dy: 10, side: -1 },
    "Retail":   { dy: 18, side: 1, angle: -30, scale: 0.7 },
    "Processing":{ dy: 28, side: 1, angle: -35, scale: 0.9 },
    "Land Use": { dy: 28, angle: -35 }
  },

  "Citrus Fruit": {
    "Transport":{ dy: 10, side: -1 },
    "Packaging":{ dy: 1, side: -1, scale: 0.6, angle: -25 },
    "Farm":     { dy: 6, side: -1, angle: -35 },
  },

  "Coffee": {
    "Transport":{ dy: 10, side: -1, angle: -35 },
    "Packaging":{ dy: 16, side: -1, angle: -25 },
    "Farm":     { dy: 6, side: -1, angle: -35 },
    "Retail":   { angle: -30, scale: 0.7 },
    "Land Use": { dy: 8, angle: -35 },
    "Processing":{ dy: 28, scale: 0.8, angle: -35 }
  },

  "Dark Chocolate": {
    "Transport":{ dy: 10, side: -1, angle: -35 },
    "Packaging":{ dy: 16, side: -1, angle: -25 },
    "Farm":     { dy: 6, angle: -35 },
    "Retail":   { angle: -30, scale: 0.7 },
    "Land Use": { dy: 20, angle: -35 },
    "Processing":{ dy: 28, scale: 0.8, angle: -35 }
  },

  "Eggs": {
    "Transport":{ dy: 10, side: -1, angle: -35 },
    "Packaging":{ dy: 16, side: -1, angle: -25 },
    "Farm":     { dy: 6, angle: -35 },
    "Retail":   { angle: -30, scale: 0.7 },
    "Land Use": { dy: 13, angle: -35 },
    "Processing":{ dy: 28, scale: 0.8, angle: -35 }
  },

  "Fish (farmed)": {
    "Transport":{ dy: 10, side: -1, angle: -35 },
    "Packaging":{ dy: 16, side: -1, angle: -25 },
    "Farm":     { dy: 1, angle: -35 },
    "Retail":   { angle: -30, side: -1, dy: -10 },
    "Feed":     { dy: 1, side: 1, angle: -35 },
    "Land Use": { dy: 22, angle: -35 },
    "Processing":{ dy: 28, scale: 0.8, angle: -35 }
  },

  "Lamb & Mutton": {
    "Transport":{ dy: 5, side: -1, angle: -35 },
    "Packaging":{ dy: 10, side: -1, angle: -25, scale: 0.9 },
    "Farm":     { dy: 1, angle: -45 },
    "Retail":   { angle: -30, side: -1, dy: 1, scale: 0.9 },
    "Feed":     { dy: 1, side: 1, angle: -35 },
    "Land Use": { dy: 10, angle: -35 },
    "Processing":{ dy: 28, angle: -35 }
  },

  "Milk": {
    "Farm": { dy: 1, angle: -45 }
  },

  "Nuts": {
    "Farm":        { dy: 12, angle: -45 },
    "Retail":      { dy: 1, angle: -45, scale: 0.8 },
    "Transport":   { dy: 1, angle: -45 },
    "Packaging":   { angle: -45, dy: 16 },
    "Processing":  { angle: -45, dy: 16, scale: 0.8 }
  },

  "Onions & Leeks": {
    "Farm":        { angle: -45 },
    "Retail":      { angle: -45, scale: 0.8, side: -1 },
    "Transport":   { angle: -45, dy: 15 },
    "Packaging":   { angle: -45, scale: 0.8 },
    "Processing":  { angle: -45 },
    "Land Use":    { angle: -45, scale: 0 }
  },

  "Palm Oil": {
    "Farm":        { angle: -45, dy: 12 },
    "Retail":      { angle: -45, scale: 0.8 },
    "Transport":   { angle: -45, dy: 15 },
    "Packaging":   { angle: -45 },
    "Processing":  { angle: -45 },
    "Land Use":    { angle: -45 }
  },

  "Peas": {
    "Farm":        { angle: -45 },
    "Retail":      { angle: -45, dy: 22, scale: 0.8 },
    "Transport":   { angle: -45, dy: 15, scale: 0.9 },
    "Packaging":   { angle: -45, scale: 0.8 },
    "Processing":  { angle: -45 },
    "Land Use":    { angle: -45 }
  },

  "Pig Meat": {
    "Farm":        { angle: -45, dy: 12 },
    "Retail":      { angle: -45, dy: 22 },
    "Transport":   { angle: -45, dy: 15 },
    "Packaging":   { angle: -45 },
    "Processing":  { angle: -45, dy: 16 },
    "Land Use":    { angle: -45, dy: 16 }
  },

  "Potatoes": {
    "Farm":        { angle: -34 },
    "Retail":      { angle: -45, dy: 22, scale: 0.8 },
    "Transport":   { angle: -45, dy: 15, scale: 0.9 },
    "Packaging":   { angle: -45, dy: 15, scale: 0.8 },
    "Processing":  { angle: -45, dy: 16 },
    "Land Use":    { angle: -45, dy: 16 }
  },

  "Poultry Meat": {
    "Farm":        { angle: -34 },
    "Retail":      { angle: -45, dy: 22 },
    "Transport":   { angle: -45, dy: 15 },
    "Packaging":   { angle: -45, dy: 15 },
    "Processing":  { angle: -45, dy: 16 },
    "Land Use":    { angle: -45, dy: 16 }
  },

  "Rice": {
    "Farm":        { angle: -34, dy: 12 },
    "Retail":      { angle: -45, dy: 22 },
    "Transport":   { angle: -45, dy: 15 },
    "Packaging":   { angle: -45, dy: 15, scale: 0.9 },
    "Processing":  { angle: -45, dy: 16, scale: 0.8 },
    "Land Use":    { angle: -45, dy: 16 }
  },

  "Root Vegetables": {
    "Farm":        { angle: -34, dy: 1 },
    "Retail":      { angle: -45, dy: 22, scale: 0.8 },
    "Transport":   { angle: -45, dy: 28 },
    "Packaging":   { angle: -45, dy: 15 },
    "Processing":  { angle: -45, dy: 16 },
    "Land Use":    { angle: -45, dy: 16, scale: 0.8 }
  },

  "Shrimps (farmed)": {
    "Farm":        { angle: -34, dy: 1 },
    "Retail":      { angle: -45, dy: 22 },
    "Transport":   { angle: -45, dy: 16 },
    "Packaging":   { angle: -45, dy: 15 },
    "Processing":  { angle: -45, dy: 16 },
    "Land Use":    { angle: -45, dy: 16 }
  },

  "Soymilk": {
    "Farm":        { angle: -34, dy: 1, scale: 0.8 },
    "Retail":      { angle: -45, dy: 22 },
    "Transport":   { angle: -45, dy: 16 },
    "Packaging":   { angle: -45, dy: 15, scale: 0.9 },
    "Processing":  { angle: -45, dy: 16 },
    "Land Use":    { angle: -45, dy: 7, side: 1 }
  },

  "Sunflower Oil": {
    "Farm":        { angle: -34, dy: 12 },
    "Retail":      { angle: -45, dy: 22, scale: 0.8 },
    "Transport":   { angle: -45, dy: 16 },
    "Packaging":   { angle: -45, dy: 15 },
    "Processing":  { angle: -45, dy: 16 },
    "Land Use":    { angle: -45, dy: 12 }
  },

  "Tomatoes": {
    "Farm":        { angle: -34, dy: 1 },
    "Retail":      { angle: -45, dy: 22, scale: 0.8 },
    "Transport":   { angle: -45, dy: 16 },
    "Packaging":   { angle: -45, dy: 15 },
    "Processing":  { angle: -45, dy: 16, scale: 0.8 },
    "Land Use":    { angle: -45, dy: 12 }
  },

  "Wheat & Rye": {
    "Farm":        { angle: -34, dy: 1 },
    "Retail":      { angle: -45, dy: 22, scale: 0.9 },
    "Transport":   { angle: -45, dy: 16 },
    "Packaging":   { angle: -45, dy: 15, scale: 0.8 },
    "Processing":  { angle: -45, dy: 16 },
    "Land Use":    { angle: -45, dy: 12 }
  },

  "Wine": {
    "Farm":        { angle: -34, dy: 10 },
    "Retail":      { angle: -45, dy: 22, scale: 0.8 },
    "Transport":   { angle: -45, dy: 16, scale: 0.9 },
    "Packaging":   { angle: -45, dy: 15 },
    "Processing":  { angle: -45, dy: 16 },
    "Land Use":    { angle: -45, dy: 12 }
  }
};

function preload() {
  table = loadTable("data/Book1.csv", "csv", "header");
  song = loadSound("data/BillyJoel.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont("Arial");
  angleMode(DEGREES);

  totalRows = table.getRowCount();


  for (let i = 0; i < totalRows; i++) {
    let totalGHG = table.getNum(i, "Total Global Average GHG Emissions per kg");

    if (totalGHG < minTotalGHG) minTotalGHG = totalGHG;
    if (totalGHG > maxTotalGHG) maxTotalGHG = totalGHG;

    let landUse    = table.getNum(i, "Land Use Change");
    let feed       = table.getNum(i, "Feed");
    let farm       = table.getNum(i, "Farm");
    let processing = table.getNum(i, "Processing");
    let transport  = table.getNum(i, "Transport");
    let packaging  = table.getNum(i, "Packaging");
    let retail     = table.getNum(i, "Retail");

    maxFactorValue = max(
      maxFactorValue,
      landUse, feed, farm,
      processing, transport, packaging, retail
    );
  }
}

function draw() {
  background(241, 243, 236);
  hoverActive = false; // reset hover each frame

  spinAngle = spinAngle + 4;


  drawTitleBlock();

 
  drawKeyBlock();

 
  drawMusicUI();

 
  stroke(120);
  strokeWeight(3);
  let baseY = height * 0.78 + gardenOffsetY;
  line(0, baseY, width, baseY);


  let leftMargin = 70;
  let rightMargin = 70;
  let colWidth;
  if (totalRows > 1) {
    colWidth = (width - leftMargin - rightMargin) / (totalRows - 1);
  } else {
    colWidth = width - leftMargin - rightMargin;
  }

  for (let i = 0; i < totalRows; i++) {
    let food  = table.getString(i, "Food product");
    let total = table.getNum(i, "Total Global Average GHG Emissions per kg");
    let colorName = table.getString(i, "Colours");

    let xPos = (totalRows === 1)
      ? width / 2
      : leftMargin + colWidth * i;

   
    let tMin = sqrt(minTotalGHG);
    let tMax = sqrt(maxTotalGHG);
    let tVal = sqrt(total);

    let tallest = height * 0.55;
    let shortest = height * 0.32; 
    let stemHeight = map(tVal, tMin, tMax, tallest, shortest);

 
    stroke(90, 70, 40);
    strokeWeight(5);
    line(xPos, baseY, xPos, baseY - stemHeight);

    
    let landUse    = table.getNum(i, "Land Use Change");
    let feed       = table.getNum(i, "Feed");
    let farm       = table.getNum(i, "Farm");
    let processing = table.getNum(i, "Processing");
    let transport  = table.getNum(i, "Transport");
    let packaging  = table.getNum(i, "Packaging");
    let retail     = table.getNum(i, "Retail");

    
    let f1 = 0.05;
    let f2 = 0.22;
    let f3 = 0.33;
    let f4 = 0.48;
    let f5 = 0.63;
    let f6 = 0.78;
    let f7 = 0.87;

   
    drawLeafOrBranch(xPos, baseY - stemHeight * f1, farm,       -1, "Farm",       food, 0);
    drawLeafOrBranch(xPos, baseY - stemHeight * f2, retail,      1, "Retail",     food, 1);
    drawLeafOrBranch(xPos, baseY - stemHeight * f3, feed,       -1, "Feed",       food, 2);
    drawLeafOrBranch(xPos, baseY - stemHeight * f4, transport,   1, "Transport",  food, 3);
    drawLeafOrBranch(xPos, baseY - stemHeight * f5, packaging,  -1, "Packaging",  food, 4);
    drawLeafOrBranch(xPos, baseY - stemHeight * f6, processing,  1, "Processing", food, 5);
    drawLeafOrBranch(xPos, baseY - stemHeight * f7, landUse,    -1, "Land Use",   food, 6);

    // flower at top
    let flowerTopY = baseY - stemHeight;
    drawFlowerHead(xPos, flowerTopY, total, colorName, food);

    // GHG label above the flower
    drawGHGLabel(total, xPos, flowerTopY - 50, food);

    // food name at the bottom
    drawLabel(food, xPos, baseY + 25, i);
  }

 
  if (hoverActive) {
    drawHoverBox();
  }
}

/* -------- title + description block (top left) -------- */

function drawTitleBlock() {
  noStroke();
  fill(20);
  textAlign(LEFT, TOP);

  // title
  textFont("Arial");
  textStyle(BOLD);
  fill(20);
  textSize(26);
  text("Ingredients of the Anthropocene", 60, 50);

 // subheading + description
textStyle(NORMAL);
textSize(16);

let sub1 = "How do your everyday food choices shape the planet?";
let sub2 = "In this visualization, each food item grows as a flower. Hover over the leaves "
         + "to explore the different stages of the supply chain, from land use to packaging, "
         + "and discover where the most impact occurs.";


let sub3 = "Taller flowers = lower emissions. Bigger flower heads = higher emissions.";

text(sub1, 60, 90, width * 0.45, 110);
text(sub2, 60, 120, width * 0.34, 100);

textStyle(BOLD);   
text(sub3, 60, 190, width * 0.34, 100);

textStyle(NORMAL);  

}



function drawKeyBlock() {
  let keyW = 260;
  let keyH = 210;
  let keyX = width - keyW - 60;
  let keyY = 40;


  noStroke();
  fill(255, 255, 245, 222);
  rect(keyX, keyY, keyW, keyH, 15);


  fill(30);
  textAlign(LEFT, TOP);
  textFont("Times New Roman");
  textStyle(BOLD);
  textSize(16);
  text("Food supply chain key", keyX + 18, keyY + 12);

 
  textFont("Arial");
  textStyle(NORMAL);


  let greens = [
    [175, 225, 175],
    [147, 197, 114],
    [34, 139, 34],
    [46, 139, 87],
    [79, 121, 66],
    [0, 128, 0],
    [68, 75, 27]
  ];

  let labels = [
    "Farm",
    "Retail",
    "Feed",
    "Transport",
    "Packaging",
    "Processing",
    "Land Use"
  ];

  let leafStartY = keyY + 48;
  let leafGap = 20;

  for (let i = 0; i < 7; i++) {
    let ly = leafStartY + i * leafGap;
    let lx = keyX + 26;

    stroke(0);
    strokeWeight(1.6);
    fill(greens[i][0], greens[i][1], greens[i][2]);
    ellipse(lx, ly, 26, 14);
    line(lx - 10, ly, lx + 10, ly); // midrib

    noStroke();
    fill(30);
    textAlign(LEFT, CENTER);
    textSize(13);
    text(": " + labels[i], lx + 22, ly);
  }
  
 
let branchY = keyY + keyH - 20;
let branchX = keyX + 25;

stroke(90, 70, 40);
strokeWeight(4);
line(branchX - 12, branchY, branchX + 12, branchY - 6);  // angled branch

noStroke();
fill(30);
textAlign(LEFT, CENTER);
textSize(13);
text(": Lack of emissions", branchX + 22, branchY - 2);

}

function drawMusicUI() {
  let keyW = 290;
  let keyX = width - keyW - 60;
  let keyY = 13;

  let btnW = 120;
  let btnH = 28;


  let btnX = keyX - btnW - 20;
  let titleY = keyY + 60;     
  let btnY   = keyY + 70;   

 
  noStroke();
  fill(30);
  textAlign(LEFT, TOP);
  textSize(13);

  let title = "Song: Billy Joel: We didnt start the fire";

  let titleW = btnW + 40;
  text(title, btnX, titleY - 26, titleW);

  
  stroke(0);
  strokeWeight(1.4);
  fill(255);
  rect(btnX, btnY, btnW, btnH, 7);

  // play/pause label
  noStroke();
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(14);
  text(isPlaying ? "Pause" : "Play", btnX + btnW / 2, btnY + btnH / 2);

 
  musicButton = { x: btnX, y: btnY, w: btnW, h: btnH };

  
  let tip = "Food choices and supply-chain decisions are part of that inherited 'fire': land use, farming and processing shape the climate we pass on";

  // bounding boxes for title and button 
  let titleBox = { x: btnX, y: titleY - 26, w: titleW, h: 20 }; 
  let buttonBox = { x: btnX, y: btnY, w: btnW, h: btnH };

 
  let overTitle = (mouseX >= titleBox.x && mouseX <= titleBox.x + titleBox.w &&
                   mouseY >= titleBox.y && mouseY <= titleBox.y + titleBox.h);
  let overButton = (mouseX >= buttonBox.x && mouseX <= buttonBox.x + buttonBox.w &&
                    mouseY >= buttonBox.y && mouseY <= buttonBox.y + buttonBox.h);

  if (overTitle || overButton) {
  
    textSize(12);
    textAlign(LEFT, TOP);
    let pad = 8;
    let maxW = 260; 
    let words = tip.split(" ");
    let lines = [];
    let cur = "";
    for (let i = 0; i < words.length; i++) {
      let trial = (cur.length === 0) ? words[i] : (cur + " " + words[i]);
      if (textWidth(trial) <= maxW - pad * 2) {
        cur = trial;
      } else {
        if (cur.length > 0) lines.push(cur);
        cur = words[i];
      }
    }
    if (cur.length > 0) lines.push(cur);

   
    let lineH = textAscent() + textDescent() + 4;
    let boxW = min(maxW, max( (lines.reduce((m, l) => max(m, textWidth(l)), 0) + pad * 2), 80 ));
    let boxH = lines.length * lineH + pad;

   
    let boxX = mouseX + 14;
    let boxY = mouseY + 14;
    if (boxX + boxW > width - 6) boxX = mouseX - boxW - 14;
    if (boxY + boxH > height - 6) boxY = mouseY - boxH - 14;
    if (boxX < 6) boxX = 6;
    if (boxY < 6) boxY = 6;

   
    fill(255, 255, 240, 240);
    stroke(60);
    strokeWeight(0.9);
    rect(boxX, boxY, boxW, boxH, 6);

    noStroke();
    fill(20);
    textAlign(LEFT, TOP);
    let y = boxY + pad * 0.5;
    for (let i = 0; i < lines.length; i++) {
      text(lines[i], boxX + pad/1.5, y);
      y += lineH;
    }
  }
}




function drawLeafOrBranch(x, y, value, side, factorName, foodName, colorID) {
  if (value <= 0) {
    drawBranch(x, y, side, factorName, foodName, value);
  } else {
    drawLeaf(x, y, value, side, factorName, foodName, colorID);
  }
}


function drawBranch(x, y, side, factorName, foodName, value) {
  let branchLen = 25;


  let bx = x + side * branchLen;
  let by = y - 10; 

  stroke(90, 70, 40);
  strokeWeight(4);
  line(x, y, bx, by);

  let cx = (x + bx) / 2;
  let cy = (y + by) / 2;

  if (dist(mouseX, mouseY, cx, cy) < branchLen * 0.6) {
    noFill();
    stroke(255, 220, 0);
    strokeWeight(3);
    circle(cx, cy, branchLen * 1.4);

    hoverActive = true;
    hoverLine1 = factorName;
    hoverLine2 = nf(value, 1, 2);
    hoverX = cx;
    hoverY = cy - branchLen * 0.9;
  }
}


function drawLeaf(x, y, value, side, factorName, foodName, colorID) {
  let leafSize = map(value, 0, maxFactorValue, 35, 130);

  if (leafOverrides[foodName] && leafOverrides[foodName][factorName]) {
    let o = leafOverrides[foodName][factorName];
    if (o.dy !== undefined) y += o.dy;
    if (o.scale !== undefined) leafSize *= o.scale;
    if (o.side !== undefined) side = o.side;
  }

  let r, g, b;
  if (colorID === 0)      { r = 175; g = 225; b = 175; }
  else if (colorID === 1) { r = 147; g = 197; b = 114; }
  else if (colorID === 2) { r = 34;  g = 139; b = 34;  }
  else if (colorID === 3) { r = 46;  g = 139; b = 87;  }
  else if (colorID === 4) { r = 79;  g = 121; b = 66;  }
  else if (colorID === 5) { r = 0;   g = 128; b = 0;   }
  else                    { r = 68;  g = 75;  b = 27;  }

 
  let tiltAngle = 25 * side;
  let cxLocal = leafSize * 0.7;

  if (leafOverrides[foodName] && leafOverrides[foodName][factorName]) {
    let o = leafOverrides[foodName][factorName];
    if (o.angle !== undefined) {
      tiltAngle = o.angle * side;
    }
  }

  cxLocal = side * leafSize * 0.7;

  push();
  translate(x, y);
  rotate(tiltAngle);

  stroke(90, 70, 40);
  strokeWeight(3);
  line(0, 0, cxLocal, 0);

  stroke(0);
  strokeWeight(2);
  fill(r, g, b);
  ellipse(cxLocal, 0, leafSize, leafSize / 2);
  line(cxLocal - leafSize * 0.35, 0, cxLocal + leafSize * 0.35, 0);

  pop();

  let hx = x + cos(tiltAngle) * cxLocal;
  let hy = y + sin(tiltAngle) * cxLocal;

  if (dist(mouseX, mouseY, hx, hy) < leafSize * 0.5) {
    noFill();
    stroke(139, 0, 0);
    strokeWeight(3);
    circle(hx, hy, leafSize * 0.9);

    hoverActive = true;
    hoverLine1 = factorName;
    hoverLine2 = nf(value, 1, 2);
    hoverX = hx;
    hoverY = hy - leafSize * 0.7;
  }
}



function drawFlowerHead(x, y, totalGHG, colorName, foodName) {
  let tMin = sqrt(minTotalGHG);
  let tMax = sqrt(maxTotalGHG);
  let tVal = sqrt(totalGHG);

  let baseR = map(tVal, tMin, tMax, 28, 55);

  push();
  translate(x, y);
  rotate(spinAngle);

  noStroke();
  fill(231, 199, 31, 230);
  circle(0, 0, baseR * 1.5);

  stroke(colorName || "#ffb347");
  strokeWeight(2.5);
  noFill();

  beginShape(POINTS);
  for (let a = 0; a < 360; a++) {
    let r = abs(baseR * sin(a * 6));
    let px = r * cos(a);
    let py = r * sin(a);
    vertex(px, py);
  }
  endShape();

  stroke(0);
  strokeWeight(2);
  fill("#b0104e");
  circle(0, 0, baseR * 0.75);

  pop();

  if (dist(mouseX, mouseY, x, y) < baseR) {
    noFill();
    stroke(139, 0, 0);
    strokeWeight(3);
    circle(x, y, baseR * 1.6);

    hoverActive = true;
    hoverLine1 = foodName;
    hoverLine2 = "";
    hoverX = x;
    hoverY = y - baseR * 1.2;
  }
}

function drawGHGLabel(total, x, y, foodName) {
  let customOffset = ghgOffset[foodName] || 0;

  noStroke();
  fill(40);
  textAlign(CENTER, BOTTOM);
  textSize(18);
  text(nf(total, 1, 2), x, y + customOffset);
}



function drawLabel(textStr, x, y, idx) {
  textAlign(CENTER, TOP);
  textSize(11);
  noStroke();
  fill(20);

  let offsetX = labelOffsetX[textStr] || 0;
  let lines = splitIntoLines(textStr, 1);
  let lineHeight = 15;

  for (let i = 0; i < lines.length; i++) {
    text(lines[i], x + offsetX, y + i * lineHeight);
  }
}

function splitIntoLines(str, maxLen) {
  let words = str.split(" ");
  let lines = [];
  let current = "";

  for (let i = 0; i < words.length; i++) {
    let w = words[i];
    if (current.length === 0) {
      current = w;
    } else if (current.length + 1 + w.length <= maxLen) {
      current = current + " " + w;
    } else {
      lines.push(current);
      current = w;
    }
  }
  if (current.length > 0) lines.push(current);
  if (lines.length > 3) lines = lines.slice(0, 3);
  return lines;
}



function drawHoverBox() {
  textSize(13);
  let w1 = textWidth(hoverLine1);
  let w2 = hoverLine2 ? textWidth(hoverLine2) : 0;
  let w = max(w1, w2) + 12;
  let h = hoverLine2 ? 30 : 20;

  let boxX = hoverX - w / 2;
  let boxY = hoverY - h - 6;

  if (boxX < 5) boxX = 5;
  if (boxX + w > width - 5) boxX = width - w - 5;
  if (boxY < 5) boxY = 5;

  fill(255);
  stroke(0);
  strokeWeight(1);
  rect(boxX, boxY, w, h, 5);

  noStroke();
  fill(0);
  textAlign(CENTER, TOP);
  text(hoverLine1, boxX + w / 2, boxY + 3);
  if (hoverLine2) {
    text(hoverLine2, boxX + w / 2, boxY + 15);
  }
}

function mousePressed() {
  // handle music button click
  if (typeof musicButton !== "undefined") {
    let btn = musicButton;
    if (mouseX > btn.x && mouseX < btn.x + btn.w && mouseY > btn.y && mouseY < btn.y + btn.h) {
      if (isPlaying) {
        song.pause();
        isPlaying = false;
      } else {
      
        song.loop();
        isPlaying = true;
      }
    }
  }
}
