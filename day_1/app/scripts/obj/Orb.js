import {Particle} from './Particle'
import Pixi from 'pixi.js'
import TweenLite from 'gsap'

export class Orb {
  constructor () {
    this.graphics = new PIXI.Graphics()
    this.graphics.beginFill(0xe74c3c)
    this.graphics.drawCircle(0, 0, 20)
    this.graphics.endFill()

    this.particles = []
    this.particlesOb = []
    this.nbParticle = 5
    this.particleCount = 0

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
    this.graphics.position.x = x
    this.graphics.position.y = y
  }

  resetArray () {
    this.particles = []
    this.particlesOb= []
  }

  disform (speed) {
    let disform = speed / 10

    if (disform < -0.2) {
      disform = -0.2
    }

    TweenLite.to(this.graphics.skew, 0.5, {
      x: disform,
      y: 0
    })

    if (speed !== 0) {
      TweenLite.to(this.graphics.scale, 0.5, {
        x: 0.6,
        y: 0.6
      })
    } else {
      TweenLite.to(this.graphics.scale, 0.5, {
        x: 1,
        y: 1
      })
    }
  }
}
