export function setupModal(modal, openButton, closeButton) {
  const modalElement = document.getElementById(modal);
  const openBtn = document.getElementById(openButton);
  const closeBtn = document.getElementById(closeButton);

  if (!modalElement || !openBtn || !closeBtn) return;
  openBtn.addEventListener("click", () => {
    modalElement.style.display = "block";
  });

  closeBtn.addEventListener("click", () => {
    modalElement.style.display = "none";
  });
}
