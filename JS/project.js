// PROJECT PAGES: the "read more" / "close" panel

function initReadMore() {
  const textBtn = document.querySelector(".text-btn");
  const overview = document.querySelector(".overview");
  if (!textBtn || !overview) return;   // pages without a text panel

  textBtn.setAttribute("aria-expanded", "false");

  textBtn.addEventListener("click", () => {
    const open = overview.classList.toggle("is-open");

    textBtn.textContent = open ? "close" : "read more";
    textBtn.setAttribute("aria-expanded", String(open));
  });
}

initReadMore();

// BEHIND THE SCENES: open and close the pop-up

function initBehindTheScenes() {
  const openBtn = document.querySelector(".bts-btn");
  const dialog = document.querySelector(".bts-dialog");
  if (!openBtn || !dialog || !dialog.showModal) return;   // pages without a pop-up

  openBtn.addEventListener("click", () => dialog.showModal());
  dialog.querySelector(".bts-close").addEventListener("click", () => dialog.close());

  // A click on the dimmed area outside the card closes it too
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
}

initBehindTheScenes();