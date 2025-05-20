// app/javascript/controllers/plan_toggle_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["button"]
  static values  = { sectionId: String }

  connect() {
    // On cache le bouton au départ
    this.buttonTarget.classList.add("hidden")

    // On observe la section
    const section = document.getElementById(this.sectionIdValue)
    if (!section) return

    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.buttonTarget.classList.remove("hidden")
          } else {
            this.buttonTarget.classList.add("hidden")
          }
        })
      },
      { rootMargin: "0px", threshold: 0.1 }
    )
    this.observer.observe(section)
  }

  disconnect() {
    this.observer?.disconnect()
  }
}
