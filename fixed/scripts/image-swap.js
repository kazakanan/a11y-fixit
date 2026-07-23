export function imageSwap() {
  const imageStates = [
    {
      option: document.getElementById("a"),
      defaultSrc: "../images/noodles-black.png",
      activeSrc: "../images/noodles-white.png",
    },
    {
      option: document.getElementById("b"),
      defaultSrc: "../images/fries.png",
      activeSrc: "../images/fries-white.png",
    },
    {
      option: document.getElementById("c"),
      defaultSrc: "../images/burger.png",
      activeSrc: "../images/burger-white.png",
    },
  ];

  imageStates.forEach(({ defaultSrc, activeSrc }) => {
    const preloadDefaultImage = new Image();
    preloadDefaultImage.src = defaultSrc;

    const preloadActiveImage = new Image();
    preloadActiveImage.src = activeSrc;
  });

  let activeHoverId = null;

  const syncImages = () => {
    imageStates.forEach(({ option, defaultSrc, activeSrc }) => {
      if (!option) return;

      const isSelected = option.classList.contains("selected") || option.getAttribute("aria-checked") === "true";
      const isHovered = activeHoverId === option.id;
      const isActive = isSelected || isHovered;

      option.classList.toggle("is-active", isActive);

      const image = option.querySelector("img");
      if (image) {
        image.src = isActive ? activeSrc : defaultSrc;
      }
    });
  };

  imageStates.forEach(({ option }) => {
    if (!option) return;

    const activateOption = () => {
      activeHoverId = option.id;
      syncImages();
    };

    const deactivateOption = () => {
      activeHoverId = null;
      syncImages();
    };

    option.addEventListener("mouseover", activateOption);
    option.addEventListener("mouseout", deactivateOption);
    option.addEventListener("pointerenter", activateOption);
    option.addEventListener("pointerleave", deactivateOption);
    option.addEventListener("focusin", activateOption);
    option.addEventListener("focusout", deactivateOption);
    option.addEventListener("click", () => {
      activeHoverId = option.id;
      syncImages();
    });

    option.addEventListener("keydown", (event) => {
      if (["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Enter", " "].includes(event.key)) {
        queueMicrotask(syncImages);
      }
    });
  });

  syncImages();
}