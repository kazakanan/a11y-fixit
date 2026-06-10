export function radioGroup() {
  document.querySelectorAll(".radio-group").forEach((group) => {
    group.addEventListener("click", (e) => {
      const option = e.target.closest(".radio-option");
      if (!option || !group.contains(option)) return;

      group
        .querySelectorAll(".radio-option")
        .forEach((o) => o.classList.toggle("selected", o === option));
    });
  });
}
