/*!
 * Placeholder for Bootstrap Bundle JS.
 * The production build should replace this file with the official distribution,
 * e.g. https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js
 *
 * The placeholder implements the minimal collapse toggle used by the navigation.
 */

(function () {
  "use strict";

  const dataToggleAttr = "data-bs-toggle";
  const dataTargetAttr = "data-bs-target";

  document.addEventListener("click", (event) => {
    const toggle = event.target.closest(`[${dataToggleAttr}="collapse"]`);
    if (!toggle) return;

    const selector = toggle.getAttribute(dataTargetAttr);
    if (!selector) return;

    const target = document.querySelector(selector);
    if (!target) return;

    event.preventDefault();
    const isShown = target.classList.contains("show");
    target.classList.toggle("show", !isShown);
    toggle.setAttribute("aria-expanded", String(!isShown));
  });
})();

