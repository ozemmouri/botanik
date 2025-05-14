import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["image"]
  connect() {
    this.interval = null
    this.direction = 1
    this.element.addEventListener('mouseenter', this.startAnimation.bind(this))
    this.element.addEventListener('mouseleave', this.stopAnimation.bind(this))
  }

  disconnect() {
    this.stopAnimation()
  }

  startAnimation() {
    const distance = 20
    this.imageTarget.style.transition = "transform 3s ease-in-out"

    this.interval = setInterval(() => {
      this.imageTarget.style.transform = `translateY(${this.direction * distance}px)`
      this.direction *= -1
    }, 3000)

    // Initial animation trigger
    this.imageTarget.style.transform = `translateY(${this.direction * 20}px)`
  }

  stopAnimation() {
    clearInterval(this.interval)
    this.imageTarget.style.transform = 'translateY(0)'
  }
}
