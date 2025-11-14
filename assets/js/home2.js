/**
 * Enhancements for Home Page 2 (SaaS / Digital Agency)
 * - Counters animation
 * - Tabbed feature showcase
 */

document.addEventListener("DOMContentLoaded", () => {
  initCounters();
  initTabs();
});

function initCounters() {
  const counters = document.querySelectorAll("[data-counter]");
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observerInstance.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.35 },
  );

  counters.forEach((counter) => observer.observe(counter));
}

function animateCounter(el) {
  const end = parseInt(el.dataset.counter, 10);
  const duration = parseInt(el.dataset.duration || "1200", 10);
  let start = 0;
  const step = Math.ceil(end / (duration / 16));

  const update = () => {
    start = Math.min(start + step, end);
    const suffix = el.dataset.suffix || "";
    el.textContent = `${start.toLocaleString()}${suffix}`;
    if (start < end) {
      requestAnimationFrame(update);
    }
  };

  requestAnimationFrame(update);
}

function initTabs() {
  const tabButtons = document.querySelectorAll("[data-tab]");
  if (!tabButtons.length) return;

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.tab;
      if (!targetId) return;

      const pane = document.querySelector(`[data-tab-pane="${targetId}"]`);
      if (!pane) return;

      tabButtons.forEach((btn) => btn.classList.toggle("is-active", btn === button));
      document.querySelectorAll("[data-tab-pane]").forEach((tabPane) => {
        tabPane.classList.toggle("is-active", tabPane === pane);
      });
    });
  });
}

