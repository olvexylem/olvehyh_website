// enter screen
document.addEventListener("DOMContentLoaded", () => {
  const screen = document.querySelector('.enter-screen');

  if (!sessionStorage.getItem('seenEnterScreen')) {
    const delays = [0, 600, 1200]; // stagger delays in ms
    const totalTime = Math.max(...delays) + 1000 + 1000; // longest delay + typing (1s) + 1s wait

    setTimeout(() => {
      screen.style.transition = "opacity 0.5s";
      screen.style.opacity = 0;
      setTimeout(() => screen.remove(), 500);
    }, totalTime);

    sessionStorage.setItem('seenEnterScreen', 'true');
  } else screen.remove();
});


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



//highlight scroll
const carousel = document.getElementById("carousel");
const slides = Array.from(carousel.children);
const slideWidth = window.innerWidth;
let index = 0;
const speed = 4000; // ms between slides

// Clone slides for seamless looping
slides.forEach(slide => {
  carousel.appendChild(slide.cloneNode(true));
});

function autoScroll() {
  index++;
  carousel.scrollTo({
    left: index * slideWidth,
    behavior: "smooth"
  });

  // When reaching the cloned end, jump back to start
  if (index === slides.length) {
    setTimeout(() => {
      carousel.scrollLeft = 0;
      index = 0;
    }, 20000); // must be > scroll duration
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
