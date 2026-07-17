export function setupModal(modal, openButton, closeButton) {
  const modalElement = document.getElementById(modal);
  const openBtn = document.getElementById(openButton);
  const closeBtn = document.getElementById(closeButton);
  const body = document.querySelector('body');

  if (!modalElement || !openBtn || !closeBtn) return;
  openBtn.addEventListener("click", () => {
    body.classList.add('modal-open'); // bonus
    modalElement.style.display = "block";
    modalElement.setAttribute("aria-hidden", "false");
    closeBtn.focus();
  });

  closeBtn.addEventListener("click", () => {
    modalElement.style.display = "none";
    modalElement.setAttribute("aria-hidden", "true");
    body.classList.remove('modal-open'); // bonus
    openBtn.focus();
  });

  modalElement.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      modalElement.style.display = "none";
      modalElement.setAttribute("aria-hidden", "true");
      body.classList.remove('modal-open'); // bonus
      openBtn.focus();
    }

    if (event.key === 'Tab') {
      const focusableElements = modalElement.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');
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
