let title1 = "Global Average Absolute Sea Level Change, 1993-2015";
let title2 =
  "Global Average Absolute Sea Level Change, 1993-2015 from the US Environmental Protection Agency using data from CSIRO, 2015; NOAA, 2015.This data contains cumulative changes in sea level for the world’s oceans since 1880, based on a combination of long-term tide gauge measurements and recent satellite measurements. It shows average absolute sea level change, which refers to the height of the ocean surface, regardless of whether nearby land is rising or falling. Satellite data are based solely on measured sea level, while the long-term tide gauge data include a small correction factor because the size and shape of the oceans are changing slowly over time. On average, the ocean floor has been gradually sinking since the last Ice Age peak, 20,000 years ago.";
let months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUNE",
  "JULY",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

let padding = 80;
let padding2 = 150;
let sliderX, sliderY, sliderW, sliderH, cirX, cirY, min, max;
let c;

let s2 = function (label) {
  label.setup = function () {
    let canvasW = label.windowWidth - (label.windowWidth * 3) / 5;
    let canvasH = label.windowHeight;
    let myCanvas = label.createCanvas(canvasW, canvasH);
    myCanvas.position(
      (label.windowWidth / 5) * 3,
      (label.windowHeight - canvasH) / 2
    );

    // slider
    label.rectMode(label.CENTER);
    c = label.color("black");
    sliderX = label.width / 2;
    sliderY = label.height - 10;
    sliderW = 100;
    sliderH = 0.5;
    cirX = sliderX;
    cirY = sliderY;
    max = sliderX + sliderW / 2;
    min = sliderX - sliderW / 2;
  };
  label.draw = function () {
    label.background("black");
    label.rectMode(label.CORNER);
    label.title();
    label.graph();
  };
  label.title = function () {
    // title
    label.fill("white");
    label.noStroke();
    label.textSize(20);
    label.textAlign(label.LEFT);
    label.text(title1, 40, 80, label.width - padding);

    // sub-title
    label.textSize(12);
    label.text(title2, 40, 200, label.width - padding);

    // year
    label.textAlign(label.CENTER);
    label.fill("lightblue");
    label.text(year[selectRow * 12], padding2 / 4, label.height - 80);
  };
  label.graph = function () {
    label.rectMode(label.CENTER);
    label.newSlider(
      sliderX,
      sliderY,
      sliderW,
      sliderH,
      label.color("white"),
      cirX,
      cirY,
      15,
      label.color("white"),
      label.color("red")
    );
    let value = label.map(cirX, min, max, 0.1, 5);

    gapx = (label.width - padding2) / 11;
    label.rectMode(label.CORNER);
    for (let i = 0; i < table.getRowCount(); i++) {
      if (label.floor(i / 12) === selectRow) {
        x = padding2 / 2 + gapx * (i % 12);
        y = label.height - 80;
        let rectH = label.map(gsml[i], -3.5, 79.5, 10 * value, 200 * value);

        // datapoints
        label.fill("white");
        label.noStroke();
        label.push();
        label.translate(x + gapx / 2, y);
        label.rotate(label.radians(180));
        label.rect(0, 0, gapx - 10, rectH);
        label.pop();

        // tag
        label.textSize(8);
        label.fill("lightgrey");
        label.textAlign(label.CENTER);
        label.text(gsml[i], x, y - rectH - 10);
      }
    }
    for (i = 0; i < 12; i++) {
      label.textSize(8);
      label.fill("lightgrey");
      label.text(months[i], padding2 / 2 + gapx * i, y + 10);
    }
  };
  label.newSlider = function (
    x,
    y,
    w,
    h,
    rectColor,
    cX,
    cY,
    cirSize,
    cirColor,
    hoverColor
  ) {
    label.fill(rectColor);
    label.noStroke();
    label.rect(x, y, w, h);
    label.fill(c);
    label.circle(cX, cY, cirSize);
    if (label.dist(label.mouseX, label.mouseY, x, y) < w / 2) {
      label.cursor(label.HAND);
    } else {
      label.cursor(label.CROSS);
    }

    if (
      label.dist(label.mouseX, label.mouseY, cirX, cirY) < sliderW &&
      label.mouseIsPressed
    ) {
      cirX = label.mouseX;
      cirY = sliderY;
      c = label.color(hoverColor);

      // set bounding box
      if (label.mouseX > max) {
        label.mouseX = max;
      } else if (label.mouseX < min) {
        label.mouseX = min;
      }
    } else {
      c = label.color(cirColor);
    }
  };
  label.axisLabels = function () {};
};

new p5(s2);
