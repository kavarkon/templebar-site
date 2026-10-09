import tileIcon from "../assets/icons/tile.svg"
import carouselIcon from "../assets/icons/carousel.svg"
import cancelIcon from "../assets/icons/cancel.svg"
import { loadEvents } from "./events-api.js"
import { renderSlider } from "./events-slider.js"
import { renderGrid } from "./events-grid.js"
import { renderEventPage } from "./event-page.js"

const state = {
  events: [],
  view: "slider",
}

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector(".events-view")
  const displayButton = document.querySelector(".header__display-button")
  const eventId = getEventIdFromUrl()

  setupBackButton(eventId)

  if (eventId) {
    document.body.classList.add("event-single-page")
  }

  if (!container) return

  try {
    state.events = await loadEvents()
  } catch {
    container.textContent = "Не удалось загрузить мероприятия"
    return
  }

  if (eventId) {
    const event = state.events.find((event) => event.id == eventId)

    if (!event) {
      container.textContent = "Событие не найдено"
      return
    }

    renderEventPage(container, event)
    return
  }

  renderCurrentView(container, displayButton)
  setupDisplayButton(displayButton, container)
})

function getEventIdFromUrl() {
  const params = new URLSearchParams(window.location.search)

  return params.get("id")
}

function renderCurrentView(container, displayButton) {
  if (state.view === "slider") {
    renderSlider(container, state.events)
  } else {
    renderGrid(container, state.events)
  }

  updateDisplayButton(displayButton)
}

function setupDisplayButton(button, container) {
  if (!button) return

  button.addEventListener("click", () => {
    state.view = state.view === "slider" ? "grid" : "slider"

    renderCurrentView(container, button)
  })
}

function updateDisplayButton(button) {
  if (!button) return

  const icon = button.querySelector(".header__display-icon")

  if (!icon) return

  const showingSlider = state.view === "slider"

  icon.src = showingSlider ? tileIcon : carouselIcon
  button.ariaLabel = showingSlider ? "Показать плитку" : "Показать карусель"
}

function setupBackButton(eventId) {
  const backBtn = document.querySelector(".header__cancel-button")

  if (!backBtn) return

  backBtn.style.backgroundImage = `url("${cancelIcon}")`

  if (eventId) {
    backBtn.href = `${import.meta.env.BASE_URL}events.html`
  } else {
    backBtn.href = import.meta.env.BASE_URL
  }
}
