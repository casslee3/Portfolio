/**
 * Accessible tabs following the WAI-ARIA Authoring Practices pattern:
 * roving tabindex, Arrow/Home/End keys, automatic activation.
 *
 * Tabs are real links (href="#panel-id") so everything still works without
 * JavaScript, and the selected tab is mirrored in the URL hash so it can be
 * deep-linked (e.g. /#about).
 */
export function initTabs(tablist) {
  if (!tablist) return;

  const tabs = [...tablist.querySelectorAll('[role="tab"]')];
  const panelFor = (tab) => document.getElementById(tab.getAttribute("aria-controls"));

  function select(tab, { focus = false, updateHash = true } = {}) {
    for (const t of tabs) {
      const selected = t === tab;
      t.setAttribute("aria-selected", String(selected));
      t.tabIndex = selected ? 0 : -1;
      panelFor(t).classList.toggle("is-active", selected);
    }
    if (focus) tab.focus();
    if (updateHash) history.replaceState(null, "", `#${panelFor(tab).id}`);
  }

  function tabForHash() {
    return tabs.find((t) => `#${t.getAttribute("aria-controls")}` === location.hash);
  }

  tablist.addEventListener("click", (event) => {
    const tab = event.target.closest('[role="tab"]');
    if (!tab) return;
    event.preventDefault();
    select(tab);
  });

  tablist.addEventListener("keydown", (event) => {
    const index = tabs.indexOf(document.activeElement);
    if (index === -1) return;

    const targets = {
      ArrowRight: tabs[(index + 1) % tabs.length],
      ArrowLeft: tabs[(index - 1 + tabs.length) % tabs.length],
      Home: tabs[0],
      End: tabs[tabs.length - 1],
    };
    const target = targets[event.key];
    if (!target) return;

    event.preventDefault();
    select(target, { focus: true });
  });

  // Links elsewhere on the page (e.g. "About me") can point at a panel.
  window.addEventListener("hashchange", () => {
    const tab = tabForHash();
    if (tab) select(tab, { updateHash: false });
  });

  select(tabForHash() ?? tabs[0], { updateHash: false });
}
