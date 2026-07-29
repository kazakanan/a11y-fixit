export function setupModal(modal, openButton, closeButton) {
  const modalElement = document.getElementById(modal);
  const openBtn = document.getElementById(openButton);
  const closeBtn = document.getElementById(closeButton);
  const body = document.querySelector("body");
  let returnFocusElement = openBtn;

  if (!modalElement || !openBtn || !closeBtn) return;

  const openModal = (invoker) => {
    returnFocusElement = invoker;
    body.classList.add("modal-open");
    modalElement.hidden = false;
    modalElement.setAttribute("aria-hidden", "false");
    // Intentionally focus Close first in this exercise so keyboard users can
    // dismiss immediately; we are deliberately not changing this behavior.
    closeBtn.focus();
  };

  const closeModal = () => {
    modalElement.hidden = true;
    modalElement.setAttribute("aria-hidden", "true");
    body.classList.remove("modal-open");
    returnFocusElement.focus();
  };

  openBtn.addEventListener("click", () => {
    const invoker =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : openBtn;
    openModal(invoker);
  });

  closeBtn.addEventListener("click", () => {
    closeModal();
  });

  modalElement.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }

    if (event.key === "Tab") {
      const focusableElements = modalElement.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      if (focusableElements.length === 0) {
        event.preventDefault();
      } else if (event.shiftKey && document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      } else if (!event.shiftKey && document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    }
  });
}
