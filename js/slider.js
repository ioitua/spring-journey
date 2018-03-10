const KEY_ARROW_LEFT = 37
const KEY_ARROW_UP = 38
const KEY_ARROW_RIGHT = 39
const KEY_ARROW_DOWN = 40

class Slider {
  constructor(container, {
    slideSelector = '.slide',
    onSlide = () => {},
  } = {}) {
    container.classList.add('presentation')

    this.onSlide = onSlide

    this.slides = Array.from(container.querySelectorAll(slideSelector),
      (element, i) => {
        element.classList.add('slide')

        if (!element.id) element.id = `slide-${i + 1}`

        return element.id
      });

    const current = this.slides.indexOf(window.location.hash.slice(1))
    this.current = current >= 0 ? current : 0
  }

  get length() {
    return this.slides.length
  }

  get current() {
    return this._current;
  }

  set current(value) {
    if (value >= 0 && value < this.length) {
      this._current = value
      window.location.hash = `#${this.slides[this.current]}`

      this.onSlide(this.current + 1, this.length)
    }
  }

  slide(direction) {
    this.current += direction
  }
}

const createControls = (element) => {
  element.insertAdjacentHTML('beforeend', `
    <nav class="controls">
      <button class="button-prev">Попередній</button>
      <button class="button-next">Наступний</button>
    </nav>

    <progress class="page-progress"></progress>
  `)

  return {
    prev: element.querySelector('.button-prev'),
    next: element.querySelector('.button-next'),
    progress: element.querySelector('.page-progress'),
  }
}


const initPresentation = (slideSelector = '.slide') => {
  const container = document.body
  const controls = createControls(container)

  const slider = new Slider(container, {
    slideSelector: '.section',
    onSlide(current, total) {
      const { progress } = controls
      progress.innerHTML = `${current}&nbsp;/&nbsp;${total}`
      progress.value = current
      progress.max = total
    },
  })

  // Events
  const slideToPrev = () => slider.slide(-1)
  const slideToNext = () => slider.slide(1)

  // Click events
  controls.prev.addEventListener('click', slideToPrev)
  controls.next.addEventListener('click', slideToNext)

  // Keyboard events
  window.addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {
      case KEY_ARROW_UP:
      case KEY_ARROW_LEFT:
        slideToPrev()
        break
      case KEY_ARROW_DOWN:
      case KEY_ARROW_RIGHT:
        slideToNext()
        break
    }
  })
}

initPresentation()
