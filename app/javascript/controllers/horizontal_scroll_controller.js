// app/javascript/controllers/horizontal_scroll_controller.js
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["slide"]

  connect() {
    this.index = 0;
    this.slides = this.slideTargets;
    this.scrolling = false;
    // Animation initiale du premier slide
    setTimeout(() => {
      const activeSlide = this.slides[this.index];
      const bgElement = activeSlide.querySelector('[data-controller~="fade-in"]');
      if (bgElement) {
        bgElement.dispatchEvent(new CustomEvent("animate:fadeIn", { bubbles: true }));
      }
      const textElement = activeSlide.querySelector('[data-controller~="fade-up"]');
      if (textElement) {
        textElement.dispatchEvent(new CustomEvent("animate:fadeUp", { bubbles: true }));
      }
    }, 500);
  }

  wheel(event) {
    if (this.scrolling) return;
    event.preventDefault();
    const delta = Math.sign(event.deltaY);
    if (delta > 0 && this.index < this.slides.length - 1) {
      this.next();
    } else if (delta < 0 && this.index > 0) {
      this.previous();
    }
  }

  next() {
    if (this.index < this.slides.length - 1) {
      this.scrolling = true;
      const currentSlide = this.slides[this.index];
      const currentText = currentSlide.querySelector('[data-controller~="fade-up"]');
      if (currentText) {
        currentText.dispatchEvent(new CustomEvent("animate:fadeOut", { bubbles: true }));
      }
      setTimeout(() => {
        currentSlide.style.transform = 'translateX(-100vw)';
        this.index++;
        setTimeout(() => {
          const activeSlide = this.slides[this.index];
          const newBg = activeSlide.querySelector('[data-controller~="fade-in"]');
          if (newBg) {
            newBg.dispatchEvent(new CustomEvent("animate:fadeIn", { bubbles: true }));
          }
          const newText = activeSlide.querySelector('[data-controller~="fade-up"]');
          if (newText) {
            newText.dispatchEvent(new CustomEvent("animate:fadeUp", { bubbles: true }));
          }
          this.scrolling = false;
        }, 1500);
      }, 700);
    }
  }

  previous() {
    if (this.index > 0) {
      this.scrolling = true;
      const currentSlide = this.slides[this.index];
      const currentText = currentSlide.querySelector('[data-controller~="fade-up"]');
      if (currentText) {
        currentText.dispatchEvent(new CustomEvent("animate:fadeOut", { bubbles: true }));
      }
      setTimeout(() => {
        const prevSlide = this.slides[this.index - 1];
        prevSlide.style.transform = 'translateX(-100vw)';
        void prevSlide.offsetWidth;
        prevSlide.style.transform = 'translateX(0)';
        this.index--;
        setTimeout(() => {
          const activeSlide = this.slides[this.index];
          const newBg = activeSlide.querySelector('[data-controller~="fade-in"]');
          if (newBg) {
            newBg.dispatchEvent(new CustomEvent("animate:fadeIn", { bubbles: true }));
          }
          const newText = activeSlide.querySelector('[data-controller~="fade-up"]');
          if (newText) {
            newText.dispatchEvent(new CustomEvent("animate:fadeUp", { bubbles: true }));
          }
          this.scrolling = false;
        }, 1500);
      }, 700);
    }
  }
}
