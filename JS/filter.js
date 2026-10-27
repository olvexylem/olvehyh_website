// FILTER: open / close the menu, filter the cards, show the counts
// Needs the cards to exist, so renderProjects() must run first (see main.js).

function initFilter() {
  const toggle = document.querySelector(".filter-toggle");
  const menu = document.querySelector(".filter-menu");
  const cards = Array.from(document.querySelectorAll(".project"));
  if (!menu) return;

  const matches = (card, filter) =>
    filter === "show-all" || card.classList.contains(filter);

  // Open / close (and tell screen readers which state it is in)
  if (toggle) {
    menu.id = menu.id || "filter-menu";
    toggle.setAttribute("aria-controls", menu.id);
    toggle.setAttribute("aria-expanded", "false");

    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("active");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  // Filter (one listener on the menu, instead of one per radio button)
  function applyFilter() {
    const checked = menu.querySelector('input[name="filter"]:checked');
    const selected = checked ? checked.value : "show-all";

    cards.forEach(card => {
      card.style.display = matches(card, selected) ? "" : "none";
    });
  }

  menu.addEventListener("change", (event) => {
    if (event.target.name === "filter") applyFilter();
  });

  applyFilter();   // browsers restore the checked radio on refresh / back, so sync once now

  // Counts next to each option
  menu.querySelectorAll(".filter-option").forEach(option => {
    const input = option.querySelector('input[name="filter"]');
    const count = option.querySelector(".category-count");
    if (!input || !count) return;

    count.textContent = cards.filter(card => matches(card, input.value)).length;
  });
}


// FILTER ALIGNMENT: keep the filter button exactly one "circle" to the right of the menu button.
//
// One circle = the menu button's height (on phones it is a round button, on laptops a pill
// of about the same height). The menu button's width changes with the screen (a round icon
// or the word "Menu"), so instead of guessing, we measure it and feed the result to
// --filter-indent. The filter button, the filter list and the text-view rows all use it.

function initFilterAlignment() {
  const menuBtn = document.querySelector(".menu-btn");
  const workCat = document.querySelector(".work-cat");
  if (!menuBtn || !workCat) return;

  function align() {
    // "Close" is wider than "Menu", so only measure while the menu is closed
    if (menuBtn.getAttribute("aria-expanded") === "true") return;

    const menu = menuBtn.getBoundingClientRect();
    const workLeft = workCat.getBoundingClientRect().left;
    const indent = menu.right + menu.height - workLeft;

    const root = document.documentElement;
    root.style.setProperty("--filter-indent", `${Math.round(indent)}px`);
    root.style.setProperty("--menu-edge", `${Math.round(menu.left - workLeft)}px`);   // used by the hover arrow
  }

  align();
  window.addEventListener("resize", align);
  document.fonts?.ready.then(align);   // the word's width changes once the font has loaded
}