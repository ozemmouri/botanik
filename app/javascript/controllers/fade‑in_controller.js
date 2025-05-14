// app/javascript/controllers/fade_in_controller.js
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    this.element.classList.add("opacity-0", "transition-opacity", "duration-700");
    this.element.addEventListener("animate:fadeIn", () => {
      this.element.classList.remove("opacity-0");
      this.element.classList.add("opacity-100");
    });
  }
}
