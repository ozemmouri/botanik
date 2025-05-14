// app/javascript/controllers/parallax_controller.js
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    // Pour s'assurer que le contexte de "this" est le bon,
    // on lie handleScroll et on l'enregistre sur l'event window scroll.
    this.handleScroll = this.handleScroll.bind(this);
    window.addEventListener("scroll", this.handleScroll);
    // Appel initial pour positionner l'image dès le chargement.
    this.handleScroll();
  }

  disconnect() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll() {
    // Vous pouvez ajuster la valeur de `speed` pour affiner l'effet.
    const speed = 0.5;
    const rect = this.element.getBoundingClientRect();
    // Calcul de l'offset vertical en fonction de la position de l'élément
    const offset = rect.top * speed;
    // Mise à jour de la position de fond en gardant "center" à l'horizontale.
    this.element.style.backgroundPosition = `center ${offset}px`;
  }
}
