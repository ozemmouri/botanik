// app/javascript/controllers/parallax_image_controller.js
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    // Lie la méthode handleScroll pour que le "this" soit correctement référencé.
    this.handleScroll = this.handleScroll.bind(this);
    window.addEventListener("scroll", this.handleScroll);
    // Exécuter immédiatement pour définir la première position
    this.handleScroll();
  }

  disconnect() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll() {
    // Coefficient pour ajuster la vitesse de l'effet parallax
    const speed = 0.3;
    const rect = this.element.getBoundingClientRect();
    // Calcul simple : plus l'image est loin du haut du viewport, plus on applique un décalage.
    const offset = rect.top * speed;
    // Appliquer la transformation
    this.element.style.transform = `translateY(${offset}px)`;
  }
}
