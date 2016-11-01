import {Particle} from './Particle'
import Pixi from 'pixi.js'
import TweenLite from 'gsap'

export class Orb {
  constructor () {
    let posX = window.innerWidth / 2 - 10
    let posY = window.innerHeight / 2 - 10

    this.graphics = new PIXI.Graphics()
    this.graphics.beginFill(0xe74c3c)
    this.graphics.drawCircle(0, 0, 20)
    this.graphics.endFill()
    this.graphics.alpha = 1

    this.graphics.interactive = true
    this.graphics.position.x = posX
    this.graphics.position.y = posY

    this.particles = []
    this.particlesOb = []
    this.nbParticle = 7
    this.particleCount = 0
    this.isInit = false

    this.colors = ['e74c3c', 'e95c4d', 'eb6c5f', 'ed7c71', 'ef8d82']
  }

  createParticle (x, y, diffX, diffY, speed) {
    for (let p = 0; p < this.nbParticle; p++) {
      let radius = Math.random() * (2 - 0.1) + 0.1,
          color = Math.round(Math.random() * this.colors.length),
          particleObj = new Particle(x, y, diffX, diffY, speed, radius, this.colors[color]),
          particle = particleObj.getParticle()

      this.particles.push(particle)
      this.particlesOb.push(particleObj)
    }

    this.particleCount = this.particles.length
  }

  animateParticle () {
    if (this.particlesOb) {
      for (let p = 0; p < this.particlesOb.length; p++) {
        this.particlesOb[p].animate()
      }
    }
  }

  getOrb () {
    return this.graphics
  }

  getParticles () {
    return this.particles
  }

  getParticleCount () {
    return this.particleCount
  }

  getNbParticleStep () {
    return this.nbParticle
  }

  setPosition (x, y) {
    if (this.isInit === false) {
      this.setOpacity()
      this.isInit = true
    }

    this.graphics.position.x = x
    this.graphics.position.y = y
  }

  setOpacity () {
    TweenLite.to(this.graphics, 0.2, {
      alpha: 1
    })
  }

  launchBounce (direction) {
    if (direction === 'up') {
      TweenLite.to(this.graphics.scale, 0.5, {
        x: 1.3,
        y: 1.3,
        ease: Bounce.easeOut
      })
    } else {
      TweenLite.to(this.graphics.scale, 0.5, {
        x: 1,
        y: 1,
        ease: Bounce.easeOut
      })
    }
  }

  resetArray () {
    this.particles = []
    this.particlesOb= []
  }

  disform (speed) {
    let disform = speed / 10

    if (disform < -0.1) {
      disform = -0.1
    }

    TweenLite.to(this.graphics.skew, 0.5, {
      x: disform,
      y: 0
    })

    if (speed !== 0) {
      TweenLite.to(this.graphics.scale, 0.5, {
        x: 0.8,
        y: 0.8
      })
    } else {
      TweenLite.to(this.graphics.scale, 0.5, {
        x: 1.3,
        y: 1.3
      })
    }
  }
}
