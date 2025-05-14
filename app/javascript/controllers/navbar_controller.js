// app/javascript/controllers/navbar_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["menu", "open", "close"]

  toggleMenu() {
    this.menuTarget.classList.toggle('hidden')
    this.openTarget.classList.toggle('hidden')
    this.closeTarget.classList.toggle('hidden')
  }
}
