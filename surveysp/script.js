// Smooth scrolling for nav links and back-to-top
const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
const backToTopLink = document.querySelector('.back-to-top');

function smoothScrollTo(targetId) {
  const target = document.querySelector(targetId);
  if (!target) return;

  target.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const hash = link.getAttribute("href");
    if (!hash || !hash.startsWith("#")) return;
    e.preventDefault();
    smoothScrollTo(hash);
  });
});

if (backToTopLink) {
  backToTopLink.addEventListener("click", (e) => {
    const hash = backToTopLink.getAttribute("href");
    if (!hash || !hash.startsWith("#")) return;
    e.preventDefault();
    smoothScrollTo(hash);
  });
}

// Sticky header scroll state
const header = document.querySelector(".site-header");
const heroSection = document.querySelector("#hero");

function updateHeaderState() {
  if (!header || !heroSection) return;

  const threshold = heroSection.offsetHeight * 0.35;
  if (window.scrollY > threshold) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", () => {
  updateHeaderState();
});

updateHeaderState();

// Active nav link based on section in view
const sections = document.querySelectorAll("section[id]");
const sectionById = {};
sections.forEach((sec) => {
  sectionById[sec.id] = sec;
});

const observerOptions = {
  root: null,
  rootMargin: "0px 0px -50% 0px",
  threshold: 0.2,
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    navLinks.forEach((link) => {
      if (link.getAttribute("href") === `#${id}`) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  });
}, observerOptions);

sections.forEach((section) => sectionObserver.observe(section));

// Scroll-triggered animations for elements with data-animate
const animatedEls = document.querySelectorAll("[data-animate]");

if (animatedEls.length > 0) {
  const animateObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: 0.15,
    }
  );

  animatedEls.forEach((el) => animateObserver.observe(el));
}

// Mobile navigation toggle
const navToggle = document.querySelector(".nav-toggle");
const navList = document.querySelector(".nav-list");

if (navToggle && navList) {
  navToggle.addEventListener("click", () => {
    const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isExpanded));
    navList.classList.toggle("open");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navList.classList.contains("open")) {
        navList.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  });
}

// Lightbox gallery
const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxCaption = document.querySelector(".lightbox-caption");
const lightboxClose = document.querySelector(".lightbox-close");
const lightboxPrev = document.querySelector(".lightbox-prev");
const lightboxNext = document.querySelector(".lightbox-next");

let currentIndex = -1;

const galleryData = Array.from(galleryItems).map((item) => ({
  trigger: item,
  image: item.getAttribute("data-image"),
  caption: item.getAttribute("data-caption") || "",
}));

function openLightbox(index) {
  if (!lightbox || !lightboxImage || index < 0 || index >= galleryData.length) {
    return;
  }
  currentIndex = index;
  const { image, caption } = galleryData[index];
  lightboxImage.src = image;
  lightboxImage.alt = caption;
  if (lightboxCaption) {
    lightboxCaption.textContent = caption;
  }
  lightbox.classList.add("active");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove("active");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function showNext(delta) {
  if (currentIndex === -1 || galleryData.length === 0) return;
  const total = galleryData.length;
  const nextIndex = (currentIndex + delta + total) % total;
  openLightbox(nextIndex);
}

galleryData.forEach((item, index) => {
  item.trigger.addEventListener("click", () => {
    openLightbox(index);
  });
});

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

if (lightboxPrev) {
  lightboxPrev.addEventListener("click", () => showNext(-1));
}

if (lightboxNext) {
  lightboxNext.addEventListener("click", () => showNext(1));
}

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox || event.target.classList.contains("lightbox-backdrop")) {
      closeLightbox();
    }
  });
}

window.addEventListener("keydown", (event) => {
  if (!lightbox || !lightbox.classList.contains("active")) return;
  if (event.key === "Escape") {
    closeLightbox();
  }
  if (event.key === "ArrowRight") {
    showNext(1);
  }
  if (event.key === "ArrowLeft") {
    showNext(-1);
  }
});

// Theme toggle with persistence
const themeToggle = document.querySelector(".theme-toggle");
const THEME_KEY = "portfolio-theme";

function applyTheme(theme) {
  const isDark = theme === "dark";
  document.body.classList.toggle("dark-theme", isDark);
}

function getPreferredTheme() {
  const stored = window.localStorage.getItem(THEME_KEY);
  if (stored === "dark" || stored === "light") return stored;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

let currentTheme = getPreferredTheme();
applyTheme(currentTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    currentTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(currentTheme);
    window.localStorage.setItem(THEME_KEY, currentTheme);
  });
}

// Dynamic footer year
const yearEl = document.querySelector("#year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear().toString();
}

