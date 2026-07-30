## WCAG 2.2 AA Issues Found

1. Image alt text / non-text content
   - Header images use identical `alt="A11y summer camp header image"` and likely should be decorative or more specific.
   - The `figure` image has no `alt` attribute.
   - The radio option images have no `alt` attributes.
2. Interactive component accessibility
   - The modal lacks proper dialog semantics:
     - No `role="dialog"`
     - No `aria-modal="true"`
     - No accessible name via `aria-labelledby` or `aria-label`
     - Not hidden by default
   - The disclosure panel may be visible by default and relies on JS state without a proper hidden mechanism.
3. Invalid / malformed HTML
   - Extra quote marks in the `div` elements for radio options (`class="radio-option selected""` and others).
   - `div` elements are being used as interactive radio options, which are not keyboard accessible or semantic.
4. Landmark and structure issues
   - `header`, `main`, `aside`, and `footer` exist, but the `main` content does not have an ARIA landmark outside the obvious tag; exercise task asks for ARIA landmarks.
   - The sidebar is unlabeled beyond its heading.
5. Placeholder links
   - Links with `href="#"` are not valid accessible destinations and can cause keyboard focus issues.

## Plan: Complete WCAG 2.2 AA Remediation for A11y Fix-It HTML

TL;DR: Update `/Users/terishelton/Local/static-sites/app/public/a11y-fixit/fixed/index.html` to meet WCAG 2.2 AA by fixing image alt text, ARIA dialog and radio group semantics, disclosure hidden state, invalid HTML, and placeholder link semantics. Include exact replacement markup for the modal and radio group plus JavaScript behavior patterns.

**Steps**

1. Fix image alt text.
   - Set header images that are purely decorative to `alt=""`.
   - Add an explicit `alt` to the `figure` image in the sidebar.
   - Add `alt` to each radio option image: `Noodles`, `Fries`, `Burger`.
2. Fix markup and HTML validity.
   - Remove malformed extra quotes from the radio option `class` attributes.
   - Confirm all tags are properly closed and nested.
   - Use semantic landmark structure with `header`, `main`, `aside`, and `footer`.
3. Fix the disclosure section.
   - Hide `#content-to-toggle` initially with `hidden` or `aria-hidden="true"`.
   - Keep `aria-controls="content-to-toggle"` on the button.
   - Ensure `aria-expanded` is toggled correctly when the panel opens/closes.
4. Replace the modal with an ARIA dialog.
   - Use the exact markup:
     - `<div id="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" hidden>`
     - `<h2 id="modal-title">Hints</h2>`
     - `<p>Here are some hints to help you complete the exercises.</p>`
     - `<button id="close-modal-button" type="button">Close</button>`
     - `</div>`
   - Ensure the open button toggles the dialog and manages focus.
5. Replace the custom radio options with an ARIA radio group.
   - Use this exact markup:
     - `<div class="radio-group" role="radiogroup" aria-labelledby="radio-group-label">`
     - `<div id="radio-group-label" class="sr-only">Food choice</div>`
     - `<div id="option-a" role="radio" tabindex="0" aria-checked="true" data-value="a" class="radio-option selected">` + image + label
     - `<div id="option-b" role="radio" tabindex="-1" aria-checked="false" data-value="b" class="radio-option">` + image + label
     - `<div id="option-c" role="radio" tabindex="-1" aria-checked="false" data-value="c" class="radio-option">` + image + label
     - `</div>`
   - Ensure one selected option has `tabindex="0"`; all others use `tabindex="-1"`.
6. Fix placeholder link semantics.
   - Replace `href="#"` placeholders with valid URLs if they are navigation links.
   - If the links simulate actions, convert them to buttons or give them a purposefully descriptive link text.
7. Implement matching JavaScript behavior.
   - Modal script:
     - Query `#open-modal-button`, `#modal`, `#close-modal-button`.
     - `openModal()` removes `hidden`, sets `aria-expanded="true"`, focuses close button.
     - `closeModal()` re-adds `hidden`, sets `aria-expanded="false"`, returns focus to the open button.
     - Add Escape key handling inside the modal to close it.
   - Radio group script:
     - Query the radiogroup and its `[role="radio"]` options.
     - Enforce one option as selected with `aria-checked="true"` and `tabindex="0"`; others `aria-checked="false"` and `tabindex="-1"`.
     - On click or key activation, call `selectOption()` to update `aria-checked`, `tabindex`, focus, and visual state.
     - Handle ArrowLeft/ArrowUp for previous option, ArrowRight/ArrowDown for next option, and Space/Enter to activate.
8. Validate and test.
   - Run HTML validation on `a11y-fixit/fixed/index.html`.
   - Test the accessibility tree to confirm the modal is announced as a dialog.
   - Verify the disclosure panel toggles with `aria-expanded` and hidden state.
   - Confirm radio group keyboard navigation works and `aria-checked` updates.
   - Check all images have appropriate `alt` text and links have valid semantics.

**Exact replacement markup**

- Modal:
  - `<div id="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" hidden>`
  - `<h2 id="modal-title">Hints</h2>`
  - `<p>Here are some hints to help you complete the exercises.</p>`
  - `<button id="close-modal-button" type="button">Close</button>`
  - `</div>`
- Radio group:
  - `<div class="radio-group" role="radiogroup" aria-labelledby="radio-group-label">`
  - `<div id="radio-group-label" class="sr-only">Food choice</div>`
  - `<div id="option-a" role="radio" tabindex="0" aria-checked="true" data-value="a" class="radio-option selected">`
  - `<img src="./images/noodles.png" alt="Noodles">Option A</div>`
  - `<div id="option-b" role="radio" tabindex="-1" aria-checked="false" data-value="b" class="radio-option">`
  - `<img src="./images/fries.png" alt="Fries">Option B</div>`
  - `<div id="option-c" role="radio" tabindex="-1" aria-checked="false" data-value="c" class="radio-option">`
  - `<img src="./images/burger.png" alt="Burger">Option C</div>`
  - `</div>`

**JavaScript behavior outline**

- Modal behavior:
  - Open button toggles `hidden` on the modal and updates `aria-expanded`.
  - Modal close button hides the modal and returns focus.
  - Escape closes the modal.
  - Focus moves into the dialog when opened and returns to the trigger when closed.
- Radio group behavior:
  - Only the selected option has `tabindex="0"`; others have `tabindex="-1"`.
  - Click or Space/Enter activates an option.
  - Arrow keys move between options and update selection.
  - Visual selected styling stays synced with `aria-checked`.

**Estimated time**

- HTML markup updates: 15–25 minutes.
- JavaScript implementation: 10–20 minutes.
- Verification and testing: 5–10 minutes.
- Total estimate: 30–55 minutes.

**Relevant files**

- `/Users/terishelton/Local/static-sites/app/public/a11y-fixit/fixed/index.html`
- `styles.css` and `scripts/main.js`

**Verification**

1. Validate the updated HTML output.
2. Confirm the modal is hidden until opened and announces as a dialog.
3. Confirm the disclosure toggles hidden state and `aria-expanded` correctly.
4. Confirm the radio group supports arrow key navigation, Space/Enter activation, and correct `aria-checked` state.
5. Confirm no missing `alt` text and valid link semantics.

**Assumptions**

- ARIA patterns are preferred over native HTML controls for the modal and radio group.
- The task is limited to the HTML file and supporting JS behavior, not extensive CSS redesign.
