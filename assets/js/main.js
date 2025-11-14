/**
 * Main JavaScript for Startup Landing Page.
 * Handles:
 *  - Loading HTML partials
 *  - Navigation interactions
 *  - Dark mode toggle
 *  - Scroll animations
 */

(function () {
  const SELECTORS = {
    include: "[data-include]",
    navToggle: "[data-nav-toggle]",
    navMenu: "[data-nav-menu]",
    darkModeToggle: "[data-dark-toggle]",
    animateOnScroll: "[data-animate]",
  };

  document.addEventListener("DOMContentLoaded", () => {
    loadPartials().finally(() => {
      initNavigation();
      initDarkMode();
      activateCurrentNav();
      initModalTriggers();
      updateFooterYear();
      hidePreloader();
      initAnimations();
    });
  });

  /**
   * Dynamically loads HTML partials into elements with `data-include="/partials/..."`
   */
  async function loadPartials() {
    const includeTargets = document.querySelectorAll(SELECTORS.include);
    if (!includeTargets.length) return;

    await Promise.all(
      Array.from(includeTargets).map(async (el) => {
        const src = el.getAttribute("data-include");
        if (!src) return;
        try {
          const response = await fetch(src);
          if (!response.ok) throw new Error(`Failed to load ${src}`);
          const html = await response.text();
          el.innerHTML = html;
        } catch (error) {
          el.innerHTML = `<div class="alert">Could not load include: ${src}</div>`;
          console.error(error);
        }
      }),
    );
  }

  /**
   * Handles mobile navigation toggle
   */
  function initNavigation() {
    const toggle = document.querySelector(SELECTORS.navToggle);
    const menu = document.querySelector(SELECTORS.navMenu);
    if (!toggle || !menu) return;

    toggle.addEventListener("click", () => {
      const isOpen = menu.getAttribute("data-open") === "true";
      menu.setAttribute("data-open", String(!isOpen));
      toggle.setAttribute("aria-expanded", String(!isOpen));
    });
  }

  /**
   * Highlights current page in the navigation menu
   */
  function activateCurrentNav() {
    const menu = document.querySelector(SELECTORS.navMenu);
    if (!menu) return;

    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const activeLink = menu.querySelector(`a[href$="${currentPath}"]`);
    if (activeLink) {
      activeLink.classList.add("is-active");
    }
  }

  /**
   * Enables dark mode toggling and persists preference
   */
  function initDarkMode() {
    const toggle = document.querySelector(SELECTORS.darkModeToggle);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const storedPreference = localStorage.getItem("slp:dark-mode");
    const body = document.body;

    let isDark = storedPreference === "true" || (!storedPreference && prefersDark);
    body.classList.toggle("dark-mode", isDark);

    if (toggle) {
      toggle.checked = isDark;
      toggle.addEventListener("change", (event) => {
        isDark = event.target.checked;
        body.classList.toggle("dark-mode", isDark);
        localStorage.setItem("slp:dark-mode", String(isDark));
      });
    }
  }

  /**
   * Applies animation classes when elements enter viewport
   */
  function initAnimations() {
    const animatedElements = document.querySelectorAll(SELECTORS.animateOnScroll);
    if (!animatedElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const animation = entry.target.getAttribute("data-animate") || "fade-up";
            entry.target.classList.add(animation);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    animatedElements.forEach((el) => observer.observe(el));
  }

  /**
   * Initializes modal open/close handlers
   */
  function initModalTriggers() {
    const triggers = document.querySelectorAll("[data-modal-open]");
    const modals = document.querySelectorAll(".modal");
    if (!triggers.length || !modals.length) return;

    triggers.forEach((trigger) => {
      trigger.addEventListener("click", (event) => {
        event.preventDefault();
        const modalId = trigger.getAttribute("data-modal-open");
        const modal = document.getElementById(modalId);
        if (modal) {
          modal.classList.add("is-active");
        }
      });
    });

    modals.forEach((modal) => {
      modal.querySelectorAll("[data-modal-close]").forEach((closeBtn) => {
        closeBtn.addEventListener("click", () => {
          modal.classList.remove("is-active");
        });
      });
    });

    document.addEventListener("keyup", (event) => {
      if (event.key === "Escape") {
        modals.forEach((modal) => modal.classList.remove("is-active"));
      }
    });
  }

  /**
   * Hide preloader once partials and initial scripts are ready
   */
  function hidePreloader() {
    const preloader = document.querySelector("[data-preloader]");
    if (!preloader) return;
    requestAnimationFrame(() => {
      preloader.classList.add("is-hidden");

      const cleanup = () => {
        preloader.hidden = true;
        const wrapper = preloader.closest("[data-include]");
        if (wrapper) {
          wrapper.remove();
        } else {
          preloader.remove();
        }
      };

      preloader.addEventListener("transitionend", cleanup, { once: true });
      setTimeout(cleanup, 450);
    });
  }

  /**
   * Updates footer copyright year after footer partial loads
   */
  function updateFooterYear() {
    const yearTarget = document.getElementById("current-year");
    if (!yearTarget) return;
    yearTarget.textContent = new Date().getFullYear();
  }
})();

