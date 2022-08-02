let camera
let r, g, b

let phtobtn, streambtn

let pixelW = 1
let pixelH = 1

let aboutToSave, streaming = false
let characterSet = 0
let characters

function preload() {
  phtobtn = loadImage("img/photo.png")
  streambtn = loadImage("img/stream.png")
}

function setup() {
  createCanvas(500, 500);
  camera = createCapture(VIDEO);
  camera.size(50, 50)
  pixelW = width / camera.width
  pixelH = height / camera.height
  textStyle(BOLD);
}
  
function draw() {
  camera.loadPixels()
  background(0)
  textSize(14)
  
  switch (characterSet) {
    case 0:
      characters = `    ゙゚ゝゞへしっくぃぅうぐこいつょとぇづにゎすえごちぉけでさらどずひれぷぞかたぁゟばげほびぱきがぢせはゐぎゆおあぬぜゑぼぽ`
      break
    
    case 1:
      characters = `   ^",:;Il!i~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$`
      break
    
    case 2:
      characters = `   ᛫ᛌᚲ᛬ᛍᛁᛊᚿᚽᚳᚪᚮᚩᚰᚨᛏᚠᚬᚧᛪᚫᚷᚱᚢᛒᚤᛄᚣᚻᛖᛰᚸᚥᛞᛤᛥ`
      break
  }

  for (let i = 0; i < camera.width; i++) {
    for (let j = 0; j < camera.height; j++) {
      index = 4 * (i + j * camera.width)

      r = camera.pixels[index]
      g = camera.pixels[index+1]
      b = camera.pixels[index+2]
      noStroke()
      let char = characters[Math.floor(characters.length*((r + g + b)/3)/255)]
      fill(color(r, g, b))
      text(char, i*pixelW, j*pixelW, i*pixelW+pixelW, j*pixelW+pixelW)
    }

  }
  if (!streaming) {
    if (!aboutToSave) {
      fill(255)
      rect(0, 0, 120, 40)
      image(phtobtn, 0, 0, 40, 40)
      image(streambtn, 40, 0, 40, 40)
      fill(0)
      textSize(32)
      textAlign(BOTTOM, CENTER);

      switch (characterSet) {
        case 0:
          text('@', 80, 0, 120, 40)
          break
        
        case 1:
          text('ᚧ', 80, 0, 120, 40)
          break
        
        case 2:
          text('ぼ', 80, 0, 120, 40);
          break
      }

    } else {
      aboutToSave = false
      saveCanvas(`characam ${Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)}`, 'png');
    }
  }
}

function mouseClicked() {
  if (streaming) {
    streaming = false
  }else if (mouseX < 40 && mouseY < 40) {
    aboutToSave = true
  } else if (mouseX <80 && mouseX > 40 && mouseY < 40) {
    streaming = true
  } else if (mouseX <120 && mouseX > 80 && mouseY < 40) {
    if (characterSet === 2) {
      characterSet = 0
    } else {
      characterSet += 1
    }
  }
}