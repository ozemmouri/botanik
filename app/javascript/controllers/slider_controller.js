// app/javascript/controllers/slider_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["container"]

  connect() {
    this.currentIndex = 0
    this.total = 3  // nombre total d'images
    // Démarrage du slider après 2 secondes
    this.startSlider()
  }

  disconnect() {
    // Nettoyage du timeout lorsque le controller est déconnecté
    clearTimeout(this.timeout)
  }

  startSlider() {
    this.timeout = setTimeout(() => {
      this.nextSlide()
      this.startSlider()  // relance le timeout pour la boucle infinie
    }, 2000)  // 2000 ms d'attente avant le changement
  }

  nextSlide() {
    // Calcul du prochain index dans le cycle
    this.currentIndex = (this.currentIndex + 1) % this.total
    // Calcul de la largeur de l'image selon la taille d'écran :
    // Sur mobile, on utilise toute la largeur de la fenêtre.
    // Sur desktop, on soustrait 40px pour tenir compte de la marge.
    const isMobile = window.innerWidth < 768;
    const imageWidth = isMobile ? window.innerWidth : window.innerWidth - 40;
    // Calcul de la valeur de translation en fonction de la largeur de l'image
    const translateX = -this.currentIndex * imageWidth;
    this.containerTarget.style.transform = `translateX(${translateX}px)`;
  }
}
