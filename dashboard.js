(() => {
  function actionStats(store) {
    const rows = [];
    let done = 0;
    let total = 0;
    const opened = new Set(store.opened || []);

    CHAPTERS.filter((chapter) => opened.has(chapter.id)).forEach((chapter) => {
      const states = (store.actions || {})[chapter.id] || [];
      chapter.monday.forEach((text, index) => {
        const checked = Boolean(states[index]);
        total += 1;
        if (checked) done += 1;
        rows.push({ chapter, index, text, checked });
      });
    });

    return { rows, done, total };
  }

  function dashboardHtml() {
    const store = loadStore();
    const completed = new Set(store.completed || []);
    const bookmarks = new Set(store.bookmarks || []);
    const notes = store.notes || {};
    const milestones = store.timelineMilestones || [];
    const actions = actionStats(store);
    const pending = actions.rows.filter((row) => !row.checked).slice(0, 6);
    const bookmarkedChapters = CHAPTERS.filter((chapter) => bookmarks.has(chapter.id));
    const noteCount = Object.values(notes).filter((value) => String(value || "").trim()).length;
    const progress = CHAPTERS.length ? Math.round((completed.size / CHAPTERS.length) * 100) : 0;

    return `
      <section class="decade-dashboard">
        <div class="dashboard-hero">
          <div>
            <p class="ch-kicker">PERSONAL DECADE OS</p>
            <h1>我的十年</h1>
            <p>这里不再统计你“看过多少字”，而是看你留下了多少判断、做了多少行动、把多少未来变成了具体时间。</p>
          </div>
          <button class="dashboard-timeline" type="button" data-go="#tools/timeline">打开十年时间线 →</button>
        </div>

        <div class="dashboard-stats">
          <article>
            <span>章节完成</span>
            <strong>${completed.size}<small> / ${CHAPTERS.length}</small></strong>
            <div class="mini-progress" aria-label="阅读完成 ${progress}%"><i style="width:${progress}%"></i></div>
          </article>
          <article>
            <span>收藏章节</span>
            <strong>${bookmarks.size}</strong>
            <p>真正值得回来看的，不必很多。</p>
          </article>
          <article>
            <span>个人笔记</span>
            <strong>${noteCount}</strong>
            <p>你自己的答案，比摘要更值钱。</p>
          </article>
          <article>
            <span>时间线里程碑</span>
            <strong>${milestones.length}</strong>
            <p>“以后”开始有具体年龄。</p>
          </article>
        </div>

        <div class="dashboard-grid">
          <section class="dashboard-panel action-panel">
            <div class="panel-heading">
              <div>
                <span>行动</span>
                <h2>下一步做什么</h2>
              </div>
              <strong>${actions.done} / ${actions.total}</strong>
            </div>
            <div class="dashboard-actions">
              ${pending.length ? pending.map((row) => `
                <label class="dashboard-action">
                  <input type="checkbox" data-dashboard-action="${row.index}" data-chapter="${escapeAttr(row.chapter.id)}" />
                  <span>
                    <small>${row.chapter.n} · ${escapeHtml(row.chapter.title)}</small>
                    ${escapeHtml(row.text)}
                  </span>
                </label>`).join("") : `
                <div class="dashboard-empty">
                  <strong>${actions.total ? "当前行动全部完成。" : "先读一章，再决定行动。"}</strong>
                  <p>${actions.total ? "可以去读下一章，给未来的自己再找点麻烦。" : "只有你真正打开过的章节，才会进入这里的行动清单。"}</p>
                </div>`}
            </div>
          </section>

          <section class="dashboard-panel bookmark-panel">
            <div class="panel-heading">
              <div>
                <span>回看</span>
                <h2>收藏章节</h2>
              </div>
            </div>
            <div class="bookmark-list">
              ${bookmarkedChapters.length ? bookmarkedChapters.slice(0, 6).map((chapter) => `
                <button type="button" data-go="#c/${chapter.id}">
                  <b>${chapter.n}</b>
                  <span>${escapeHtml(chapter.title)}</span>
                  <i>→</i>
                </button>`).join("") : `
                <div class="dashboard-empty">
                  <strong>还没有收藏。</strong>
                  <p>遇到那种“靠，这章在说我”的章节时，点一下 ☆。</p>
                </div>`}
            </div>
          </section>
        </div>

        <div class="dashboard-shortcuts">
          <button type="button" data-go="#tools/capital"><span>01</span><b>身份资本</b><small>我已经有什么，还缺什么</small></button>
          <button type="button" data-go="#tools/jam"><span>02</span><b>六瓶果酱</b><small>把无限可能压缩成真实选项</small></button>
          <button type="button" data-go="#tools/ties"><span>03</span><b>弱连接</b><small>谁可能把我接到圈外</small></button>
          <button type="button" data-go="#tools/q29"><span>04</span><b>二十九问</b><small>关系里的重要问题别拖到以后</small></button>
          <button type="button" data-go="#tools/timeline"><span>05</span><b>十年时间线</b><small>检查人生计划是否互相撞车</small></button>
        </div>
      </section>`;
  }

  function bindDashboardActions() {
    $("main").querySelectorAll("[data-dashboard-action]").forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        const chapterId = checkbox.dataset.chapter;
        const index = +checkbox.dataset.dashboardAction;
        const actions = { ...(loadStore().actions || {}) };
        const current = [...(actions[chapterId] || [])];
        current[index] = checkbox.checked;
        actions[chapterId] = current;
        saveStore({ actions });
        renderTools();
      });
    });
  }

  const baseRenderTools = renderTools;
  renderTools = function renderToolsDashboard() {
    if (state.tool) {
      baseRenderTools();
      return;
    }

    baseRenderTools();
    const main = $("main");
    const originalNodes = [...main.childNodes];

    const template = document.createElement("template");
    template.innerHTML = dashboardHtml().trim();
    const dashboard = template.content.firstElementChild;

    const details = document.createElement("details");
    details.className = "all-tools";
    const summary = document.createElement("summary");
    summary.textContent = "查看全部练习说明";
    const content = document.createElement("div");
    content.className = "all-tools-content";
    originalNodes.forEach((node) => content.append(node));
    details.append(summary, content);

    main.append(dashboard, details);
    bindDashboardActions();
  };

  const baseRenderRail = renderRail;
  renderRail = function renderRailDashboard() {
    baseRenderRail();
    const overview = $("rail").querySelector('[data-go="#tools"]');
    if (overview) overview.textContent = "我的十年";
  };
})();
