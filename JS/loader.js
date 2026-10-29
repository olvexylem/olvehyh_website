// LOADER: fills the square as the page's essentials load, then fades away.

(function () {
  const loader = document.getElementById("loader");
  if (!loader) return;

  const fill = loader.querySelector(".loader-fill");
  const MIN_TIME = 600;    // ms: shown at least this long, so it never just flashes
  const MAX_TIME = 4000;   // ms: gives up and reveals the site anyway, so no one gets stuck
  const start = performance.now();
  let finished = false;

  function setProgress(p) {
    fill.style.transform = `scaleX(${p})`;
  }

  function finish() {
    if (finished) return;
    finished = true;
    setProgress(1);
    try { sessionStorage.setItem("loaderSeen", "1"); } catch (e) {}
    setTimeout(() => {                       // let the square finish filling
      loader.classList.add("done");          // fade out
      setTimeout(() => loader.remove(), 600);
    }, 350);
  }

  setTimeout(finish, MAX_TIME);

  document.addEventListener("DOMContentLoaded", () => {
    const firstImage = document.querySelector(".high-project img");

    // What the page needs before it looks right
    const tasks = [
      document.fonts ? document.fonts.ready : Promise.resolve(),
      firstImage ? firstImage.decode() : Promise.resolve()
    ];

    let done = 0;
    tasks.forEach((task) => {
      Promise.resolve(task).catch(() => {}).then(() => {   // a failed image still counts as done
        done++;
        setProgress(done / tasks.length);
        if (done === tasks.length) {
          setTimeout(finish, Math.max(0, MIN_TIME - (performance.now() - start)));
        }
      });
    });
  });
})();