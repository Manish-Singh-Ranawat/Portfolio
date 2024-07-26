// menu
let menuBtn = document.querySelector("#menu-btn");
let nav = document.querySelector("nav");
let navLinks = document.querySelectorAll(".nav-link");
console.log(navLinks);

menuBtn.addEventListener("click", () => {
  if (menuBtn.classList.contains("fa-bars")) {
    menuBtn.classList.remove("fa-bars");
    menuBtn.classList.add("fa-xmark");
    nav.style.right = "0";
    navLinks.forEach((navItem) => {
      navItem.addEventListener("click", () => {
        setTimeout(() => {
          nav.style.right = "-50rem";
          menuBtn.classList.add("fa-bars");
          menuBtn.classList.remove("fa-xmark");
        }, 250);
      });
    });
  } else {
    menuBtn.classList.add("fa-bars");
    menuBtn.classList.remove("fa-xmark");
    nav.style.right = "-50rem";
  }
});

// animation
const animatedElements = document.querySelectorAll(".animate-on-scroll");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (
        entry.isIntersecting &&
        !entry.target.classList.contains("has-animated")
      ) {
        const animation = entry.target.dataset.animation;
        entry.target.classList.add(
          "animate__animated",
          `animate__${animation}`,
          "has-animated"
        );
      }
    });
  },
  { threshold: 0.5 }
);

animatedElements.forEach((el) => observer.observe(el));

// carousel
document.addEventListener("DOMContentLoaded", function () {
  const projectSection = document.querySelector("#projects");
  const projectItems = projectSection.querySelectorAll(".project-item");

  projectItems.forEach((projectItem) => {
    const carouselContainer = projectItem.querySelector(".carousel-container");
    if (!carouselContainer) return; // Skip if this project doesn't have a carousel

    const carousel = carouselContainer.querySelector(".carousel");
    const images = carousel.querySelectorAll("img");
    const prevButton = carouselContainer.querySelector(".prev");
    const nextButton = carouselContainer.querySelector(".next");
    const indicators = carouselContainer.querySelector(".carousel-indicators");

    let currentIndex = 0;
    let intervalId = null;

    // Create indicators
    images.forEach((_, index) => {
      const indicator = document.createElement("div");
      indicator.classList.add("indicator");
      if (index === 0) indicator.classList.add("active");
      indicator.addEventListener("click", () => goToSlide(index));
      indicators.appendChild(indicator);
    });

    function updateCarousel() {
      images.forEach((img, index) => {
        img.classList.toggle("active", index === currentIndex);
      });

      const indicatorElements = indicators.querySelectorAll(".indicator");
      indicatorElements.forEach((indicator, index) => {
        indicator.classList.toggle("active", index === currentIndex);
      });
    }

    function goToSlide(index) {
      currentIndex = index;
      updateCarousel();
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % images.length;
      updateCarousel();
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateCarousel();
    }

    nextButton.addEventListener("click", nextSlide);
    prevButton.addEventListener("click", prevSlide);

    // Create an Intersection Observer
    const projectObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Start the interval
            if (!intervalId) {
              intervalId = setInterval(nextSlide, 5000);
            }
          } else {
            // Clear the interval
            if (intervalId) {
              clearInterval(intervalId);
              intervalId = null;
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observe this project item
    projectObserver.observe(projectItem);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const projectItems = document.querySelectorAll(".project-item");

  projectItems.forEach((item) => {
    const descriptionContainer = item.querySelector(".project-description");
    const shortDescription =
      descriptionContainer.querySelector(".short-description");
    const fullDescription =
      descriptionContainer.querySelector(".full-description");
    const readMoreBtn = item.querySelector(".read-more-btn");

    // Function to truncate text to 3 lines
    function truncateText(element, lines) {
      const lineHeight = parseInt(window.getComputedStyle(element).lineHeight);
      element.style.maxHeight = `${lineHeight * lines}px`;
      element.style.overflow = "hidden";
    }

    // Initially truncate the short description
    truncateText(shortDescription, 3);

    readMoreBtn.addEventListener("click", function () {
      if (fullDescription.style.display === "none") {
        fullDescription.style.display = "inline";
        shortDescription.style.maxHeight = "none";
        shortDescription.style.overflow = "visible";
        this.textContent = "Read Less";
      } else {
        fullDescription.style.display = "none";
        truncateText(shortDescription, 3);
        this.textContent = "Read More";
      }
    });
  });
});
