// Smooth Carousel Auto-Slide
class SmoothCarousel {
  constructor(wrapperId, dotsContainerId) {
    this.wrapper = document.getElementById(wrapperId)
    this.dotsContainer = document.getElementById(dotsContainerId)

    if (!this.wrapper || !this.dotsContainer) return

    this.cards = this.wrapper.querySelectorAll(".problem-card")
    this.totalCards = this.cards.length
    this.currentIndex = 0
    this.autoSlideInterval = null
    this.isAnimating = false
    this.userInteracted = false
    this.interactionTimeout = null

    this.init()
  }

  init() {
    this.createDots()
    this.startAutoSlide()
    this.attachEventListeners()
  }

  createDots() {
    this.dotsContainer.innerHTML = ""
    for (let i = 0; i < this.totalCards; i++) {
      const dot = document.createElement("div")
      dot.className = `dot ${i === 0 ? "active" : ""}`
      dot.addEventListener("click", () => this.goToSlide(i))
      this.dotsContainer.appendChild(dot)
    }
    this.dots = this.dotsContainer.querySelectorAll(".dot")
  }

  updateDots() {
    this.dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === this.currentIndex)
    })
  }

  smoothScrollTo(index) {
    if (this.isAnimating || index === this.currentIndex) return

    this.isAnimating = true
    this.currentIndex = index

    const card = this.cards[index]
    const targetScroll = card.offsetLeft - 20

    this.animateScroll(this.wrapper.scrollLeft, targetScroll, 600)
  }

  animateScroll(start, end, duration) {
    const startTime = performance.now()
    const distance = end - start

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for smooth animation
      const easeProgress = this.easeInOutCubic(progress)

      this.wrapper.scrollLeft = start + distance * easeProgress

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        this.isAnimating = false
        this.updateDots()
      }
    }

    requestAnimationFrame(animate)
  }

  easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
  }

  goToSlide(index) {
    this.handleUserInteraction()
    this.smoothScrollTo(index)
  }

  nextSlide() {
    const nextIndex = (this.currentIndex + 1) % this.totalCards
    this.smoothScrollTo(nextIndex)
  }

  startAutoSlide() {
    this.stopAutoSlide()
    this.autoSlideInterval = setInterval(() => {
      if (!this.userInteracted && !this.isAnimating) {
        this.nextSlide()
      }
    }, 3000)
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval)
      this.autoSlideInterval = null
    }
  }

  handleUserInteraction() {
    this.userInteracted = true
    this.stopAutoSlide()

    if (this.interactionTimeout) {
      clearTimeout(this.interactionTimeout)
    }

    this.interactionTimeout = setTimeout(() => {
      this.userInteracted = false
      this.startAutoSlide()
    }, 4000)
  }

  attachEventListeners() {
    // Handle manual scrolling
    let scrollTimeout
    this.wrapper.addEventListener("scroll", () => {
      this.handleUserInteraction()

      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        this.updateCurrentIndexFromScroll()
      }, 150)
    })

    // Handle touch events
    this.wrapper.addEventListener("touchstart", () => {
      this.handleUserInteraction()
    })

    // Pause on hover
    this.wrapper.addEventListener("mouseenter", () => {
      this.handleUserInteraction()
    })

    // Resume after leaving
    this.wrapper.addEventListener("mouseleave", () => {
      if (!this.userInteracted) {
        this.startAutoSlide()
      }
    })
  }

  updateCurrentIndexFromScroll() {
    const scrollLeft = this.wrapper.scrollLeft
    const cardWidth = this.cards[0].offsetWidth + 16 // card width + gap
    const newIndex = Math.round(scrollLeft / cardWidth)

    if (newIndex !== this.currentIndex && newIndex < this.totalCards) {
      this.currentIndex = newIndex
      this.updateDots()
    }
  }
}

// Initialize carousel when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const carousel = new SmoothCarousel("carouselWrapper", "carouselDots")
})

// WhatsApp FAB Click Handler
function openWhatsApp() {
  const phoneNumber = "6281234567890" // Ganti dengan nomor WhatsApp Anda
  const message = encodeURIComponent("Halo, saya ingin konsultasi tentang service AC")
  window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank")
}

// Order via WhatsApp
function orderViaWhatsApp(service = "") {
  const phoneNumber = "6281234567890" // Ganti dengan nomor WhatsApp Anda
  let message = "Halo, saya ingin order service AC"
  if (service) {
    message += ` untuk ${service}`
  }
  window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank")
}

const acProblems = [
  {
    title: "AC Tidak Dingin",
    description: "Angin keluar normal tapi ruangan tetap panas",
    icon: "thermometer",
    color: "icon-blue-light",
    url: "detail-masalah.html",
  },
  {
    title: "Bocor Air",
    description: "Air menetes dari unit indoor membahasi lantai",
    icon: "droplet",
    color: "icon-cyan-light",
    url: "detail-masalah.html",
  },
  {
    title: "Bunyi Berisik",
    description: "Suara kasar, dengung, atau getaran tidak wajar",
    icon: "volume",
    color: "icon-orange-light",
    url: "detail-masalah.html",
  },
  {
    title: "Mati Sendiri",
    description: "AC tiba-tiba off atau lampu indikator berkedip",
    icon: "power",
    color: "icon-blue-light",
    url: "detail-masalah.html",
  },
  {
    title: "Bau Tak Sedap",
    description: "Keluar bau apek, asam, atau gosong",
    icon: "wind",
    color: "icon-cyan-light",
    url: "detail-masalah.html",
  },
  {
    title: "Panas Siang Hari",
    description: "Malam dingin, tapi tidak terasa saat siang terik",
    icon: "sun",
    color: "icon-orange-light",
    url: "detail-masalah.html",
  },
  {
    title: "Freon Habis",
    description: "AC kurang dingin karena freon berkurang",
    icon: "thermometer",
    color: "icon-blue-light",
    url: "detail-masalah.html",
  },
  {
    title: "Remote Tidak Berfungsi",
    description: "Remote tidak merespon atau lampu AC tidak menyala",
    icon: "power",
    color: "icon-orange-light",
    url: "detail-masalah.html",
  },
  {
    title: "Filter Kotor",
    description: "Filter penuh debu mengurangi performa AC",
    icon: "wind",
    color: "icon-cyan-light",
    url: "detail-masalah.html",
  },
  {
    title: "Kompresor Rusak",
    description: "AC tidak dingin sama sekali, kompresor tidak jalan",
    icon: "thermometer",
    color: "icon-blue-light",
    url: "detail-masalah.html",
  },
]

function activateSearch() {
  const searchHeader = document.getElementById("searchHeader")
  const hero = document.getElementById("diagnosaHero")
  const problemsGrid = document.getElementById("problemsGrid")
  const headerTitle = document.getElementById("headerTitle")
  const searchHeaderInput = document.getElementById("searchHeaderInput")

  // Activate search header with animation
  searchHeader.classList.add("active")
  hero.classList.add("search-active")
  problemsGrid.classList.add("dimmed")

  // Focus on the header search input
  setTimeout(() => {
    searchHeaderInput.focus()
  }, 400)
}

function closeSearch() {
  const searchHeader = document.getElementById("searchHeader")
  const hero = document.getElementById("diagnosaHero")
  const problemsGrid = document.getElementById("problemsGrid")
  const autocompleteDropdown = document.getElementById("autocompleteDropdown")
  const searchHeaderInput = document.getElementById("searchHeaderInput")

  // Deactivate search header
  searchHeader.classList.remove("active")
  hero.classList.remove("search-active")
  problemsGrid.classList.remove("dimmed")
  autocompleteDropdown.classList.remove("show")

  // Clear search input
  searchHeaderInput.value = ""
}

function getIconSvg(iconName) {
  const icons = {
    thermometer: '<path d="M12 2v20M17 7H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>',
    droplet: '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>',
    volume:
      '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>',
    power: '<path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line>',
    wind: '<path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path>',
    sun: '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>',
  }
  return icons[iconName] || icons.thermometer
}

function showAutocomplete(query) {
  const autocompleteDropdown = document.getElementById("autocompleteDropdown")

  if (!query || query.length < 2) {
    autocompleteDropdown.classList.remove("show")
    return
  }

  // Filter problems based on query
  const filteredProblems = acProblems.filter(
    (problem) =>
      problem.title.toLowerCase().includes(query.toLowerCase()) ||
      problem.description.toLowerCase().includes(query.toLowerCase()),
  )

  if (filteredProblems.length === 0) {
    autocompleteDropdown.innerHTML = '<div class="autocomplete-empty">Tidak ada hasil ditemukan</div>'
    autocompleteDropdown.classList.add("show")
    return
  }

  // Generate autocomplete items
  const itemsHtml = filteredProblems
    .map(
      (problem) => `
    <div class="autocomplete-item" onclick="window.location.href='${problem.url}'">
      <div class="autocomplete-icon ${problem.color}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          ${getIconSvg(problem.icon)}
        </svg>
      </div>
      <div class="autocomplete-text">
        <h4>${problem.title}</h4>
        <p>${problem.description}</p>
      </div>
    </div>
  `,
    )
    .join("")

  autocompleteDropdown.innerHTML = itemsHtml
  autocompleteDropdown.classList.add("show")
}

// Attach event listener to search header input
document.addEventListener("DOMContentLoaded", () => {
  const carousel = new SmoothCarousel("carouselWrapper", "carouselDots")
  const searchHeaderInput = document.getElementById("searchHeaderInput")

  if (searchHeaderInput) {
    searchHeaderInput.addEventListener("input", (e) => {
      showAutocomplete(e.target.value)
    })
  }
})
