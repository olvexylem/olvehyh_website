// START-UP: everything the site does, in order.
// Load this file LAST (after projects.js and the feature files).
//
// Each step runs on its own. If one breaks (say the carousel), the others
// still start, and the console names exactly which one failed.

const startup = [
  initClock,
  initCarousel,
  initMenu,
  renderProjects,   // must run before the view toggle and the filter, which need the cards
  initViewToggle,
  initFilter,
  initFilterAlignment,   // after the menu button exists, so it can be measured
  initScrollCue,
  initCopyright
];

startup.forEach(step => {
  try {
    step();
  } catch (error) {
    console.error(`${step.name}() failed:`, error);
  }
});