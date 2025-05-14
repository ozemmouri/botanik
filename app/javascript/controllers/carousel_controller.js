// app/javascript/controllers/carousel_controller.js
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["slide"];

  connect() {
    this.currentIndex = 0;

    // 1) Force le téléchargement immédiat et le décodage de chaque image
    this.slideTargets.forEach(slide => {
      const img = slide.querySelector("img");
      if (!img) return;

      img.loading = "eager";
      img.decoding = "sync";
      img.setAttribute("fetchpriority", "high");
    });

    // 2) Initialise le carousel
    this.setupSlides();
    this.updateButtons();
  }

  setupSlides() {
    this.slideTargets.forEach((slide, i) => {
      Object.assign(slide.style, {
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        transition: "transform 0.7s ease-in-out",
        backfaceVisibility: "hidden",
        willChange: "transform",
        transform: i === this.currentIndex ? "translateX(0)" : "translateX(100%)"
      });
    });
  }

  next() {
    if (this.currentIndex < this.slideTargets.length - 1) {
      const previousIndex = this.currentIndex;
      this.currentIndex += 1;
      this.transitionSlides(previousIndex, this.currentIndex, "next");
    }
    this.updateButtons();
  }

  prev() {
    if (this.currentIndex > 0) {
      const previousIndex = this.currentIndex;
      this.currentIndex -= 1;
      this.transitionSlides(previousIndex, this.currentIndex, "prev");
    }
    this.updateButtons();
  }

  transitionSlides(previousIndex, currentIndex, direction) {
    const prevSlide = this.slideTargets[previousIndex];
    const currSlide = this.slideTargets[currentIndex];

    currSlide.style.transform = direction === "next"
      ? "translateX(100%)"
      : "translateX(-100%)";

    requestAnimationFrame(() => {
      prevSlide.style.transform = direction === "next"
        ? "translateX(-100%)"
        : "translateX(100%)";
      currSlide.style.transform = "translateX(0)";
    });
  }

  updateButtons() {
    const prevButton = this.element.querySelector("[data-action='click->carousel#prev']");
    const nextButton = this.element.querySelector("[data-action='click->carousel#next']");

    prevButton.disabled = this.currentIndex === 0;
    nextButton.disabled = this.currentIndex === this.slideTargets.length - 1;

    prevButton.style.opacity = prevButton.disabled ? "0.3" : "1";
    nextButton.style.opacity = nextButton.disabled ? "0.3" : "1";
    prevButton.style.pointerEvents = prevButton.disabled ? "none" : "auto";
    nextButton.style.pointerEvents = nextButton.disabled ? "none" : "auto";
  }
}
