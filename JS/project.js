// PROJECT PAGES: the "read more" / "close" panel

function initReadMore() {
  const textBtn = document.querySelector(".text-btn");
  const overview = document.querySelector(".overview");
  const details = document.querySelector(".text-gallery-details");
  const box = document.querySelector(".thumbnail-box");
  if (!textBtn || !overview) return;   // pages without a text panel

  // the details row gets exactly the height of its text, so nothing scrolls or jumps
  const measure = () => {
    if (details) overview.style.setProperty("--details-h", details.getBoundingClientRect().height + "px");
  };

  // keep the same image in view while the gallery changes height
  let index = 0;
  let moving = false;
  let timer;

  if (box) {
    box.addEventListener("scroll", () => {
      if (!moving) index = Math.round(box.scrollTop / box.clientHeight);
    });
    new ResizeObserver(() => {
      if (moving) box.scrollTop = index * box.clientHeight;
    }).observe(box);
  }

  textBtn.setAttribute("aria-expanded", "false");

  textBtn.addEventListener("click", () => {
    if (box) index = Math.round(box.scrollTop / box.clientHeight);
    moving = true;
    overview.classList.add("is-moving");

    const open = overview.classList.toggle("is-open");
    if (open) measure();

    textBtn.textContent = open ? "close" : "read more";
    textBtn.setAttribute("aria-expanded", String(open));

    clearTimeout(timer);
    timer = setTimeout(() => {              // 0.2s delay + 0.4s animation, plus a little spare
      moving = false;
      overview.classList.remove("is-moving");
    }, 700);
  });

  // text wraps differently when the window changes size
  window.addEventListener("resize", () => {
    if (overview.classList.contains("is-open")) measure();
  });
}

initReadMore();

// CAPTION FADE: the bottom of the caption fades while there is more text to scroll to

function initCaptionFade() {
  const caption = document.querySelector(".text-gallery-caption");
  if (!caption) return;   // pages without a caption

  const update = () => {
    const more = caption.scrollHeight - caption.clientHeight - caption.scrollTop > 2;
    caption.classList.toggle("has-more", more);
  };

  caption.addEventListener("scroll", update, { passive: true });
  new ResizeObserver(update).observe(caption);   // runs as the panel opens, closes or resizes
  window.addEventListener("resize", update);
  update();
}

initCaptionFade();

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