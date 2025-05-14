import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["image"]

  connect() {
    this.onScroll = this.parallax.bind(this)
    window.addEventListener("scroll", this.onScroll)
  }

  disconnect() {
    window.removeEventListener("scroll", this.onScroll)
  }

  parallax() {
    this.imageTargets.forEach((image) => {
      const speed = parseFloat(image.dataset.speed) || 0.3; 
      const offset = window.scrollY;
      const posY = offset * speed;
      image.style.transform = `translateY(${posY}px)`;
    })
  }
}
