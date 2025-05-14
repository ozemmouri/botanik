// app/javascript/controllers/parallax_scroll_carousel_controller.js
import { Controller } from "@hotwired/stimulus";

export default class ParallaxScrollCarouselController extends Controller {
  static targets = ["image"];

  connect() {
    // Tableau pour collecter les promesses de décodage
    this.decodePromises = [];

    // 1) Prépare chaque image : chargement, décodage, hint preload, GPU layer
    this.imageTargets.forEach(el => {
      const img = el.querySelector("img");
      if (!img || !img.src) return;

      // Forcer le chargement immédiat et le décodage synchronisé
      img.loading = "eager";
      img.decoding = "sync";

      // Hint de préchargement pour le navigateur
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = img.src;
      document.head.appendChild(link);

      // Crée un plan GPU et désactive la backface pour éviter le flicker
      el.style.backfaceVisibility = "hidden";
      el.style.willChange = "transform";
      // Note : translateZ(0) peut être ajouté en CSS si nécessaire

      // Collecte la promesse de décodage
      if (typeof img.decode === 'function') {
        this.decodePromises.push(img.decode());
      }
    });

    // 2) Une fois toutes les images décodées, on attache le scroll listener
    Promise.all(this.decodePromises)
      .catch(() => {})
      .then(() => {
        this.ticking = false;
        this.onScroll = this.onScroll.bind(this);
        window.addEventListener("scroll", this.onScroll, { passive: true });
        // Premier calcul parallax
        this.applyParallax();
      });
  }

  disconnect() {
    window.removeEventListener("scroll", this.onScroll);
  }

  onScroll() {
    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        this.applyParallax();
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  applyParallax() {
    const isMobile = window.innerWidth < 768;

    this.imageTargets.forEach(el => {
      if (isMobile) {
        el.style.transform = "translateY(0)";
        return;
      }

      const rect = el.getBoundingClientRect();
      const mid = rect.top + rect.height / 2;
      const winH = window.innerHeight;
      let ratio = (mid - winH / 2) / (winH / 2 + rect.height / 2);
      ratio = Math.max(-1, Math.min(1, ratio));
      const translateY = ratio * 60; // ajustez si nécessaire

      el.style.transform = `translateY(${translateY}px)`;
    });
  }
}
