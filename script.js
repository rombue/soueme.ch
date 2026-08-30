const tabs = Array.from(document.querySelectorAll('[role="tab"]'));

function activateTab(nextTab) {
  tabs.forEach((tab) => {
    const isActive = tab === nextTab;
    const panel = document.getElementById(tab.getAttribute("aria-controls"));

    tab.setAttribute("aria-selected", String(isActive));
    tab.tabIndex = isActive ? 0 : -1;
    if (panel) panel.hidden = !isActive;
  });
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => activateTab(tab));

  tab.addEventListener("keydown", (event) => {
    let nextIndex = null;

    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % tabs.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = tabs.length - 1;
    }

    if (nextIndex === null) return;

    event.preventDefault();
    activateTab(tabs[nextIndex]);
    tabs[nextIndex].focus();
  });
});
