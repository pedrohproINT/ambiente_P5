// sketch.js
let radius = 600;      // distância da câmera ao centro
let catCanvas;

function setup() {
  createCanvas(400, 400, WEBGL);
  noStroke();

  // Cria um buffer 2D para desenhar o gato
  catCanvas = createGraphics(100, 100);
  catCanvas.noStroke();
  // fundo da moldura
  catCanvas.background(255, 230, 200);
  // orelhas
  catCanvas.fill(200, 150, 100);
  catCanvas.triangle(20, 30, 35, 10, 50, 30);
  catCanvas.triangle(80, 30, 65, 10, 50, 30);
  // cabeça
  catCanvas.ellipse(50, 50, 80, 80);
  // olhos
  catCanvas.fill(255);
  catCanvas.ellipse(40, 50, 12, 12);
  catCanvas.ellipse(60, 50, 12, 12);
  catCanvas.fill(0);
  catCanvas.ellipse(40, 50, 12, 3);
  catCanvas.ellipse(60, 50, 12, 3);
  // focinho
  catCanvas.fill(255, 180, 180);
  catCanvas.triangle(50, 60, 45, 70, 55, 70);
  // boca
  catCanvas.stroke(0);
  catCanvas.line(50, 70, 50, 80);
  catCanvas.line(50, 80, 45, 85);
  catCanvas.line(50, 80, 55, 85);
  catCanvas.noStroke();
}

function draw() {
  background(200, 220, 255);

  // —– CÂMERA —–
  let angle = map(mouseX, 0, width, 0, TWO_PI);
  let camX = cos(angle) * radius;
  let camZ = sin(angle) * radius;
  camera(camX, -100, camZ, 0, 0, 0, 0, 1, 0);

  // —– LUZES —–
  directionalLight(255, 255, 255, -0.5, -1, -0.5);
  pointLight(255, 255, 200, 0, -200, 0);

  // —– PISO —–
  push();
    translate(0, 200, 0);
    rotateX(HALF_PI);
    specularMaterial(180, 140, 80);
    shininess(20);
    plane(400, 400);
  pop();

  // —– TAPETE VERMELHO —–
  push();
    translate(0, 199.5, 75);
    fill(255, 0, 0);
    shininess(10);
    box(250, 1, 170);
  pop();

  // —– TETO —–
  push();
    translate(0, -200, 0);
    rotateX(-HALF_PI);
    specularMaterial(245, 245, 220);
    shininess(5);
    plane(400, 400);
  pop();

  // —– PAREDES —–
  const wallSize = 400;
  const winW = 200, winH = 150;
  const half = wallSize / 2;
  const hRem = (wallSize - winH) / 2;
  const wRem = (wallSize - winW) / 2;

  // parede de trás (janela)
  push();
    translate(0, -half + hRem / 2, -half);
    specularMaterial(245, 245, 220);
    shininess(5);
    plane(wallSize, hRem);
  pop();
  push();
    translate(0,  half - hRem / 2, -half);
    specularMaterial(245, 245, 220);
    shininess(5);
    plane(wallSize, hRem);
  pop();
  push();
    translate(-half + wRem / 2, 0, -half);
    specularMaterial(245, 245, 220);
    shininess(5);
    plane(wRem, winH);
  pop();
  push();
    translate( half - wRem / 2, 0, -half);
    specularMaterial(245, 245, 220);
    shininess(5);
    plane(wRem, winH);
  pop();

  // parede esquerda
  push();
    translate(-half, 0, 0);
    rotateY(HALF_PI);
    specularMaterial(245, 245, 220);
    shininess(5);
    plane(wallSize, wallSize);
  pop();

  // —– PORTA —–
  push();
    translate(-half + 1, 100, 100);
    rotateY(HALF_PI);
    specularMaterial(139, 69, 19);
    shininess(10);
    box(80, 200, 10);
  pop();

  // —– QUADRO DO GATO (mais longe da porta) —–
  push();
    translate(-190, 40, -50);  // x deslocado +60 em relação à porta
    rotateY(HALF_PI);
    noStroke();
    fill(80, 50, 20);
    box(150, 150, 4);    // moldura
    translate(0, 0, 3); 
    texture(catCanvas); 
    plane(140, 140);     // pintura do gato
  pop();

  // —– MESA —–
  push();
    translate(0, 110, 50);
    specularMaterial(139, 69, 19);
    shininess(20);
    box(200, 10, 100);
    push(); translate(-90, 50,  40); box(10, 100, 10); pop();
    push(); translate( 90, 50,  40); box(10, 100, 10); pop();
    push(); translate(-90, 50, -40); box(10, 100, 10); pop();
    push(); translate( 90, 50, -40); box(10, 100, 10); pop();
  pop();

  // —– CADEIRA —–
  push();
    translate(0, 140, 100);
    rotateY(PI);
    specularMaterial(139, 69, 19);
    shininess(20);
    box(50, 10, 50);
    push(); translate(0, -25, -20); box(50, 50, 10); pop();
    push(); translate(-20, 25, 20); box(10, 50, 10); pop();
    push(); translate( 20, 25, 20); box(10, 50, 10); pop();
    push(); translate(-20, 25,-20); box(10, 50, 10); pop();
    push(); translate( 20, 25,-20); box(10, 50, 10); pop();
  pop();

  // —– LÂMPADA —–
  push();
    translate(0, -200, 0);
    specularMaterial(255, 255, 200);
    shininess(50);
    sphere(20);
  pop();

  // —– PLANTA 1 —–
  push();
    translate(150, 180, -170);
    specularMaterial(120, 100, 60);
    shininess(15);
    cylinder(10, 40);
    translate(0, -20, 0);
    specularMaterial(34, 139, 34);
    shininess(5);
    for (let i = 0; i < 5; i++) {
      push();
        translate(0, -i * 10, 0);
        sphere(20 - i * 2);
      pop();
    }
  pop();

  // —– PLANTA 2 —–
  push();
    translate(-150, 180, -170);
    specularMaterial(120, 100, 60);
    shininess(15);
    cylinder(10, 40);
    translate(0, -20, 0);
    specularMaterial(34, 139, 34);
    shininess(5);
    for (let i = 0; i < 5; i++) {
      push();
        translate(0, -i * 10, 0);
        sphere(20 - i * 2);
      pop();
    }
  pop();
}

function mouseWheel(event) {
  radius += event.delta;
  radius = constrain(radius, 200, 2000);
}
