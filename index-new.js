// load screen
const screen = document.getElementById("enter-screen");

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


// menu 
// Select all nav links and the checkbox
  const navCheckbox = document.getElementById('navAnkh');
  const navLinks = document.querySelectorAll('.navText a');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navCheckbox.checked = false; // uncheck the checkbox
    });
  });




// copyright
document.querySelector(".copyright").addEventListener("click", function () {
  const symbol = this.querySelector(".copyright_symbol");
  const text = this.querySelector(".copyright_text");

  if (symbol.style.display === "none") {
    symbol.style.display = "inline";
    text.style.display = "none";
  } else {
    symbol.style.display = "none";
    text.style.display = "inline";
  }
});



const projects = [
  { img: "Archive/31_PHARAOH/FINAL/PHARAOH_03.png"},
  { img: "Archive/26_RUTH/FINAL/RUTH_01.webp"},
  { img: "Archive/14_SU/SU_05.webp"},
  { img: "Archive/25_CATALOGUE/FINAL/BDBD_01.webp"},
  { img: "Archive/16_ETHER/FINAL/PHOTOGRAPY/ETHER_IMG_03.webp"}
];

const carousel = document.getElementById("carousel");

// Generate slides
projects.forEach(project => {
  carousel.insertAdjacentHTML("beforeend", `
    <article class="slide">
      <img src="${project.img}" alt="${project.title}">
      <div class="slide-caption">${project.title ?? ""}</div>
    </article>
  `);
});

let slides = Array.from(carousel.children);
let index = 0;
const speed = 5000;

// Clone first slide
const clone = slides[0].cloneNode(true);
carousel.appendChild(clone);

// Update slides AFTER cloning if needed
slides = Array.from(carousel.children);

function getSlideWidth() {
  return slides[0].getBoundingClientRect().width;
}

function autoScroll() {
  index++;
  const slideWidth = getSlideWidth();

  carousel.style.transform = `translateX(-${index * slideWidth}px)`;
  carousel.style.transition = "transform 0.6s ease";

  if (index === slides.length - 1) {
    setTimeout(() => {
      carousel.style.transition = "none";
      carousel.style.transform = "translateX(0)";
      index = 0;
    }, 600);
  }
}

setInterval(autoScroll, speed);




// category filter system
const projectFilters = document.querySelectorAll('.filterToggle_options input[name="filter"]');
const projectDivs = document.querySelectorAll('.projectBox');

const updateFilter = event => {
  const filterValue = event.currentTarget.value;

  projectDivs.forEach(projectDiv => {
    const matches = filterValue === 'show-all' || projectDiv.classList.contains(filterValue);
    projectDiv.style.display = matches ? 'flex' : 'none';
  });
};

projectFilters.forEach(projectFilter => {
  const filterValue = projectFilter.value;

  let projectsForFilter;
  if (filterValue === 'show-all') {
    projectsForFilter = document.querySelectorAll('.projectBox');
  } else {
    projectsForFilter = document.querySelectorAll(`.projectBox.${filterValue}`);
  }

  const filterCount = projectsForFilter.length;
  const filterCountOutput = projectFilter.nextElementSibling.nextElementSibling;
  filterCountOutput.innerHTML = ` (${filterCount})`;

  projectFilter.addEventListener('change', updateFilter);
});
