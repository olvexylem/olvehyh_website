// CLOCK: Paris time in the corner, e.g. "(CET) 14:05"

function initClock() {
  const timestamp = document.getElementById("timestamp");
  if (!timestamp) return;

  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Paris",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZoneName: "short"
  });

  function update() {
    const parts = formatter.formatToParts(new Date());
    const get = (type) => parts.find(p => p.type === type)?.value;

    timestamp.textContent = `(${get("timeZoneName")}) ${get("hour")}:${get("minute")}`;
  }

  // Only the minute is shown, so wake up exactly when the minute changes
  function scheduleNext() {
    const msToNextMinute = 60000 - (Date.now() % 60000);
    setTimeout(() => {
      update();
      scheduleNext();
    }, msToNextMinute + 50);
  }

  update();
  scheduleNext();
}