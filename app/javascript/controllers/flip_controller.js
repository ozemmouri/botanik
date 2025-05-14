// app/javascript/controllers/flip_controller.js
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    // Crée un observer pour surveiller l'élément
    this.observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          // Si l'élément est visible à au moins 50%
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-flip");
            // Une fois l'animation lancée, on peut arrêter d'observer l'élément
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 } // Vous pouvez ajuster ce seuil selon vos besoins
    );

    // Lancer l'observation sur l'élément contrôlé
    this.observer.observe(this.element);
  }

  disconnect() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
