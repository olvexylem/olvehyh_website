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