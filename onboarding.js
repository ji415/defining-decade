(() => {
  const ONBOARDING_VERSION = 1;
  const ROUTES = {
    work: "#tools/jam",
    love: "#part/love",
    future: "#tools/timeline",
    growth: "#tools"
  };

  function storeProfile(age, focus) {
    const patch = {
      onboardingVersion: ONBOARDING_VERSION,
      onboardingCompletedAt: Date.now(),
      decadeProfile: {
        ...(loadStore().decadeProfile || {}),
        focus: focus || null
      }
    };

    if (Number.isFinite(age)) {
      const startAge = Math.min(60, Math.max(15, age));
      const endAge = Math.min(70, startAge + 10);
      patch.decadeProfile.age = startAge;
      patch.timelineSettings = {
        ...(loadStore().timelineSettings || {}),
        startAge,
        endAge
      };
      patch.timeline = {
        ...(loadStore().timeline || {}),
        now: String(startAge)
      };
    }

    saveStore(patch);
  }

  function dismissOnboarding() {
    saveStore({
      onboardingVersion: ONBOARDING_VERSION,
      onboardingDismissedAt: Date.now()
    });
    const dialog = $("decadeOnboarding");
    if (dialog?.open) dialog.close();
  }

  function shouldShow() {
    const store = loadStore();
    return Number(store.onboardingVersion || 0) < ONBOARDING_VERSION;
  }

  function selectedFocus() {
    return document.querySelector('input[name="decadeFocus"]:checked')?.value || null;
  }

  function prefillOnboarding() {
    const profile = loadStore().decadeProfile || {};
    $("onboardingAge").value = Number.isFinite(Number(profile.age)) ? profile.age : "";
    document.querySelectorAll('input[name="decadeFocus"]').forEach((radio) => {
      radio.checked = radio.value === profile.focus;
    });
  }

  function openOnboarding() {
    const dialog = $("decadeOnboarding");
    if (!dialog || dialog.open) return;
    prefillOnboarding();
    dialog.showModal();
    requestAnimationFrame(() => $("onboardingAge")?.focus());
  }

  function completeOnboarding() {
    const ageInput = $("onboardingAge");
    const rawAge = ageInput.value.trim();
    const age = rawAge ? Number.parseInt(rawAge, 10) : NaN;
    const focus = selectedFocus();

    if (rawAge && (!Number.isFinite(age) || age < 15 || age > 60)) {
      ageInput.setCustomValidity("请输入 15–60 之间的年龄，或留空。");
      ageInput.reportValidity();
      return;
    }

    ageInput.setCustomValidity("");
    storeProfile(age, focus);
    $("decadeOnboarding").close();

    const target = ROUTES[focus] || "#map";
    if (location.hash === target) navigate(target);
    else go(target);
  }

  function installOnboarding() {
    if ($("decadeOnboarding")) return;

    document.body.insertAdjacentHTML("beforeend", `
      <dialog class="decade-onboarding" id="decadeOnboarding" aria-labelledby="onboardingTitle">
        <div class="onboarding-shell">
          <button class="onboarding-close" id="onboardingClose" type="button" aria-label="以后再说">×</button>

          <header class="onboarding-head">
            <span class="onboarding-kicker">PERSONAL DECADE OS</span>
            <h2 id="onboardingTitle">这不是一本电子书。</h2>
            <p>它更像一间咨询室：读一点，回答一点，做一点。先告诉它你现在站在哪。</p>
          </header>

          <section class="onboarding-age">
            <label for="onboardingAge">你现在几岁？ <small>可留空</small></label>
            <div>
              <input id="onboardingAge" type="number" min="15" max="60" inputmode="numeric" placeholder="20" />
              <span>岁</span>
            </div>
            <p>填写后，十年时间线会自动从这个年龄开始。</p>
          </section>

          <fieldset class="onboarding-focus">
            <legend>你现在最想搞清楚哪件事？</legend>
            <label>
              <input type="radio" name="decadeFocus" value="work" />
              <span><b>工作与方向</b><small>我该往哪走？哪瓶果酱值得买？</small></span>
            </label>
            <label>
              <input type="radio" name="decadeFocus" value="love" />
              <span><b>爱情与关系</b><small>我正在选择怎样的伴侣和家庭？</small></span>
            </label>
            <label>
              <input type="radio" name="decadeFocus" value="future" />
              <span><b>时间与未来</b><small>十年后想在哪？这些目标会不会撞车？</small></span>
            </label>
            <label>
              <input type="radio" name="decadeFocus" value="growth" />
              <span><b>自信与成长</b><small>我想变成怎样的人？下一步做什么？</small></span>
            </label>
          </fieldset>

          <footer class="onboarding-actions">
            <button class="onboarding-skip" id="onboardingSkip" type="button">以后再说</button>
            <button class="onboarding-start" id="onboardingStart" type="button">进入我的十年 →</button>
          </footer>

          <p class="onboarding-privacy">数据只保存在当前浏览器，除非你主动导出备份。</p>
        </div>
      </dialog>`);

    $("onboardingClose").addEventListener("click", dismissOnboarding);
    $("onboardingSkip").addEventListener("click", dismissOnboarding);
    $("onboardingStart").addEventListener("click", completeOnboarding);
    $("onboardingAge").addEventListener("input", (event) => event.target.setCustomValidity(""));

    $("decadeOnboarding").addEventListener("cancel", (event) => {
      event.preventDefault();
      dismissOnboarding();
    });

    $("decadeOnboarding").addEventListener("click", (event) => {
      if (event.target === $("decadeOnboarding")) dismissOnboarding();
    });

    // Existing app navigation runs first; then the first-use guide opens on top.
    $("enterBtn")?.addEventListener("click", () => {
      if (shouldShow()) requestAnimationFrame(openOnboarding);
    });

    if (shouldShow() && location.hash && location.hash !== "#cover") {
      requestAnimationFrame(openOnboarding);
    }

    const toolsNav = document.querySelector('.parts [data-part="tools"]');
    if (toolsNav) toolsNav.textContent = "我的十年";
  }

  installOnboarding();

  const baseRenderTools = renderTools;
  renderTools = function renderToolsWithProfileEntry() {
    baseRenderTools();
    if (state.tool || state.view !== "tools") return;
    const hero = $("main").querySelector(".dashboard-hero");
    const timelineButton = hero?.querySelector(".dashboard-timeline");
    if (!hero || !timelineButton || $("editDecadeProfile")) return;

    const actions = document.createElement("div");
    actions.className = "dashboard-hero-actions";
    timelineButton.replaceWith(actions);
    actions.appendChild(timelineButton);

    const button = document.createElement("button");
    button.className = "dashboard-profile";
    button.id = "editDecadeProfile";
    button.type = "button";
    button.textContent = "调整我的起点";
    actions.appendChild(button);
    button.addEventListener("click", openOnboarding);
  };

  if (state.view === "tools" && !state.tool) renderTools();
})();
