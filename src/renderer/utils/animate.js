export default class Animate {
  constructor () {
    this.timer = null
  }
    start = (fn) => {
      if (!fn) {
        throw new Error('Need a function!')
      }
      if (this.timer) {
        this.stop()
      }
      this.timer = requestAnimationFrame(fn)
    };
    stop = () => {
      if (!this.timer) {
        return
      }
      cancelAnimationFrame(this.timer)
      this.timer = null
    };
}
