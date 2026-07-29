export function radioGroup() {
  document.querySelectorAll(".radio-group").forEach((group) => {
    const options = Array.from(group.querySelectorAll(".radio-option"));
    if (!options.length) return;

    const setChecked = (nextIndex, shouldFocus = false) => {
      options.forEach((option, index) => {
        const isChecked = index === nextIndex;
        option.setAttribute("aria-checked", isChecked ? "true" : "false");
        option.tabIndex = isChecked ? 0 : -1;
      });

      if (shouldFocus) {
        options[nextIndex].focus();
      }
    };

    const checkedIndex = options.findIndex(
      (option) => option.getAttribute("aria-checked") === "true",
    );
    const initialIndex = checkedIndex >= 0 ? checkedIndex : 0;
    setChecked(initialIndex);

    group.addEventListener("click", (e) => {
      const option = e.target.closest(".radio-option");
      if (!option || !group.contains(option)) return;

      const nextIndex = options.indexOf(option);
      if (nextIndex >= 0) {
        setChecked(nextIndex, true);
      }
    });

    options.forEach((option) => {
      option.addEventListener("keydown", (e) => {
        const currentIndex = options.indexOf(option);

        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          e.preventDefault();
          const nextIndex = (currentIndex + 1) % options.length;
          setChecked(nextIndex, true);
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          e.preventDefault();
          const prevIndex =
            (currentIndex - 1 + options.length) % options.length;
          setChecked(prevIndex, true);
        } else if (e.key === " " || e.key === "Spacebar") {
          e.preventDefault();
          if (option.getAttribute("aria-checked") !== "true") {
            setChecked(currentIndex, true);
          }
        }
      });
    });
  });
}
