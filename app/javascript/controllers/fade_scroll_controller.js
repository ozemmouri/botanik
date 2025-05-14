import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    // Assurez-vous que l'élément démarre dans l'état initial (invisible et décalé vers le bas).
    // Vous pouvez par exemple avoir dans votre HTML les classes "opacity-0 translate-y-4".
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // Quand 50% de l'élément est visible, déclenche l'animation
        if (entry.intersectionRatio >= 0.5) {
          this.fadeUp();
          // Si l'animation ne doit s'exécuter qu'une fois, on peut arrêter d'observer
          this.observer.disconnect();
        }
      });
    }, {
      threshold: 0.5
    });
    this.observer.observe(this.element);
  }

  fadeUp() {
    // Applique l'animation fade up en retirant l'état initial et en ajoutant l'état final.
    this.element.classList.remove("opacity-0", "translate-y-4");
    this.element.classList.add("opacity-100", "translate-y-0");
  }

  disconnect() {
    this.observer && this.observer.disconnect();
  }
}
