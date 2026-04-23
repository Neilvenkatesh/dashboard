const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".tab-panel");
const tooltips = document.querySelectorAll(".metric-tooltip");
const welcomeOverlay = document.getElementById("welcome-overlay");
const welcomeEnter = document.getElementById("welcome-enter");

document.body.classList.add("overlay-open");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const nextId = tab.dataset.tab;

    tabs.forEach((item) => {
      item.classList.remove("is-active");
      item.setAttribute("aria-selected", "false");
    });

    panels.forEach((panel) => panel.classList.remove("is-active"));

    tab.classList.add("is-active");
    tab.setAttribute("aria-selected", "true");
    document.getElementById(nextId)?.classList.add("is-active");
  });
});

function positionTooltip(tooltip) {
  tooltip.classList.remove("tooltip-below", "tooltip-left", "tooltip-right");

  const rect = tooltip.getBoundingClientRect();
  const edgePadding = 180;

  if (rect.top < 140) {
    tooltip.classList.add("tooltip-below");
  }

  if (rect.left < edgePadding) {
    tooltip.classList.add("tooltip-left");
  } else if (window.innerWidth - rect.right < edgePadding) {
    tooltip.classList.add("tooltip-right");
  }
}

tooltips.forEach((tooltip) => {
  tooltip.setAttribute("tabindex", "0");
  tooltip.addEventListener("mouseenter", () => positionTooltip(tooltip));
  tooltip.addEventListener("focus", () => positionTooltip(tooltip));
});

window.addEventListener("resize", () => {
  tooltips.forEach((tooltip) => positionTooltip(tooltip));
});

function dismissWelcomeOverlay() {
  if (!welcomeOverlay || welcomeOverlay.classList.contains("is-hidden")) {
    return;
  }

  welcomeOverlay.classList.add("is-hidden");
  document.body.classList.remove("overlay-open");
}

welcomeEnter?.addEventListener("click", dismissWelcomeOverlay);

window.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === "Escape" || event.key === " ") {
    dismissWelcomeOverlay();
  }
});
