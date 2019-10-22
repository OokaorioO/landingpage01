var x = 0, y = 0;
var stepSize = 5.0;
var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ.abcdefghijklmnopqrstuvwxyz.あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん";
var fontSizeMin = 16;
var angleDistortion = 0.0;
var counter = 0;
var hu = 0;
var noiseScale = 800;
var canvas;
var h;

function windowResized() {
    // resizeCanvas(document.documentElement.scrollWidth, document.documentElement.scrollHeight);
    resizeCanvas(document.documentElement.scrollWidth, h);
}

function setup() {
    if (navigator.userAgent.match(/(Android)/i)) {
        h = 3080;
    } else if (navigator.userAgent.match(/(iPhone)/i)) {
        h = 3060;
    } else if (navigator.userAgent.match(/(iPad|iPodPro)/i)) {
        h = 3100;
    } else {
        h = 3850;
    }
    canvas = createCanvas(document.documentElement.scrollWidth, h);
    canvas.position(0, 0);//canvasをページの原点に固定
    canvas.style('z-index', '-1');

    background(255);
    smooth();
    cursor(CROSS);
    colorMode(HSB, 360, 0, 0, 3);
    noStroke();
    strokeWeight(.5);

    textAlign(LEFT);
    fill(0);
    mouseX = 100;
    mouseY = 100;
    x = mouseX;
    y = mouseY;
}

function draw() {
    if (mouseOver) {
        var d = dist(x, y, mouseX, mouseY);
        textFont('futura');
        textSize(fontSizeMin + d / 2)
        var newLetter = letters.charAt(counter);;
        stepSize = textWidth(newLetter);

        if (d > stepSize) {
            var angle = atan2(mouseY - y, mouseX - x);

            push();
            translate(x, y);
            rotate(angle + random(angleDistortion));
            fill(hu, 255, 255, 1);
            text(newLetter, 0, 0);
            hu++;
            if (hu > 255) hu = 0;
            pop();

            counter++;
            if (counter > letters.length - 1) counter = 0;

            x = x + cos(angle) * stepSize;
            y = y + sin(angle) * stepSize;
        }
    }
}

function mouseOver() {
    x = mouseX;
    y = mouseY;
}

function keyPressed() {
    if (keyCode == DELETE || keyCode == BACKSPACE) background(255);
    if (keyCode == UP_ARROW) angleDistortion += 0.1;
    if (keyCode == DOWN_ARROW) angleDistortion -= 0.1;
}