export function setupTabs() {
  const tabList = document.getElementById("tablist");
  if (!tabList) return;

  const tabs = Array.from(tabList.getElementsByClassName("tab-btn"));
  if (!tabs.length) return;

  const tabPanels = tabs.map((tab) => {
    const panelId = tab.getAttribute("aria-controls");
    return panelId ? document.getElementById(panelId) : null;
  });

  const getSafeIndex = (index) => {
    if (index < 0) return tabs.length - 1;
    if (index >= tabs.length) return 0;
    return index;
  };

  const activateTab = (nextIndex, shouldFocus = true) => {
    tabs.forEach((tab, index) => {
      const isSelected = index === nextIndex;
      const panel = tabPanels[index];

      tab.setAttribute("aria-selected", String(isSelected));
      tab.setAttribute("tabindex", isSelected ? "0" : "-1");
      tab.classList.toggle("selected", isSelected);

      if (panel) {
        panel.hidden = !isSelected;
        panel.classList.toggle("is-hidden", !isSelected);
      }
    });

    if (shouldFocus) {
      tabs[nextIndex].focus();
    }
  };

  const initialIndex = Math.max(
    0,
    tabs.findIndex((tab) => tab.getAttribute("aria-selected") === "true"),
  );

  activateTab(initialIndex, false);

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      activateTab(index, false);
    });

    tab.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        activateTab(getSafeIndex(index + 1));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        activateTab(getSafeIndex(index - 1));
      } else if (e.key === "Home") {
        e.preventDefault();
        activateTab(0);
      } else if (e.key === "End") {
        e.preventDefault();
        activateTab(tabs.length - 1);
      }
    });
  });
}
