// PARIS TIMESTAMP

const timestamp = document.getElementById("timestamp");

function updateTimestamp() {
  const parisTime = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Paris",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).format(new Date());

  timestamp.textContent = `(FR) ${parisTime}`;
}

updateTimestamp();
setInterval(updateTimestamp, 1000);

// HIGH PROJECT CAROUSEL

const highCarousel = document.querySelector(".highlight");
const highSlides = document.querySelectorAll(".high_project");

const highPrev = document.querySelector(".high-prev");
const highNext = document.querySelector(".high-next");

const highProjectLink = document.querySelector(".high-project-link");

if (highCarousel && highSlides.length) {

  // LEFT / RIGHT CLICK

  let highIndex = 0;

  function goToHighSlide(index) {

    // Loop around
    highIndex = (index + highSlides.length) % highSlides.length;

    highCarousel.scrollTo({
      left: highIndex * highCarousel.clientWidth,
      behavior: "smooth"
    });
  }

  if (highPrev) {
    highPrev.addEventListener("click", () => {
      goToHighSlide(highIndex - 1);
    });
  }

  if (highNext) {
    highNext.addEventListener("click", () => {
      goToHighSlide(highIndex + 1);
    });
  }


  // UPDATE PROJECT TITLE + LINK

  if (highProjectLink) {

    const highObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {

          if (entry.isIntersecting) {
            const slide = entry.target;

            highProjectLink.textContent = slide.dataset.title;
            highProjectLink.href = slide.dataset.url;
          }

        });
      },
      {
        root: highCarousel,
        threshold: 0.6
      }
    );

    highSlides.forEach(slide => {
      highObserver.observe(slide);
    });

  }

}


// MENU TOGGLE

const menuBtn = document.querySelector(".menu-btn");
const menuOverlay = document.querySelector(".menu-overlay");
const menuLinks = document.querySelectorAll(".menu-overlay a");

function openMenu() {
  menuOverlay.classList.remove("hidden");
  menuBtn.textContent = "Close";
}

function closeMenu() {
  menuOverlay.classList.add("hidden");
  menuBtn.textContent = "Menu";
}

menuBtn.addEventListener("click", () => {
  menuOverlay.classList.contains("hidden") ? openMenu() : closeMenu();
});

menuLinks.forEach(link => link.addEventListener("click", closeMenu));


// FILTER MENU TOGGLE

const filterToggle = document.querySelector(".filter-toggle");
const filterMenu = document.querySelector(".filter-menu");
const filterIcon = document.querySelector(".filter-icon");

filterToggle.addEventListener("click", () => {
  filterMenu.classList.toggle("active");
  filterIcon.classList.toggle("active");
});


// FILTER MECHANISM

const filterInputs = document.querySelectorAll('input[name="filter"]');
const projects = document.querySelectorAll(".project");

filterInputs.forEach(input => {
  input.addEventListener("change", () => {
    const selectedFilter = input.value;

    projects.forEach(project => {
      project.style.display =
        selectedFilter === "show-all" ||
          project.classList.contains(selectedFilter)
          ? ""
          : "none";
    });
  });
});


// COUNTING

const filterOptions = document.querySelectorAll(
  ".filter-option, .filterOption"
);

filterOptions.forEach(option => {
  const input = option.querySelector('input[name="filter"]');
  const countSpan = option.querySelector(".categoryCount");

  if (!input || !countSpan) return;

  const filter = input.value;

  const count =
    filter === "show-all"
      ? projects.length
      : document.querySelectorAll(`.project.${filter}`).length;

  countSpan.textContent = count;
});


// INDEX VIEW

const imageView = document.getElementById("display-image");
const textView = document.getElementById("display-text");
const projectGrid = document.querySelector(".project-grid");

imageView.addEventListener("change", () => {
  if (imageView.checked) projectGrid.classList.remove("text-view");
});

textView.addEventListener("change", () => {
  if (textView.checked) projectGrid.classList.add("text-view");
});


// IPHONE SCROLL BAR

const interchange = document.querySelector(".interchange");
const infoCat = document.querySelector("#info-cat");

const progressBar = document.querySelector(".scroll-progress");
const progressFill = document.querySelector(".scroll-progress-fill");
const progressText = document.querySelector(".scroll-progress-text");

function updateProjectProgress() {
  const maxScroll = projectGrid.scrollHeight - projectGrid.clientHeight;

  const percentage =
    maxScroll > 0
      ? Math.round((projectGrid.scrollTop / maxScroll) * 100)
      : 0;

  progressFill.style.width = `${percentage}%`;

  if (progressText) {
    progressText.textContent = `${percentage}%`;
  }
}

function updateBarVisibility() {
  progressBar.classList.toggle(
    "hidden-bar",
    interchange.scrollTop > infoCat.offsetTop * 0.5
  );
}

projectGrid.addEventListener("scroll", updateProjectProgress);
interchange.addEventListener("scroll", updateBarVisibility);

updateProjectProgress();
updateBarVisibility();

