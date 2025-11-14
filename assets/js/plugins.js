/**
 * Initialize optional plugins used throughout the template.
 * Place third-party plugin initializations here.
 */

window.SLP = window.SLP || {};

window.SLP.plugins = {
  initScrollSpy() {
    const sections = document.querySelectorAll("[data-section]");
    const navLinks = document.querySelectorAll("[data-scrollspy]");
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            navLinks.forEach((link) => {
              link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
            });
          }
        });
      },
      { threshold: 0.5 },
    );

    sections.forEach((section) => observer.observe(section));
  },

  initTooltips() {
    document.querySelectorAll("[data-tooltip]").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        const tooltip = document.createElement("div");
        tooltip.className = "tooltip";
        tooltip.textContent = el.getAttribute("data-tooltip");
        document.body.appendChild(tooltip);
        const rect = el.getBoundingClientRect();
        tooltip.style.left = `${rect.left + rect.width / 2}px`;
        tooltip.style.top = `${rect.top - 10}px`;
        setTimeout(() => tooltip.classList.add("is-visible"), 10);

        el.addEventListener(
          "mouseleave",
          () => {
            tooltip.classList.remove("is-visible");
            tooltip.addEventListener("transitionend", () => tooltip.remove(), { once: true });
          },
          { once: true },
        );
      });
    });
  },

  initAll() {
    this.initScrollSpy();
    this.initTooltips();
  },
};

document.addEventListener("DOMContentLoaded", () => {
  window.SLP.plugins.initAll();
});

