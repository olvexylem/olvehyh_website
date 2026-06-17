const textBtn = document.querySelector(".text-btn");
const overview = document.querySelector(".overview");

textBtn.addEventListener("click", () => {
  overview.classList.toggle("is-open");

  textBtn.textContent = overview.classList.contains("is-open")
    ? "[ close ]"
    : "[ read more ]";
});
