// COPYRIGHT: shown only when the visitor reaches the end of the page.

function initCopyright() {
  const copyright = document.querySelector(".copyright");
  if (!copyright) return;

  const show = (on) => copyright.classList.toggle("is-visible", on);

  // Home page: visible while the last page (info) is on screen
  const container = document.querySelector(".interchange");
  const pages = document.querySelectorAll(".interchange .page");
  if (container && pages.length) {
    const last = pages[pages.length - 1];
    new IntersectionObserver(([entry]) => show(entry.isIntersecting), {
      root: container,
      threshold: 0.5
    }).observe(last);
    return;
  }

  // Project pages: visible once the gallery is scrolled to its end.
  // If the gallery doesn't scroll at all (one image), there is nothing below, so show it straight away.
  const scroller = document.querySelector(".thumbnail-box");
  if (!scroller) {
    show(true);
    return;
  }

  const check = () => show(scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 2);

  scroller.addEventListener("scroll", check, { passive: true });
  window.addEventListener("resize", check);
  window.addEventListener("load", check);   // images change the height once they have loaded
  check();
}