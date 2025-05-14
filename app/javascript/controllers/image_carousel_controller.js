import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["slides", "indicator"];
  currentIndex = 0;

  connect() {
    setTimeout(() => this.updateCarousel(), 100); // petit délai pour garantir la largeur correcte
    window.addEventListener('resize', this.updateCarousel.bind(this));
  }

  disconnect() {
    window.removeEventListener('resize', this.updateCarousel.bind(this));
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.slideCount;
    this.updateCarousel();
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.slideCount) % this.slideCount;
    this.updateCarousel();
  }

  updateCarousel() {
    const slideWidth = this.slidesTarget.firstElementChild.clientWidth;
    const translateX = -(slideWidth * this.currentIndex);
    this.slidesTarget.style.transform = `translateX(${translateX}px)`;
    this.updateIndicators();
  }

  updateIndicators() {
    this.indicatorTargets.forEach((indicator, index) => {
      indicator.classList.toggle('opacity-100', index === this.currentIndex);
      indicator.classList.toggle('opacity-50', index !== this.currentIndex);
    });
  }

  get slideCount() {
    return this.slidesTarget.childElementCount;
  }
}
