// load screen
const screen = document.getElementById("loading-graphic");

if (!sessionStorage.getItem("loadingShown") && screen) {
  setTimeout(() => {
    screen.classList.add("fade-out");

    screen.addEventListener("transitionend", () => {
      screen.remove();
    }, { once: true });

    sessionStorage.setItem("loadingShown", "true");
  }, 2000);
} else if (screen) {
  screen.remove();
}



// carousell mechanism
const highlightCarousel = document.querySelector('.highlight-image-carousel');
const highlightSlides = document.querySelectorAll('.highlight-slide');

let highlightIndex = 0;

function goToHighlight(index) {
  highlightIndex = (index + highlightSlides.length) % highlightSlides.length;

  highlightCarousel.scrollTo({
    left: highlightIndex * window.innerWidth,
    behavior: 'smooth'
  });
}

setInterval(() => {
  goToHighlight(highlightIndex + 1);
}, 3000); 



// menu toggle

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
  if (menuOverlay.classList.contains("hidden")) {
    openMenu();
  } else {
    closeMenu();
  }
});

menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeMenu();
  });
});


// filter menu toggle

const filterToggle = document.querySelector('.filter-toggle');
const filterMenu = document.querySelector('.filter-menu');
const filterIcon = document.querySelector('.filter-icon');

filterToggle.addEventListener('click', () => {
  filterMenu.classList.toggle('active');
  filterIcon.classList.toggle('active');
});


// filter mechanism

const filterInputs = document.querySelectorAll('input[name="filter"]');
const projects = document.querySelectorAll('.project');

filterInputs.forEach(input => {
  input.addEventListener('change', () => {
    const selectedFilter = input.value;

    projects.forEach(project => {
      if (
        selectedFilter === 'show-all' ||
        project.classList.contains(selectedFilter)
      ) {
        project.style.display = '';
      } else {
        project.style.display = 'none';
      }
    });
  });
});

    // counting

const filterOptions = document.querySelectorAll(
  '.filter-option, .filterOption'
);

filterOptions.forEach(option => {
  const input = option.querySelector('input[name="filter"]');
  const countSpan = option.querySelector('.categoryCount');

  if (!input || !countSpan) return;

  const filter = input.value;

  let count =
    filter === 'show-all'
      ? projects.length
      : document.querySelectorAll(`.project.${filter}`).length;

  countSpan.textContent = count;
});

    // index view

const imageView = document.getElementById('display-image');
const textView = document.getElementById('display-text');
const projectGrid = document.querySelector('.project-grid');

imageView.addEventListener('change', () => {
  if (imageView.checked) {
    projectGrid.classList.remove('text-view');
  }
});

textView.addEventListener('change', () => {
  if (textView.checked) {
    projectGrid.classList.add('text-view');
  }
});


// iphone scroll bar

const interchange = document.querySelector(".interchange");
const infoCat = document.querySelector("#info-cat");

const progressBar = document.querySelector(".scroll-progress");
const progressFill = document.querySelector(".scroll-progress-fill");
const progressText = document.querySelector(".scroll-progress-text");

function updateProjectProgress() {
  const maxScroll = projectGrid.scrollHeight - projectGrid.clientHeight;

  if (maxScroll <= 0) {
    progressFill.style.width = "0%";
    if (progressText) progressText.textContent = "0%";
    return;
  }

  const progress = projectGrid.scrollTop / maxScroll;
  const percentage = Math.round(progress * 100);

  progressFill.style.width = `${percentage}%`;

  if (progressText) {
    progressText.textContent = `${percentage}%`;
  }
}

function updateBarVisibility() {
  const infoTop = infoCat.offsetTop;

  progressBar.classList.toggle(
    "hidden-bar",
    interchange.scrollTop > infoTop * 0.5
  );
}

projectGrid.addEventListener("scroll", updateProjectProgress);
interchange.addEventListener("scroll", updateBarVisibility);

updateProjectProgress();
updateBarVisibility();

