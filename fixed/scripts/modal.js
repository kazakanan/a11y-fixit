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
    if (event.key !== 'Escape' && event.key !== 'Tab') return;
    if (event.key === 'Escape') {
      modalElement.style.display = "none";
      modalElement.setAttribute("aria-hidden", "true");
      body.classList.remove('modal-open'); // bonus
      openBtn.focus();
    }
   // bonus: trap focus inside modal
    if (event.key === 'Tab') {
      event.preventDefault();
      closeBtn.focus();
    }
  });
}
