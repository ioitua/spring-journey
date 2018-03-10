const initGalleries = (interval = 5000) => {
  document.querySelectorAll('.gallery').forEach((gallery) => {
    gallery.classList.add('playing')
    gallery.firstElementChild.classList.add('active')
  })

  setInterval(() => {
    document.querySelectorAll('.gallery').forEach((gallery) => {
      const current = gallery.querySelector('.gallery-item.active')
      const next = current.nextElementSibling || gallery.firstElementChild

      current.classList.remove('active')
      next.classList.add('active')
    })
  }, interval)
}

initGalleries(10000)
