// app/javascript/controllers/horizontal_vertical_scroll_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["track"]

  connect() {
    this.index = 0
    this.scrolling = false
  }

  wheel(event) {
    const delta = Math.sign(event.deltaY)

    // Si on n'est pas encore sur la dernière slide, on bloque le scroll vertical pour gérer le scroll horizontal.
    if (this.index < this.trackTarget.children.length - 1) {
      event.preventDefault()
      if (this.scrolling) return

      if (delta > 0) {
        this.index++
        this.scrollToSlide()
      } else if (delta < 0 && this.index > 0) {
        this.index--
        this.scrollToSlide()
      }
    }
    // Si on est sur la dernière slide et que l'utilisateur scrolle vers le haut, on permet de revenir en arrière horizontalement.
    else if (this.index === this.trackTarget.children.length - 1 && delta < 0) {
      event.preventDefault()
      if (this.scrolling) return
      this.index--
      this.scrollToSlide()
    }
    // Dans le cas où l'on est sur la dernière slide et que l'utilisateur scrolle vers le bas,
    // on ne bloque pas l'événement, ce qui permet au scroll vertical de se produire.
  }

  next() {
    if (this.index < this.trackTarget.children.length - 1) {
      this.index++
      this.scrollToSlide()
    }
  }

  previous() {
    if (this.index > 0) {
      this.index--
      this.scrollToSlide()
    }
  }

  scrollToSlide() {
    this.scrolling = true
    this.trackTarget.style.transform = `translateX(-${this.index * 100}vw)`
    setTimeout(() => {
      this.scrolling = false
    }, 500)
  }
}
