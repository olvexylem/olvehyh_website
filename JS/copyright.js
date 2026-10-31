// FOOTER REVEAL (project pages): fades the timestamp and read more button out
// while the footer strip is on screen. The home page does the same in scroll-cue.js.

function initCopyright() {
  const scroller = document.querySelector(".project-scroll");
  const footer = document.querySelector(".site-footer");
  if (!scroller || !footer) return;

  new IntersectionObserver(([entry]) => {
    document.body.classList.toggle("footer-visible", entry.isIntersecting);
  }, { root: scroller, threshold: 0.5 }).observe(footer);
}