// app/javascript/controllers/modal_controller.js
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["modal", "carousel"];
  static values = {
    index: Number
  };

  connect() {
    this.indexValue = 0; // index pour le carousel
  }

  open() {
    // Ouvre la fenêtre modale
    this.modalTarget.classList.remove("hidden");
    // Initialise le carousel si présent
    if (this.hasCarouselTarget) {
      this.initCarousel();
    }
  }

  close() {
    // Ferme la fenêtre modale
    this.modalTarget.classList.add("hidden");
  }

  prev() {
    if (!this.hasCarouselTarget) return;
    this.indexValue = (this.indexValue - 1 + this.slides.length) % this.slides.length;
    this.showSlide();
  }

  next() {
    if (!this.hasCarouselTarget) return;
    this.indexValue = (this.indexValue + 1) % this.slides.length;
    this.showSlide();
  }

  initCarousel() {
    // Récupère toutes les images du carousel (une seule fois)
    this.slides = Array.from(this.carouselTarget.querySelectorAll("img"));
    this.showSlide();
  }

  showSlide() {
    // Affiche l'image à l'index actuel, masque les autres
    this.slides.forEach((img, i) => {
      img.style.display = i === this.indexValue ? "block" : "none";
    });
  }
}
