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