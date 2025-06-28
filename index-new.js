document.addEventListener("DOMContentLoaded", function () {
  const aboutButton = document.querySelector('.aboutButton');
  const archiveButton = document.querySelector('.archiveButton');
  const homeButton = document.querySelector('.homeButton');
  const skeleton = document.querySelector('.skeleton');
  const skin = document.querySelector('.skin');
  const world = document.querySelector('.world');

  aboutButton.addEventListener("click", () => {
    skeleton.style.display = "none";
    skin.style.display = "flex";
    world.style.display = "none";
  });

  archiveButton.addEventListener("click", () => {
    skin.style.display = "none";
    skeleton.style.display = "flex";
    world.style.display = "none";
  });

  homeButton.addEventListener("click", () => {
    skin.style.display = "none";
    skeleton.style.display = "none";
    world.style.display = "flex";
  });
});

// categoryButton
const filterBtn = document.querySelector('.categoryButton');
  const filterSelection = document.querySelector('.filterSelection');
  const icon = filterBtn.querySelector('.toggleIcon');

  filterBtn.addEventListener('click', () => {
    filterBtn.classList.toggle('active');
    filterSelection.classList.toggle('active');
  });

// category filter system
const projectFilters = document.querySelectorAll('.filterSelection input[name="filter"]');
const projectDivs = document.querySelectorAll('.organ .listOfProjects');

const updateFilter = event => {
  const filterValue = event.currentTarget.value;

  projectDivs.forEach(projectDiv => {
    const matches = filterValue === 'show-all' || projectDiv.classList.contains(filterValue);
    projectDiv.style.display = matches ? 'table' : 'none';
  });
};

projectFilters.forEach(projectFilter => {
  const filterValue = projectFilter.value;

  let projectsForFilter;
  if (filterValue === 'show-all') {
    projectsForFilter = document.querySelectorAll('.organ .listOfProjects');
  } else {
    projectsForFilter = document.querySelectorAll(`.organ .listOfProjects.${filterValue}`);
  }

  const filterCount = projectsForFilter.length;
  const filterCountOutput = projectFilter.nextElementSibling.nextElementSibling;
  filterCountOutput.innerHTML = `(${filterCount})`;

  projectFilter.addEventListener('change', updateFilter);
});

// colorToggle
const toggle = document.getElementById('colorToggle');

  toggle.addEventListener('change', () => {
    if (toggle.checked) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  });
  

// homeButton logistics
const homeButton = document.querySelector('.homeButton');
  const homeName = document.querySelector('.homeName');
  const archiveButton = document.querySelector('.archiveButton');
  const aboutButton = document.querySelector('.aboutButton');

  let expanded = false;

  homeButton.addEventListener('click', () => {
    expanded = !expanded;

    homeName.classList.toggle('expanded', expanded);
    archiveButton.classList.toggle('expanded', expanded);
    aboutButton.classList.toggle('expanded', expanded);
  });


//veil intro settings

// id="veil-identity"

window.addEventListener('load', () => {
    setTimeout(() => {
      document.querySelector('.professionalTitle').classList.add('visible');
    }, 1000);
  });

document.addEventListener('DOMContentLoaded', function () {
    const veil = document.getElementById('veil-identity');
    const introDuration = 2500; // ms, match CSS transition
    const animDelay = 400; // ms, delay for child animations
    const isFirstVisit = !sessionStorage.getItem('visited'); // Use sessionStorage

    const name = document.getElementById('professionalName');
    const title = document.getElementById('professionalTitle');

    if (isFirstVisit) {
        // Animate child elements in (fade in)
        setTimeout(() => {
            if (name) name.classList.add('visible');
        }, animDelay);
        setTimeout(() => {
            if (title) title.classList.add('visible');
        }, animDelay + 400);

        // After both are visible, trigger move up and fade out
        setTimeout(() => {
            if (name) name.classList.add('animate-out');
            if (title) title.classList.add('animate-out');
            // After move up animation, collapse the name
            setTimeout(() => {
                if (name) name.classList.add('collapsed');
            }, 1200); // match nameMoveUp duration
        }, animDelay + 400 + 1200); // 1200ms after title is visible

        // Remove collapse effect, just keep name at top after move up
        setTimeout(() => {
            if (name) {
                name.classList.add('visible');
            }
        }, animDelay + 400 + 1200 + 100); // Slightly after animation

        // Preload all gallery images
        const imgs = document.querySelectorAll('.galleryContainer img');
        imgs.forEach(img => {
            const src = img.getAttribute('src');
            if (src) {
                const preloadImg = new Image();
                preloadImg.src = src;
            }
        });

        // Fade out intro after duration
        setTimeout(() => {
            veil.classList.add('veil-fadeout');
            setTimeout(() => {
                veil.style.display = 'none';
            }, 1200);
        }, introDuration + 1200); // Wait for move/fade-out to finish
        sessionStorage.setItem('visited', 'true'); // Set sessionStorage flag
    } else {
        // Not first visit: hide intro immediately
        veil.style.display = 'none';
        if (name) name.classList.add('visible');
        if (title) title.classList.add('visible');
    }

  // Animation for professionalName (reverse of homeButton)
  const professionalName = document.getElementById('professionalName');
  let collapsed = false;
  professionalName.addEventListener('click', () => {
    collapsed = !collapsed;
    professionalName.classList.toggle('collapsed', collapsed);
  });
});
