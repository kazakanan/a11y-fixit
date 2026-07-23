import { setupToggle } from "./toggle.js";
import { setupModal } from "./modal.js";
import { radioGroup } from "./radio-grp.js";
import { setupTabs } from "./tabs.js";
import { imageSwap } from "./image-swap.js";

imageSwap();
setupTabs();
setupToggle("toggle-button", "content-to-toggle");
setupModal("modal", "open-modal-button", "close-modal-button");
radioGroup();
