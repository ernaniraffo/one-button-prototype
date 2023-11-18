title = "SPACE FLYING";

description = `
BUTTON = FLY
`;

characters = [
  `
llll
llll
 ll
llll
 ll
 ll
  `,
  `
 l  l
  ll
  ll
 l  l
l    l
 l  l
  `
];

options = {
  theme: "dark",
  isPlayingBgm: false
};

let player
const maxJump = 5

let distance

let chargeBar
let chargeBarX
let chargeBarY
const chargeBarDefaultSize = 6
let i = 0

let stars
let planet
const numStars = 100

const animationLength = 40
const negInf =  -(animationLength * animationLength)
let tickWherePressed =  negInf

function update() {
  if (!ticks) {
    // player object
    player = {pos: vec(50, 50), body: null}
    score = 1
    distance = 0
    // chargeBar
    // chargeBarX = player.pos.x 
    // chargeBarY = player.pos.y + 5
    // chargeBar = {pos: vec(chargeBarX, chargeBarY), body: null, count: 0}

    // array of stars
    stars = getStars(numStars)
    planet = {pos: vec(rnd(99), rnd(-20, 120)), z: rnd(0.5, 3), isVisible: false, color: "red"}
  }

  // place stars
  moveStars(score)

  color("purple")
  player.body = char("a", player.pos.x, player.pos.y)
  if (input.isJustPressed && tickWherePressed == negInf) {
    tickWherePressed = ticks
  }

  if (ticks - animationLength <= tickWherePressed) {
    score += 5
    moveStars(score)
    // // chargebar animation
    // chargeBarAnimation()
  } else {
    // player can animate
    tickWherePressed = negInf
    player.pos.y = 50
    // chargeBar.body = box(chargeBar.pos, chargeBarDefaultSize, 1)
  }
  
  if (score > 1) {
    score -= 1
    playerAnimation()
    drawParticle() 
  }

  distance += score
   
  if (((score % 100) == 0) && !planet.isVisible) {
    console.log("spawning")
    spawnPlanet()   
  }
  if (planet.isVisible) { 
    planet.pos.x -= (0.1 / sqrt(planet.z)) * (score / 100)
    color(planet.color)
    rect(planet.pos, 5, 5)
  }
  if (planet.pos.x < 0) {
    planet.pos.x += 100
    planet.isVisible = false
    planet.color = ["red", "blue", "black"][ticks % 3]
  } 
}

function playerAnimation() {
  color("green")
  player.body = char("b", player.pos.x, player.pos.y)
}

function chargeBarAnimation() {
  let boxwidth = ((tickWherePressed - (ticks - animationLength))) % chargeBarDefaultSize
  i += 1
  color("red")
  chargeBar.body = box(chargeBar.pos.x + ((i % 2) ? 1 : -1), chargeBar.pos.y, boxwidth, 1)
}

function getStars(i) {
  return times(i, () => {
    return { pos: vec(rnd(99), rnd(-20, 120)), z: rnd(0.5, 3) };
  });
}

function moveStars(speed) {
  stars.forEach((s) => {
    s.pos.x -= (0.3 / sqrt(s.z)) * speed;
    if (s.pos.x < 0) {
      s.pos.x += 100;
    }
    // @ts-ignore
    color("black");
    rect(s.pos, 1, 1);
  });
}

function drawParticle() {
  color("purple")
  particle(player.pos.x, player.pos.y, score, 10, 135, 0.5)
}

function spawnPlanet() {
  planet.isVisible = true
  planet.pos.x = 100 
  planet.pos.y = rnd(-20, 120)
  planet.z = rnd(0.5, 3)
} 