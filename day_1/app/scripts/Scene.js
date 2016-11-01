import {Orb} from './obj/Orb'
import Pixi from 'pixi.js'
import raf from 'raf'

let _this = null

export class Scene {
  constructor () {
    _this = this

    this.width = window.innerWidth
    this.height = window.innerHeight

    this.x = 0
    this.y = 0
    this.speed = 0
    this.diffX = 0
    this.diffY = 0
    this.hasStopped = false
    this.isSelected = false
    this.canReset = false

    // Create the renderer
    this.renderer = PIXI.autoDetectRenderer(this.width, this.height, {
      antialias: true,
      transparent: true,
      resolution: 1,
      interactive: true
    })

    this.renderer.autoResize = true
    this.stage = new PIXI.Container()

    // Create Orb
    this.orbObj = new Orb()

    this.orb = this.orbObj.getOrb()
    this.particles = this.orbObj.getParticles()

    for (let p = 0; p < this.particles.length; p++) {
      this.stage.addChild(this.particles[p])
    }

    this.orb.on('mousedown', this.setState)
    this.stage.addChild(this.orb)

    // Store point
    this.previousPoint = null
    this.previousTime = null
    this.actualPoint = null
    this.actualTime = null
    this.direction = null
    this.timer = null

    // Interval background
    this.bgInterval = null
    this.bg = document.querySelectorAll('div span')
    this.count = 100

    // Add the canvas to the HTML document
    document.body.appendChild(this.renderer.view)
    this.renderer.render(this.stage)

    // Resize
    this.resize()

    document.onmousemove = this.mousePosition

    window.onresize = function () {
      _this.resize()
    }

    setInterval(function () {
      _this.render()
    }, 1000/60)
  }

  setState () {
    if (_this.isSelected === true) {
      _this.isSelected = false
      _this.orbObj.launchBounce('down')
    } else {
      _this.isSelected = true
      _this.orbObj.launchBounce('up')
    }
  }

  mousePosition (e) {
    if (_this.isSelected === true) {
      if (_this.hasStopped === true) {
        _this.hasStopped = false
      }

      _this.actualTime = Date.now()
      _this.actualPoint = new PIXI.Point(e.clientX, e.clientY)

      if (_this.previousPoint !== null) {
        _this.speed = _this.calcVelocity(e.clientX, e.clientY, _this.actualTime, _this.previousPoint.x, _this.previousPoint.y, _this.previousTime)
      }

      if (_this.speed !== 0) {
        _this.orbObj.createParticle(e.clientX, e.clientY, _this.diffX, _this.diffY, _this.speed)

        let particles = _this.orbObj.getParticles()
        let nbParticleStep = _this.orbObj.getNbParticleStep()

        for (let k = 0; k < nbParticleStep; k++) {
          _this.stage.addChild(particles[particles.length - k - 1])
        }

        _this.stage.addChild(_this.orb)
      }

      _this.orbObj.setPosition(e.clientX, e.clientY)
      _this.orbObj.disform(_this.speed)
      _this.orb = _this.orbObj.getOrb()

      _this.previousPoint = _this.actualPoint
      _this.previousTime = _this.actualTime

      if (_this.timer !== null) {
        clearTimeout(_this.timer)
      }

      _this.timer = setTimeout(_this.mouseStopped, 100)
    }
  }

  mouseStopped () {
    _this.orbObj.disform(0)
    _this.hasStopped = true
    clearInterval(_this.bgInterval)
  }

  calcVelocity (x_1, y_1, t_1, x_2, y_2, t_2) {
    let x_dist = x_2 - x_1,
        y_dist = y_2 - y_1,
        interval = t_2 - t_1;

    this.diffX = x_dist
    this.diffY = y_dist

    let velocity = Math.sqrt(x_dist * x_dist + y_dist * y_dist) / interval

    if (velocity === Infinity) {
      velocity = 0
    }

    return velocity
  }

  render () {
    this.orbObj.animateParticle()
    this.renderer.render(this.stage)
  }

  resize (width, height) {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.renderer.resize(this.width, this.height)
    this.renderer.render(this.stage)
  }
}
