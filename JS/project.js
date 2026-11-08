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

// EXPAND BUTTON: lifts the caption (and its line) over the gallery, and brings the gallery back

function initReadingMode() {
  const overview = document.querySelector(".overview");
  const caption = document.querySelector(".text-gallery-caption");
  const gallery = document.querySelector(".thumbnail-gallery");
  const textBtn = document.querySelector(".text-btn");
  if (!overview || !caption || !gallery) return;

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "expand-btn";
  btn.setAttribute("aria-label", "Expand");
  btn.innerHTML = '<svg viewBox="0 0 14 8" aria-hidden="true"><polyline points="1,7 7,1 13,7" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="square" vector-effect="non-scaling-stroke"/></svg>';
  overview.appendChild(btn);

  let lift = 0;     // 0 = normal, 1 = fully risen
  let frame;

  const set = (value) => {
    lift = value;
    overview.style.setProperty("--lift", value);
  };

  const reset = () => {
    cancelAnimationFrame(frame);
    lift = 0;
    overview.classList.remove("is-reading", "is-expanded");
    overview.style.removeProperty("--lift");
    overview.style.removeProperty("--gallery-h");
    btn.setAttribute("aria-label", "Expand");
  };

  const animateTo = (target) => {
    cancelAnimationFrame(frame);
    const from = lift;
    const start = performance.now();
    const duration = 450;

    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;   // ease in and out
      set(from + (target - from) * eased);
      if (t < 1) frame = requestAnimationFrame(step);
      else if (target === 0) reset();                                        // fully back: return to the normal layout
    };
    frame = requestAnimationFrame(step);
  };

  btn.addEventListener("click", () => {
    if (!overview.classList.contains("is-expanded")) {
      if (!overview.classList.contains("is-reading")) {
        overview.style.setProperty("--gallery-h", gallery.getBoundingClientRect().height + "px");   // the images keep their size
        overview.classList.add("is-reading");
      }
      overview.classList.add("is-expanded");
      btn.setAttribute("aria-label", "Collapse");
      animateTo(1);
    } else {
      overview.classList.remove("is-expanded");
      btn.setAttribute("aria-label", "Expand");
      animateTo(0);
    }
  });

  // closing Read More, or resizing the window, returns to the normal layout
  if (textBtn) textBtn.addEventListener("click", () => {
    if (!overview.classList.contains("is-open")) reset();
  });
  window.addEventListener("resize", reset);
}

initReadingMode();

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

// IMAGE COUNT: "1/10", updated as the gallery scrolls

function initImageCount() {
  const box = document.querySelector(".thumbnail-box");
  const overview = document.querySelector(".overview");
  if (!box || !overview) return;

  const total = box.children.length;      // every image and video in the gallery

  const label = document.createElement("div");
  label.className = "image-count";
  label.setAttribute("aria-hidden", "true");   // screen readers don't need it; the images have alt text
  overview.appendChild(label);

  if (total < 2) {                        // one slide: no number, but the line under it stays
    overview.classList.add("is-single");
    return;
  }

  const update = () => {
    const current = Math.min(total, Math.round(box.scrollTop / box.clientHeight) + 1);
    label.textContent = current + "/" + total;
  };

  box.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
}

initImageCount();

initBehindTheScenes();