export function radioGroup() {
  document.querySelectorAll(".radio-group").forEach((group) => {
    const options = Array.from(group.querySelectorAll(".radio-option"));

    group.addEventListener("click", (e) => {
      const option = e.target.closest(".radio-option");
      if (!option || !group.contains(option)) return;

      options.forEach((o) => {
        const isSelected = o === option;
        o.setAttribute("aria-checked", isSelected ? "true" : "false");
        o.classList.toggle("selected", isSelected);
        o.tabIndex = isSelected ? 0 : -1;
      });

      option.focus();
    });

    options.forEach((option) => {
      option.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          e.preventDefault();
          const currentIndex = options.indexOf(option);
          const nextIndex = (currentIndex + 1) % options.length;
          const nextOption = options[nextIndex];

          options.forEach((o) => {
            const isSelected = o === nextOption;
            o.setAttribute("aria-checked", isSelected ? "true" : "false");
            o.classList.toggle("selected", isSelected);
            o.tabIndex = isSelected ? 0 : -1;
          });

          nextOption.focus();
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          e.preventDefault();
          const currentIndex = options.indexOf(option);
          const prevIndex = (currentIndex - 1 + options.length) % options.length;
          const prevOption = options[prevIndex];

          options.forEach((o) => {
            const isSelected = o === prevOption;
            o.setAttribute("aria-checked", isSelected ? "true" : "false");
            o.classList.toggle("selected", isSelected);
            o.tabIndex = isSelected ? 0 : -1;
          });

          prevOption.focus();
        }
      });
    });
  });
}