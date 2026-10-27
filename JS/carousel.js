// CAROUSEL: pinned projects, infinite loop
//
// Track layout: [clone of last] [real slides...] [clone of first]
// Landing on a clone silently jumps to the real slide it copies.

function initCarousel() {
  const carousel = document.querySelector(".highlight");
  const slides = Array.from(document.querySelectorAll(".high-project"));
  if (!carousel || !slides.length) return;

  const prevZone = document.querySelector(".high-prev");
  const nextZone = document.querySelector(".high-next");
  const titleLink = document.querySelector(".high-project-link");

  const total = slides.length;

  // Add the two clones

  const cloneOfLast = slides[total - 1].cloneNode(true);
  const cloneOfFirst = slides[0].cloneNode(true);

  [cloneOfLast, cloneOfFirst].forEach(clone => clone.setAttribute("aria-hidden", "true"));

  carousel.prepend(cloneOfLast);
  carousel.append(cloneOfFirst);

  const track = [cloneOfLast, ...slides, cloneOfFirst];

  // Position helpers (position 0 = leading clone, 1 = first real slide)

  const currentPos = () => Math.round(carousel.scrollLeft / carousel.clientWidth);

  // Instant, invisible jump (snapping is paused for one frame)
  function jumpTo(pos) {
    carousel.style.scrollSnapType = "none";
    carousel.scrollLeft = pos * carousel.clientWidth;
    requestAnimationFrame(() => {
      carousel.style.scrollSnapType = "";
    });
  }

  // If we've settled exactly on a clone, jump to the real slide it copies
  function normalize() {
    const pos = currentPos();
    const isSettled = Math.abs(carousel.scrollLeft - pos * carousel.clientWidth) < 2;
    if (!isSettled) return;

    if (pos === 0) jumpTo(total);
    else if (pos === total + 1) jumpTo(1);
  }

  // Start on the first real slide
  jumpTo(1);
  let lastPos = 1;

  // Run normalize() once scrolling has stopped
  let settleTimer;
  carousel.addEventListener("scroll", () => {
    clearTimeout(settleTimer);
    settleTimer = setTimeout(() => {
      normalize();
      lastPos = currentPos();
    }, 80);
  });

  // Keep alignment if the window is resized
  window.addEventListener("resize", () => jumpTo(lastPos));

  // Desktop click zones

  function step(direction) {
    normalize();
    carousel.scrollTo({
      left: (currentPos() + direction) * carousel.clientWidth,
      behavior: "smooth"
    });
  }

  prevZone?.addEventListener("click", () => step(-1));
  nextZone?.addEventListener("click", () => step(1));

  // Keep the project title + link in sync with the visible slide

  if (titleLink) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          titleLink.textContent = entry.target.dataset.title;
          titleLink.href = entry.target.dataset.url;
        });
      },
      { root: carousel, threshold: 0.6 }
    );

    track.forEach(slide => observer.observe(slide));
  }
}