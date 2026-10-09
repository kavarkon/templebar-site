import { formatEventDate } from "./events-utils.js"

export function renderSlider(container, events) {
  container.innerHTML = `
    <div class="events-slider">
      <div class="events-slider__track"></div>
    </div>
    <div class="event-details">
      <p class="event-details__title"></p>
      <p class="event-details__date"></p>
    </div>
  `

  const slider = container.querySelector(".events-slider")
  const track = container.querySelector(".events-slider__track")
  const details = container.querySelector(".event-details")

  events.forEach((event, index) => {
    const card = document.createElement("a")

    card.className = "event-card"

    card.dataset.title = event.title

    const displayDate = formatEventDate(event.scheduledAt)

    card.dataset.displayDate = `${displayDate.date}\n${displayDate.time}`

    if (index === 0) {
      card.classList.add("active")
    }

    card.href = `${import.meta.env.BASE_URL}events.html?id=${event.id}`

    card.innerHTML = `
      <img
        class="event-card__image"
        src="${event.image}"
        alt="${event.title}"
      >
    `

    track.appendChild(card)
  })

  setupSlider(slider, track, details)
}

function setupSlider(slider, track, details) {
  slider.onscroll = () => {
    updateActiveCard(slider, track, details)
  }

  updateActiveCard(slider, track, details)
}

function updateActiveCard(slider, track, details) {
  const cards = [...track.querySelectorAll(".event-card")]

  if (cards.length === 0) return

  const sliderCenter = slider.getBoundingClientRect().left + slider.offsetWidth / 2

  let activeCard = cards[0]
  let smallestDistance = Infinity

  cards.forEach((card) => {
    const cardCenter = card.getBoundingClientRect().left + card.offsetWidth / 2
    const distance = Math.abs(sliderCenter - cardCenter)

    if (distance < smallestDistance) {
      smallestDistance = distance
      activeCard = card
    }
  })

  cards.forEach((card) => {
    card.classList.toggle("active", card === activeCard)
  })

  updateEventDetails(details, activeCard)
}

function updateEventDetails(details, card) {
  if (!details) return

  const title = details.querySelector(".event-details__title")
  const date = details.querySelector(".event-details__date")

  if (!title || !date) return

  title.textContent = card.dataset.title
  date.textContent = card.dataset.displayDate
}
