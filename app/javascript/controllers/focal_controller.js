// app/javascript/controllers/focal_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    // Transition fluide pour le changement de background-position
    this.element.style.transition = 'background-position 0.5s ease-out'
    // Au chargement, on centre le point focal
    this.resetBackground();
  }

  mousemove(event) {
    const rect = this.element.getBoundingClientRect();
    const mouseY = event.clientY - rect.top;
    const percY = (mouseY / rect.height) * 100;
    // Variation légère autour de 50% (de 45% à 55%)
    const min = 45;
    const max = 55;
    const computedPercY = min + ((max - min) * (percY / 100));
    this.element.style.backgroundPosition = `center ${computedPercY}%`;
  }

  mouseleave() {
    this.resetBackground();
  }

  resetBackground() {
    // Réinitialise le point focal au centre
    this.element.style.backgroundPosition = 'center center';
  }
}
