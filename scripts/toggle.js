export function setupToggle(buttonId, contentId) {
  const toggleButton = document.getElementById(buttonId);
  const toggledContent = document.getElementById(contentId);

  if (!toggleButton || !toggledContent) return;

  toggledContent.style.display = "none";

  function toggleContent() {
    toggledContent.style.display =
      toggledContent.style.display === "none" ? "block" : "none";
  }

  toggleButton.addEventListener("click", toggleContent);
}
