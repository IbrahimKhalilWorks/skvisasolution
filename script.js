document.addEventListener("DOMContentLoaded", function () {
  // Slider functionality
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".prev-slide");
  const nextBtn = document.querySelector(".next-slide");

  let currentSlide = 0;
  let slideInterval;
  const intervalTime = 5000; // 5 seconds

  // Initialize slider
  function initSlider() {
    // Set first slide as active
    slides[0].classList.add("active");
    dots[0].classList.add("active");

    // Start automatic slideshow
    startSlideInterval();
  }

  // Start automatic slideshow
  function startSlideInterval() {
    slideInterval = setInterval(() => {
      nextSlide();
    }, intervalTime);
  }

  // Reset interval when manually changing slides
  function resetInterval() {
    clearInterval(slideInterval);
    startSlideInterval();
  }

  // Go to specific slide
  function goToSlide(index) {
    // Remove active class from all slides and dots
    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    // Add active class to current slide and dot
    slides[index].classList.add("active");
    dots[index].classList.add("active");

    // Update current slide index
    currentSlide = index;

    // Reset interval
    resetInterval();
  }

  // Go to next slide
  function nextSlide() {
    let nextIndex = currentSlide + 1;
    if (nextIndex >= slides.length) {
      nextIndex = 0;
    }
    goToSlide(nextIndex);
  }

  // Go to previous slide
  function prevSlide() {
    let prevIndex = currentSlide - 1;
    if (prevIndex < 0) {
      prevIndex = slides.length - 1;
    }
    goToSlide(prevIndex);
  }

  // Event listeners
  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);

  // Add click event to dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      goToSlide(index);
    });
  });

  // Mobile menu toggle
  const mobileToggle = document.querySelector(".mobile-toggle");
  const navMenu = document.querySelector(".nav-menu");
  // Function to toggle menu
  mobileToggle.addEventListener("click", function () {
    navMenu.classList.toggle("active");
  });

  // Initialize slider
  initSlider();

  // Dropdown menu for mobile (optional enhancement)
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
      if (window.innerWidth <= 992) {
        e.preventDefault();
        this.parentElement.classList.toggle("show-dropdown");
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Counter animation function
  function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const end = parseInt(target);
    const range = end - start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    const startTime = new Date().getTime();
    const endTime = startTime + duration;

    function updateCounter() {
      const currentTime = new Date().getTime();
      const remaining = Math.max((endTime - currentTime) / duration, 0);
      const value = Math.round(end - remaining * range);
      element.textContent = value;

      if (value !== end) {
        setTimeout(updateCounter, stepTime);
      }
    }

    setTimeout(updateCounter, stepTime);
  }

  // Intersection Observer for triggering counter animation when in view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counters = entry.target.querySelectorAll(".stat-number");
          counters.forEach((counter) => {
            const target = counter.getAttribute("data-target");
            animateCounter(counter, target);
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  // Observe the stats grid
  const statsGrid = document.querySelector(".stats-grid");
  if (statsGrid) {
    observer.observe(statsGrid);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".partners-slider-track");
  const dots = document.querySelectorAll(".partners-dot");
  let currentIndex = 0;

  function updateSlide(index) {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot) => dot.classList.remove("active"));
    dots[index].classList.add("active");
    currentIndex = index;
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => updateSlide(index));
  });

  setInterval(() => {
    let nextIndex = (currentIndex + 1) % dots.length;
    updateSlide(nextIndex);
  }, 3000);
});

document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".custom-partners-track");
  const dotsContainer = document.querySelector(".custom-slider-dots");
  const items = document.querySelectorAll(".custom-partner-item");
  let currentIndex = 0;
  let autoplayInterval;

  function getItemsPerSlide() {
    if (window.innerWidth <= 576) return 1; // 1 item on mobile
    if (window.innerWidth <= 992) return 2; // 2 items on tablets
    return 3; // 3 items on desktop
  }

  function updateSlides() {
    const itemsPerSlide = getItemsPerSlide();
    let totalSlides = Math.ceil(items.length / itemsPerSlide);

    // Remove old dots
    dotsContainer.innerHTML = "";

    // Create new dots
    for (let i = 0; i < totalSlides; i++) {
      let dot = document.createElement("button");
      dot.classList.add("custom-dot");
      if (i === 0) dot.classList.add("active");
      dot.dataset.index = i;
      dotsContainer.appendChild(dot);
    }

    const dots = document.querySelectorAll(".custom-dot");

    function updateSlider(index) {
      let itemWidth = items[0].offsetWidth + 20; // Add gap
      track.style.transform = `translateX(-${
        index * itemWidth * itemsPerSlide
      }px)`;

      dots.forEach((dot) => dot.classList.remove("active"));
      dots[index].classList.add("active");

      currentIndex = index;
    }

    // Dot Click Events
    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        updateSlider(parseInt(dot.dataset.index));
        resetAutoplay();
      });
    });

    // Autoplay
    function startAutoplay() {
      autoplayInterval = setInterval(() => {
        let nextIndex = currentIndex + 1;
        if (nextIndex >= totalSlides) nextIndex = 0;
        updateSlider(nextIndex);
      }, 5000);
    }

    function resetAutoplay() {
      clearInterval(autoplayInterval);
      startAutoplay();
    }

    startAutoplay();
  }

  updateSlides();
  window.addEventListener("resize", updateSlides);
});

const backToTopBtn = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
  backToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".unique-testimonial-track");
  const dots = document.querySelectorAll(".unique-dot");
  let currentIndex = 0;

  function updateTestimonial(index) {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
    currentIndex = index;
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", function () {
      updateTestimonial(parseInt(this.dataset.index));
    });
  });

  function autoSlide() {
    currentIndex = (currentIndex + 1) % dots.length;
    updateTestimonial(currentIndex);
  }

  setInterval(autoSlide, 5000);
});
