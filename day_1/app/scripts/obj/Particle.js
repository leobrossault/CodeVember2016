import Pixi from 'pixi.js'
import raf from 'raf'

export class Particle {
  constructor (x, y, diffX, diffY, speed, radius, color) {
    this.x = x
    this.y = y
    this.diffX = -diffX / 10 + Math.random()
    this.diffY = -diffY / 10 + Math.random()
    this.alpha = 1
    this.speed = speed - 2
    this.radius = radius
    this.color = '0x' + color + ''

    this.isDestroy = false

    this.graphics = new PIXI.Graphics()
    this.graphics.beginFill(this.color)
    this.graphics.drawCircle(this.x, this.y, this.radius)
    this.graphics.endFill()
  }

  getParticle () {
    return this.graphics
  }

  setPosition () {
    if (this.isDestroy === false) {
      let coefX = this.speed * this.diffX
      let coefY = this.speed * this.diffY

      if (coefX > 3) {
        coefX = 3
      }

      if (coefX < -3) {
        coefX = -3
      }

      if (coefY > 3) {
        coefY = 3
      }

      if (coefY < -3) {
        coefY = -3
      }

      this.alpha -= 0.02
      this.graphics.alpha = this.alpha
      this.graphics.position.x += coefX
      this.graphics.position.y += coefY
      this.x += this.speed
      this.y += this.speed
      this.speed += 0.01
    }

    if (this.x > window.innerWidth + this.radius || this.x < -this.radius || this.y > window.innerHeight + this.radius || this.y < -this.radius || this.alpha <= 0) {
      this.graphics.destroy()
      this.isDestroy = true
    }
  }

  animate () {
    if (this !== undefined && this.isDestroy === false) {
      this.setPosition()
    }
  }
}
