import RafManager from 'helpers/RafManager'
import Clock from 'helpers/Clock'
import Cube from 'entities/Cube'
import PostProcessing from 'postProcessing/PostProcessing'

/**
 * Scene class
 */
class Scene extends THREE.Scene {

  /**
   * constructor method
   * @param {Renderer} renderer renderer instance
   * @param {Camera}   camera   camera instance
   */
  constructor (renderer, camera) {
    super()

    this.renderer = renderer
    this.camera = camera
    this.postProcessing = new PostProcessing(this, this.renderer, this.camera)

    this.clock = new Clock()

    this.createScene()
  }

  /**
   * createScene method
   */
  createScene () {
    this.cube = new Cube()
    this.add(this.cube)

    this.bind()
  }

  /**
   * bind method
   */
  bind () {
    this.render = this.render.bind(this)
    RafManager.add(this.render)
  }

  /**
   * render method
   */
  render () {
    this.cube.rotation.x += 0.01
    this.cube.rotation.y += 0.02

    this.cube.update(this.clock.time)

    this.postProcessing.update()
    this.camera.update(this.clock.delta)
  }
}

export default Scene
