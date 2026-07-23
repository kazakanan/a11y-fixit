export function setupToggle(buttonId, contentId) {
  const toggleButton = document.getElementById(buttonId);
  const toggledContent = document.getElementById(contentId);

  if (!toggleButton || !toggledContent) return;

  toggledContent.style.display = "none";
  toggleButton.setAttribute("aria-expanded", "false");

  function toggleContent() {
    const isExpanded = toggleButton.getAttribute("aria-expanded") === "true";
    toggleButton.setAttribute("aria-expanded", !isExpanded);
    toggledContent.style.display = isExpanded ? "none" : "block";
    toggledContent.setAttribute("aria-hidden", isExpanded);
  }

  toggleButton.addEventListener("click", toggleContent);
}
