// app/javascript/controllers/fade_up_controller.js
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    // État initial du texte : caché et décalé vers le bas
    this.element.classList.add("opacity-0", "translate-y-4", "transition-all", "duration-700", "ease-out");
    this.element.addEventListener("animate:fadeUp", this.fadeUp.bind(this));
    this.element.addEventListener("animate:fadeOut", this.fadeOut.bind(this));
  }

  fadeUp() {
    this.element.classList.remove("opacity-0", "translate-y-4");
    this.element.classList.add("opacity-100", "translate-y-0");
  }

  fadeOut() {
    this.element.classList.remove("opacity-100", "translate-y-0");
    this.element.classList.add("opacity-0", "translate-y-4");
  }
}
