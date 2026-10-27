// MENU: open / close the full-screen overlay

function initMenu() {
  const button = document.querySelector(".menu-btn");
  const overlay = document.querySelector(".menu-overlay");
  if (!button || !overlay) return;

  // The word inside the button (hidden on small screens, where a plus icon replaces it)
  const label = button.querySelector(".menu-label") || button;

  // Link the button to the overlay for screen readers
  overlay.id = overlay.id || "menu-overlay";
  button.setAttribute("aria-controls", overlay.id);

  // The one place that knows what "open" and "closed" look like
  function setOpen(open) {
    overlay.classList.toggle("hidden", !open);
    label.textContent = open ? "Close" : "Menu";
    button.setAttribute("aria-expanded", String(open));
  }

  const isOpen = () => !overlay.classList.contains("hidden");

  button.addEventListener("click", () => setOpen(!isOpen()));

  // Clicking any link inside the overlay closes it
  overlay.addEventListener("click", (event) => {
    if (event.target.closest("a")) setOpen(false);
  });

  // Escape closes it and returns focus to the button
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isOpen()) {
      setOpen(false);
      button.focus();
    }
  });

  setOpen(isOpen()); // sync the label and aria-expanded with the HTML's starting state
}