import { setupToggle } from "./toggle.js";
import { setupModal } from "./modal.js";
import { radioGroup } from "./radio-grp.js";

setupToggle("toggle-button", "content-to-toggle");
setupModal("modal", "open-modal-button", "close-modal-button");
radioGroup();
