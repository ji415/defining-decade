(() => {
  const STORE_VERSION = 2;

  function migrateStore() {
    const store = loadStore();
    if ((store.version || 1) >= STORE_VERSION) return store;
    return saveStore({
      version: STORE_VERSION,
      opened: store.opened || store.read || [],
      completed: store.completed || [],
      bookmarks: store.bookmarks || [],
      notes: store.notes || {},
      actions: store.actions || {},
      lastChapter: store.lastChapter || null
    });
  }

  migrateStore();

  // Reading progress now means explicitly completed chapters, not merely opened ones.
  readSet = function readSetV2() {
    return new Set(loadStore().completed || []);
  };

  markRead = function markOpened(id) {
    const store = loadStore();
    const opened = new Set(store.opened || []);
    opened.add(id);
    saveStore({ opened: [...opened], lastChapter: id, lastVisitedAt: Date.now() });
    renderRail();
    updateProgress();
  };

  updateProgress = function updateCompletedProgress() {
    $("progressLabel").textContent = `${readSet().size} / ${CHAPTERS.length}`;
  };

  // Fix persisted user content rendering in the identity-capital exercise.
  const baseRenderCapital = renderCapital;
  renderCapital = function renderCapitalSafe(store) {
    const safeStore = {
      ...store,
      capital: (store.capital || []).map((item) => escapeHtml(item))
    };
    return baseRenderCapital(safeStore);
  };

  function toggleInList(key, id) {
    const set = new Set(loadStore()[key] || []);
    if (set.has(id)) set.delete(id);
    else set.add(id);
    saveStore({ [key]: [...set] });
    return set.has(id);
  }

  function enhanceChapter() {
    const c = CHAPTERS.find((chapter) => chapter.id === state.chapterId);
    if (!c) return;

    saveStore({ lastChapter: c.id, lastVisitedAt: Date.now() });

    const store = loadStore();
    const completed = new Set(store.completed || []);
    const bookmarks = new Set(store.bookmarks || []);
    const notes = store.notes || {};
    const chapterActions = (store.actions || {})[c.id] || [];
    const main = $("main");
    const thesis = main.querySelector(".ch-thesis");

    if (thesis) {
      thesis.insertAdjacentHTML("afterend", `
        <div class="chapter-controls" aria-label="章节操作">
          <button class="chapter-control ${bookmarks.has(c.id) ? "active" : ""}" id="bookmarkChapter" type="button" aria-pressed="${bookmarks.has(c.id)}">
            ${bookmarks.has(c.id) ? "★ 已收藏" : "☆ 收藏"}
          </button>
          <button class="chapter-control complete ${completed.has(c.id) ? "active" : ""}" id="completeChapter" type="button" aria-pressed="${completed.has(c.id)}">
            ${completed.has(c.id) ? "✓ 已完成" : "○ 标记读完"}
          </button>
        </div>`);
    }

    const monday = main.querySelector(".monday");
    if (monday) {
      monday.innerHTML = `
        <h4>周一做什么</h4>
        <div class="action-list">
          ${c.monday.map((action, index) => `
            <label class="action-item ${chapterActions[index] ? "done" : ""}">
              <input type="checkbox" data-action="${index}" ${chapterActions[index] ? "checked" : ""} />
              <span>${escapeHtml(action)}</span>
            </label>`).join("")}
        </div>`;
    }

    const ask = main.querySelector(".ask");
    if (ask) {
      ask.insertAdjacentHTML("afterend", `
        <section class="chapter-note">
          <label for="chapterNote">我的答案 / 笔记</label>
          <textarea id="chapterNote" placeholder="不用写得漂亮。写下你现在真正的答案。">${escapeHtml(notes[c.id] || "")}</textarea>
          <p>自动保存在这台浏览器里。</p>
        </section>`);
    }

    $("bookmarkChapter")?.addEventListener("click", () => {
      toggleInList("bookmarks", c.id);
      renderChapter();
    });

    $("completeChapter")?.addEventListener("click", () => {
      toggleInList("completed", c.id);
      renderChapter();
    });

    $("chapterNote")?.addEventListener("input", (event) => {
      const current = { ...(loadStore().notes || {}) };
      current[c.id] = event.target.value;
      saveStore({ notes: current });
    });

    main.querySelectorAll("[data-action]").forEach((box) => {
      box.addEventListener("change", () => {
        const actions = { ...(loadStore().actions || {}) };
        const current = [...(actions[c.id] || [])];
        current[+box.dataset.action] = box.checked;
        actions[c.id] = current;
        saveStore({ actions });
        box.closest(".action-item")?.classList.toggle("done", box.checked);
      });
    });
  }

  const baseRenderChapter = renderChapter;
  renderChapter = function renderChapterV2() {
    baseRenderChapter();
    enhanceChapter();
  };

  function continueCard() {
    const store = loadStore();
    const chapter = CHAPTERS.find((c) => c.id === store.lastChapter);
    if (!chapter) return "";
    const complete = new Set(store.completed || []).has(chapter.id);
    return `
      <section class="continue-card">
        <div>
          <span class="continue-kicker">欢迎回来</span>
          <strong>${chapter.n} · ${escapeHtml(chapter.title)}</strong>
          <p>${complete ? "这一章已经读完，可以回来复盘你的答案。" : "从上次停下的地方继续。"}</p>
        </div>
        <button type="button" data-go="#c/${chapter.id}">${complete ? "重新打开" : "继续阅读"} →</button>
      </section>`;
  }

  const baseRenderMap = renderMap;
  renderMap = function renderMapV2() {
    baseRenderMap();
    const card = continueCard();
    if (card) $("main").insertAdjacentHTML("afterbegin", card);
  };

  function exportData() {
    const payload = {
      app: "defining-decade",
      exportedAt: new Date().toISOString(),
      data: loadStore()
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `defining-decade-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  function importData(file) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        const data = parsed.data || parsed;
        localStorage.setItem(STORE_KEY, JSON.stringify({ ...data, version: STORE_VERSION }));
        navigate(location.hash || "#tools");
      } catch {
        alert("导入失败：这不是有效的备份文件。");
      }
    };
    reader.readAsText(file);
  }

  const baseRenderTools = renderTools;
  renderTools = function renderToolsV2() {
    baseRenderTools();
    if (state.tool) return;
    $("main").insertAdjacentHTML("beforeend", `
      <section class="data-tools">
        <div>
          <p class="ch-kicker">你的数据</p>
          <h2>备份 / 恢复</h2>
          <p>笔记、收藏、完成状态和练习仍只存在你的浏览器里。可以随时导出一份 JSON 备份。</p>
        </div>
        <div class="data-actions">
          <button class="primary" id="exportData" type="button">导出备份</button>
          <label class="import-button">导入备份<input id="importData" type="file" accept="application/json,.json" /></label>
        </div>
      </section>`);
    $("exportData").addEventListener("click", exportData);
    $("importData").addEventListener("change", (event) => {
      const file = event.target.files?.[0];
      if (file) importData(file);
    });
  };

  function installMobileMenu() {
    const topRight = document.querySelector(".top-right");
    if (!topRight || $("mobileMenuBtn")) return;
    topRight.insertAdjacentHTML("beforeend", `<button class="mobile-menu-btn" id="mobileMenuBtn" type="button" aria-expanded="false" aria-controls="rail">章节</button>`);
    $("mobileMenuBtn").addEventListener("click", () => {
      const rail = $("rail");
      const open = rail.classList.toggle("mobile-open");
      $("mobileMenuBtn").setAttribute("aria-expanded", String(open));
    });
    $("rail").addEventListener("click", (event) => {
      if (!event.target.closest("[data-go]")) return;
      $("rail").classList.remove("mobile-open");
      $("mobileMenuBtn").setAttribute("aria-expanded", "false");
    });
  }

  installMobileMenu();

  // Re-render once so direct hash visits also use the upgraded renderers.
  if (location.hash && location.hash !== "#cover") navigate(location.hash);
  else updateProgress();
})();
