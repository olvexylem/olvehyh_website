// PROJECT GRID: build the cards from projectData, plus the image / text view toggle

const categoryLabels = {
  "graphic-design": "graphic design",
  "image": "image",
  "installations": "installation"
};

function formatDate(date) {
  const [year, month] = date.split("-");
  return `${month} ${year}`;
}

function projectCard(project) {
  const medium = project.categories.map(c => categoryLabels[c]).join(" | ");
  const href = project.url ? `href="${project.url}"` : "";

  return `
    <div class="project ${project.categories.join(" ")}">
      <a ${href}>
        <div class="project-title">
          <span>${project.title}</span>
          <span class="project-medium">${medium}</span>
          <time class="project-date" datetime="${project.date}">${formatDate(project.date)}</time>
        </div>
      </a>
      <div class="project-cover">
        <img src="${project.cover}" alt="${project.title}" loading="lazy">
      </div>
    </div>`;
}

function renderProjects() {
  const grid = document.querySelector(".project-grid");
  if (!grid) return;

  if (typeof projectData === "undefined") {
    console.warn("projectData not found: is projects.js loaded before main.js?");
    return;
  }

  grid.innerHTML = projectData.map(projectCard).join("");
}

function initViewToggle() {
  const grid = document.querySelector(".project-grid");
  const imageView = document.getElementById("display-image");
  const textView = document.getElementById("display-text");
  if (!grid || !imageView || !textView) return;

  const update = () => grid.classList.toggle("text-view", textView.checked);

  imageView.addEventListener("change", update);
  textView.addEventListener("change", update);
}