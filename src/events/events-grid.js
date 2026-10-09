export function renderGrid(container, events) {
  container.innerHTML = `
    <div class="events-grid"></div>
  `

  const grid = container.querySelector(".events-grid")

  events.forEach((event) => {
    const card = document.createElement("a")

    card.className = "event-grid-card"
    card.href = `${import.meta.env.BASE_URL}events.html?id=${event.id}`

    card.innerHTML = `
      <img
        class="event-grid-card__image"
        src="${event.image}"
        alt="${event.title}"
      >
      <p class="event-grid-card__title">${event.title}</p>
    `

    grid.appendChild(card)
  })
}
