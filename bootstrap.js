(() => {
  if (!window.DecadeExtensions) {
    throw new Error("extension-runtime.js must load before bootstrap.js");
  }

  // app.js may render once before feature scripts load. Reconcile the active route
  // after every extension has registered so direct hash URLs always use V1 renderers.
  if (location.hash && location.hash !== "#cover") navigate(location.hash);
  else updateProgress();
})();
