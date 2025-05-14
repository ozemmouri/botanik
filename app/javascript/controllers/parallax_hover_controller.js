// app/javascript/controllers/parallax_hover_controller.js
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["image"]

  connect() {
    this.mouseEnterHandler = this.zoomOut.bind(this);
    this.mouseLeaveHandler = this.resetZoom.bind(this);
    this.imageTarget.style.transition = "transform 2s ease-in-out";
    // État initial agrandi
    this.imageTarget.style.transform = "scale(1.1)";
    this.element.addEventListener('mouseenter', this.mouseEnterHandler);
    this.element.addEventListener('mouseleave', this.mouseLeaveHandler);
  }

  disconnect() {
    this.element.removeEventListener('mouseenter', this.mouseEnterHandler);
    this.element.removeEventListener('mouseleave', this.mouseLeaveHandler);
  }

  zoomOut() {
    // Au survol, ramener à la taille originale (scale 1.0)
    this.imageTarget.style.transition = "transform 2s ease-in-out";
    this.imageTarget.style.transform = "scale(1.0)";
  }

  resetZoom() {
    // À la sortie, revenir à l'état agrandi (scale 1.1)
    this.imageTarget.style.transition = "transform 2s ease-in-out";
    this.imageTarget.style.transform = "scale(1.1)";
  }
}
