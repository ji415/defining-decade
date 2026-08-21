(() => {
  const SEARCH_FIELDS = [
    ["title", 8],
    ["thesis", 6],
    ["ask", 5],
    ["truth", 4],
    ["trap", 3],
    ["evidence", 2],
    ["story", 2]
  ];

  function normalise(value) {
    return String(value || "").toLocaleLowerCase("zh-CN").replace(/\s+/g, " ").trim();
  }

  function chapterText(chapter) {
    return [
      chapter.title,
      chapter.thesis,
      chapter.ask,
      chapter.truth,
      chapter.trap,
      chapter.evidence,
      chapter.story,
      ...(chapter.monday || [])
    ].join(" ");
  }

  function scoreChapter(chapter, query) {
    const q = normalise(query);
    if (!q) return 0;
    let score = 0;

    SEARCH_FIELDS.forEach(([key, weight]) => {
      const text = normalise(chapter[key]);
      if (!text) return;
      if (text === q) score += weight * 4;
      else if (text.startsWith(q)) score += weight * 2;
      else if (text.includes(q)) score += weight;
    });

    (chapter.monday || []).forEach((action) => {
      if (normalise(action).includes(q)) score += 4;
    });

    return score;
  }

  function findSnippet(chapter, query) {
    const q = normalise(query);
    const fields = [chapter.thesis, chapter.truth, chapter.evidence, chapter.story, ...(chapter.monday || [])];
    const source = fields.find((text) => normalise(text).includes(q)) || chapter.thesis || chapter.story || "";
    const raw = String(source);
    const lower = normalise(raw);
    const index = lower.indexOf(q);
    const start = Math.max(0, index > -1 ? index - 28 : 0);
    const end = Math.min(raw.length, start + 92);
    return `${start > 0 ? "…" : ""}${raw.slice(start, end)}${end < raw.length ? "…" : ""}`;
  }

  function highlight(text, query) {
    const raw = String(text || "");
    const q = String(query || "").trim();
    if (!q) return escapeHtml(raw);

    const lower = raw.toLocaleLowerCase("zh-CN");
    const needle = q.toLocaleLowerCase("zh-CN");
    const index = lower.indexOf(needle);
    if (index < 0) return escapeHtml(raw);

    return `${escapeHtml(raw.slice(0, index))}<mark>${escapeHtml(raw.slice(index, index + q.length))}</mark>${escapeHtml(raw.slice(index + q.length))}`;
  }

  function search(query) {
    const q = query.trim();
    if (!q) return [];
    return CHAPTERS
      .map((chapter) => ({ chapter, score: scoreChapter(chapter, q) }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score || Number(a.chapter.n) - Number(b.chapter.n))
      .slice(0, 12);
  }

  function resultHtml(item, query) {
    const { chapter } = item;
    const store = loadStore();
    const completed = new Set(store.completed || []);
    const bookmarked = new Set(store.bookmarks || []);
    const status = [completed.has(chapter.id) ? "已完成" : "", bookmarked.has(chapter.id) ? "已收藏" : ""].filter(Boolean).join(" · ");
    const snippet = findSnippet(chapter, query);

    return `
      <button class="search-result" type="button" data-search-go="#c/${escapeAttr(chapter.id)}">
        <span class="search-result-n">${escapeHtml(chapter.n)}</span>
        <span class="search-result-body">
          <span class="search-result-meta">${escapeHtml(PARTS[chapter.part].label)}${status ? ` · ${escapeHtml(status)}` : ""}</span>
          <strong>${highlight(chapter.title, query)}</strong>
          <small>${highlight(snippet, query)}</small>
        </span>
        <span class="search-result-arrow">→</span>
      </button>`;
  }

  function renderResults(query) {
    const box = $("globalSearchResults");
    const count = $("globalSearchCount");
    const results = search(query);

    if (!query.trim()) {
      count.textContent = "搜索 22 篇章节";
      box.innerHTML = `
        <div class="search-empty search-tips">
          <strong>试试这些词</strong>
          <div>
            <button type="button" data-search-term="身份资本">身份资本</button>
            <button type="button" data-search-term="弱连接">弱连接</button>
            <button type="button" data-search-term="焦虑">焦虑</button>
            <button type="button" data-search-term="婚姻">婚姻</button>
            <button type="button" data-search-term="时间">时间</button>
          </div>
          <p>支持标题、核心判断、故事、证据、误区和“周一行动”。</p>
        </div>`;
      return;
    }

    count.textContent = results.length ? `找到 ${results.length} 个相关章节` : "没有找到";
    box.innerHTML = results.length
      ? results.map((item) => resultHtml(item, query)).join("")
      : `<div class="search-empty"><strong>没有命中。</strong><p>换一个更短的关键词试试，例如“工作”“孩子”“自信”。</p></div>`;
  }

  function openSearch(initial = "") {
    const dialog = $("globalSearchDialog");
    const input = $("globalSearchInput");
    if (!dialog.open) dialog.showModal();
    input.value = initial;
    renderResults(initial);
    requestAnimationFrame(() => input.focus());
  }

  function closeSearch() {
    const dialog = $("globalSearchDialog");
    if (dialog?.open) dialog.close();
  }

  function installSearch() {
    if ($("globalSearchDialog")) return;

    const topRight = document.querySelector(".top-right");
    if (topRight) {
      const menu = $("mobileMenuBtn");
      const button = document.createElement("button");
      button.className = "global-search-btn";
      button.id = "globalSearchBtn";
      button.type = "button";
      button.setAttribute("aria-label", "搜索章节");
      button.innerHTML = `<span>⌕</span><b>搜索</b><kbd>⌘K</kbd>`;
      if (menu) topRight.insertBefore(button, menu);
      else topRight.appendChild(button);
    }

    document.body.insertAdjacentHTML("beforeend", `
      <dialog class="global-search-dialog" id="globalSearchDialog" aria-label="搜索章节">
        <div class="search-shell">
          <header class="search-header">
            <span class="search-icon" aria-hidden="true">⌕</span>
            <input id="globalSearchInput" type="search" autocomplete="off" placeholder="搜索：身份资本、焦虑、婚姻、工作……" aria-label="搜索章节内容" />
            <button id="globalSearchClose" type="button" aria-label="关闭搜索">ESC</button>
          </header>
          <div class="search-summary" id="globalSearchCount">搜索 22 篇章节</div>
          <div class="search-results" id="globalSearchResults"></div>
        </div>
      </dialog>`);

    $("globalSearchBtn")?.addEventListener("click", () => openSearch());
    $("globalSearchClose").addEventListener("click", closeSearch);
    $("globalSearchInput").addEventListener("input", (event) => renderResults(event.target.value));

    $("globalSearchDialog").addEventListener("click", (event) => {
      if (event.target === $("globalSearchDialog")) closeSearch();
      const term = event.target.closest("[data-search-term]");
      if (term) {
        $("globalSearchInput").value = term.dataset.searchTerm;
        renderResults(term.dataset.searchTerm);
        $("globalSearchInput").focus();
      }
      const result = event.target.closest("[data-search-go]");
      if (result) {
        closeSearch();
        go(result.dataset.searchGo);
      }
    });

    document.addEventListener("keydown", (event) => {
      const target = event.target;
      const editing = target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        openSearch();
        return;
      }
      if (event.key === "/" && !editing && !$("globalSearchDialog").open) {
        event.preventDefault();
        openSearch();
      }
    });
  }

  installSearch();
})();
