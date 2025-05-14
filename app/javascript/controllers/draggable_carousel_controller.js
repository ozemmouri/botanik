import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["slides", "indicator"];
  currentIndex = 0;
  dragging = false;
  startX = 0;
  currentTranslate = 0;
  animationID = 0;

  connect() {
    this.slideCount = this.slidesTarget.childElementCount;
    this.updateCarousel();

    this.element.addEventListener('mousedown', this.dragStart.bind(this));
    this.element.addEventListener('mousemove', this.dragMove.bind(this));
    this.element.addEventListener('mouseup', this.dragEnd.bind(this));
    this.element.addEventListener('mouseleave', this.dragEnd.bind(this));

    this.element.addEventListener('touchstart', this.dragStart.bind(this));
    this.element.addEventListener('touchmove', this.dragMove.bind(this));
    this.element.addEventListener('touchend', this.dragEnd.bind(this));

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

  dragStart(event) {
    event.preventDefault();
    this.dragging = true;
    this.startX = event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    this.animationID = requestAnimationFrame(this.animation.bind(this));
    this.element.classList.add('cursor-grabbing');
  }

  dragMove(event) {
    if (!this.dragging) return;
    const currentPosition = event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    this.currentTranslate = currentPosition - this.startX - (this.currentIndex * 600);
  }

  dragEnd() {
    if (!this.dragging) return;
    this.dragging = false;
    cancelAnimationFrame(this.animationID);
    this.element.classList.remove('cursor-grabbing');

    const movedBy = this.currentTranslate + (this.currentIndex * 600);

    if (movedBy < -100 && this.currentIndex < this.slideCount - 1) this.currentIndex += 1;
    if (movedBy > 100 && this.currentIndex > 0) this.currentIndex -= 1;

    this.updateCarousel();
  }

  animation() {
    this.setCarouselPosition(this.currentTranslate);
    if (this.dragging) requestAnimationFrame(this.animation.bind(this));
  }

  updateCarousel() {
    this.currentTranslate = -(600 * this.currentIndex);
    this.setCarouselPosition(this.currentTranslate);
    this.updateIndicators();
  }

  setCarouselPosition(translateX) {
    this.slidesTarget.style.transform = `translateX(${translateX}px)`;
  }

  updateIndicators() {
    this.indicatorTargets.forEach((indicator, index) => {
      indicator.classList.toggle('opacity-100', index === this.currentIndex);
      indicator.classList.toggle('opacity-50', index !== this.currentIndex);
    });
  }
}
