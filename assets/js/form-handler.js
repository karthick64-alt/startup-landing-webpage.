/**
 * Generic AJAX form handler for contact/newsletter forms.
 * Replace `FORM_ENDPOINT` with an actual integration (e.g., Formspree, custom API).
 */

const FORM_ENDPOINT = "https://example.com/api/forms"; // Placeholder

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("form[data-ajax]").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const submitButton = form.querySelector("[type=submit]");
      const status = form.querySelector("[data-form-status]");
      const formData = new FormData(form);

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.dataset.originalText = submitButton.textContent;
        submitButton.textContent = "Sending...";
      }

      if (status) {
        status.textContent = "";
        status.className = "form-status";
      }

      try {
        const response = await fetch(FORM_ENDPOINT, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        if (status) {
          status.textContent = "Thanks! We will be in touch soon.";
          status.classList.add("is-success");
        }
        form.reset();
      } catch (error) {
        console.error(error);
        if (status) {
          status.textContent = "Something went wrong. Please try again.";
          status.classList.add("is-error");
        }
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = submitButton.dataset.originalText || "Submit";
        }
      }
    });
  });
});

