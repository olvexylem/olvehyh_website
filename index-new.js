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

if (toggle) {
  toggle.addEventListener('change', function () {
    document.body.classList.toggle('dark-mode', this.checked);
  });
}
  



