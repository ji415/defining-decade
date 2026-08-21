(() => {
  const hookNames = ["chapter:after", "map:after", "tools:after", "rail:after"];
  const hooks = Object.fromEntries(hookNames.map((name) => [name, []]));
  const toolRenderers = new Map();

  const base = {
    renderChapter,
    renderMap,
    renderTools,
    renderRail,
    tools: {
      capital: renderCapital,
      jam: renderJam,
      ties: renderTies,
      q29: renderQ29,
      timeline: renderTimeline
    }
  };

  function runHooks(name, context = {}) {
    for (const hook of hooks[name] || []) {
      hook({
        ...context,
        state,
        store: loadStore(),
        main: $("main"),
        rail: $("rail")
      });
    }
  }

  function on(name, hook) {
    if (!hooks[name]) throw new Error(`Unknown extension hook: ${name}`);
    if (typeof hook !== "function") throw new TypeError("Extension hook must be a function");
    hooks[name].push(hook);
    return () => {
      const index = hooks[name].indexOf(hook);
      if (index >= 0) hooks[name].splice(index, 1);
    };
  }

  function registerToolRenderer(name, renderer) {
    if (!name || typeof renderer !== "function") {
      throw new TypeError("registerToolRenderer(name, renderer) requires a name and function");
    }
    if (toolRenderers.has(name)) {
      throw new Error(`Tool renderer already registered: ${name}`);
    }
    toolRenderers.set(name, renderer);
  }

  function renderBaseTool(name, store = loadStore()) {
    const renderer = base.tools[name];
    if (!renderer) throw new Error(`Unknown base tool renderer: ${name}`);
    return renderer(store);
  }

  window.DecadeExtensions = Object.freeze({
    on,
    registerToolRenderer,
    renderBaseTool,
    refresh: () => render()
  });

  renderChapter = function renderChapterWithExtensions() {
    base.renderChapter();
    runHooks("chapter:after", { chapterId: state.chapterId });
  };

  renderMap = function renderMapWithExtensions() {
    base.renderMap();
    runHooks("map:after", { part: state.part });
  };

  renderRail = function renderRailWithExtensions() {
    base.renderRail();
    runHooks("rail:after");
  };

  renderTools = function renderToolsWithExtensions() {
    const customRenderer = state.tool ? toolRenderers.get(state.tool) : null;
    if (customRenderer) customRenderer(loadStore());
    else base.renderTools();

    runHooks("tools:after", {
      overview: !state.tool,
      tool: state.tool
    });
  };
})();
