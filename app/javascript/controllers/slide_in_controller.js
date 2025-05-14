// app/javascript/controllers/slide_in_controller.js
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static values = { direction: String } // "right" ou "left"

  connect() {
    // Position initiale : "right" -> offset négatif, "left" -> offset positif
    const offset = this.directionValue === "right" ? "-100%" : "100%";
    this.element.style.transform = `translateX(${offset})`;
    this.element.style.opacity = "0";
    this.element.style.transition = "transform 0.7s ease, opacity 0.7s ease";
    this.element.style.willChange = "transform, opacity";

    // IntersectionObserver avec rootMargin élargi horizontalement sur mobile
    const isMobile = window.innerWidth < 768;
    const options = {
      threshold: 0.25,
      rootMargin: isMobile
        ? "0px 100% -25% 100%"  // top right bottom left
        : "0px"
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
          this.slideIn();
          this.observer.disconnect();
        }
      });
    }, options);

    this.observer.observe(this.element);
  }

  disconnect() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  slideIn() {
    this.element.style.transform = "translateX(0)";
    this.element.style.opacity = "1";
  }
}
