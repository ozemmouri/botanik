// app/javascript/controllers/parallax_scroll_controller.js
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["image"]

  connect() {
    this.handleScroll = this.handleScroll.bind(this);
    window.addEventListener("scroll", this.handleScroll, { passive: true });
    this.handleScroll(); // initialiser dès le chargement
  }

  disconnect() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll() {
    const isMobile = window.innerWidth < 768;

    this.imageTargets.forEach((image) => {
      // Si mobile, désactiver l'animation parallax et réinitialiser la transform
      if (isMobile) {
        image.style.transform = "translateY(0)";
        return;
      }

      const container = image.parentElement;
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.bottom > 0 && rect.top < windowHeight) {
        const totalScrollableDistance = windowHeight + rect.height;
        const scrollPosition = windowHeight - rect.top;
        const scrollPercent = scrollPosition / totalScrollableDistance;

        const maxTranslate = image.offsetHeight * 0.2; // 20% de la hauteur de l'image
        const translateY = -(maxTranslate * scrollPercent);

        image.style.transform = `translateY(${translateY}px)`;
      }
    });
  }
}
