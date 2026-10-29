// SCROLL CUE: the arrow at the bottom of the screen.
// Points down on every page except the last, where it points up and returns to the top.
// Clicking it scrolls to the next page.

function initScrollCue() {
  const cue = document.querySelector(".scroll-cue");
  const container = document.querySelector(".interchange");
  const pages = [...document.querySelectorAll(".interchange .page")];
  if (!cue || !container || pages.length < 2) return;

  let current = 0;

  function setCurrent(index) {
    current = index;
    const last = index === pages.length - 1;
    cue.classList.toggle("is-up", last);
    cue.setAttribute("aria-label", last ? "Back to top" : "Next page");
  }

  // Which page is mostly on screen right now
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setCurrent(pages.indexOf(entry.target));
    });
  }, { root: container, threshold: 0.5 });

  pages.forEach((page) => observer.observe(page));

  cue.addEventListener("click", () => {
    const target = pages[(current + 1) % pages.length];   // after the last page, back to the first
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
  });
}