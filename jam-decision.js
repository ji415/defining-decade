(() => {
  const CRITERIA = [
    { key: "interest", label: "兴趣", hint: "我真的愿意长期投入吗" },
    { key: "ability", label: "能力", hint: "现有能力和学习曲线匹配吗" },
    { key: "capital", label: "身份资本", hint: "它会沉淀可迁移的经验吗" },
    { key: "opportunity", label: "机会空间", hint: "未来机会、选择权和上升空间如何" },
    { key: "life", label: "生活匹配", hint: "它和我想要的生活方式兼容吗" }
  ];

  function scoreState(store, index) {
    const current = (store.jamScores || [])[index] || {};
    return Object.fromEntries(CRITERIA.map((criterion) => [criterion.key, Math.min(5, Math.max(1, Number(current[criterion.key]) || 3))]));
  }

  function averageScore(scores) {
    const values = CRITERIA.map((criterion) => Number(scores[criterion.key]) || 0);
    return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
  }

  function ranking(store) {
    const jams = store.jams || ["", "", "", "", "", ""];
    return jams
      .map((name, index) => ({
        index,
        name: String(name || "").trim(),
        score: averageScore(scoreState(store, index))
      }))
      .filter((item) => item.name)
      .sort((a, b) => b.score - a.score || a.index - b.index);
  }

  function criterionRow(index, criterion, value) {
    return `
      <label class="jam-criterion">
        <span>
          <b>${escapeHtml(criterion.label)}</b>
          <small>${escapeHtml(criterion.hint)}</small>
        </span>
        <input type="range" min="1" max="5" step="1" value="${value}" data-jam-score="${index}" data-criterion="${criterion.key}" aria-label="第 ${index + 1} 瓶 ${escapeAttr(criterion.label)}评分" />
        <output data-score-output="${index}-${criterion.key}">${value}</output>
      </label>`;
  }

  function jamCard(store, index) {
    const jams = store.jams || ["", "", "", "", "", ""];
    const pick = store.jamPick ?? -1;
    const scores = scoreState(store, index);
    const avg = averageScore(scores);
    const active = pick === index;

    return `
      <article class="decision-jam ${active ? "chosen" : ""}" data-jam-card="${index}">
        <header>
          <div>
            <span class="decision-jam-n">0${index + 1}</span>
            <strong>第 ${index + 1} 瓶</strong>
          </div>
          <div class="jam-score-badge" data-jam-average="${index}">
            <b>${avg.toFixed(1)}</b><span>/ 5</span>
          </div>
        </header>

        <textarea data-jam-name="${index}" placeholder="例如：AI Engineer / Robotics / Backend / Research">${escapeHtml(jams[index] || "")}</textarea>

        <div class="jam-criteria">
          ${CRITERIA.map((criterion) => criterionRow(index, criterion, scores[criterion.key])).join("")}
        </div>

        <button class="jam-pick ${active ? "active" : ""}" type="button" data-jam-pick="${index}">
          ${active ? "✓ 这是我现在选择的瓶" : "我买这瓶"}
        </button>
      </article>`;
  }

  function rankingHtml(store) {
    const ranks = ranking(store);
    const picked = store.jamPick ?? -1;

    if (!ranks.length) {
      return `
        <div class="jam-ranking-empty">
          <strong>先写下至少两个真实选项。</strong>
          <p>不是“中彩票以后做什么”，而是你接下来 1–3 年真的可能去做什么。</p>
        </div>`;
    }

    const best = ranks[0];
    return `
      <div class="jam-ranking-head">
        <div>
          <span>DECISION SIGNAL</span>
          <h2>当前评分</h2>
        </div>
        <p>评分是镜子，不是法官。它负责暴露偏好，不负责替你承担结果。</p>
      </div>
      <div class="jam-ranking-list">
        ${ranks.map((item, rankIndex) => `
          <div class="jam-rank ${item.index === picked ? "picked" : ""} ${rankIndex === 0 ? "best" : ""}">
            <b>${rankIndex + 1}</b>
            <span>
              <strong>${escapeHtml(item.name)}</strong>
              <small>${item.index === picked ? "你的当前选择" : rankIndex === 0 ? "评分最高" : ""}</small>
            </span>
            <div class="rank-meter"><i style="width:${(item.score / 5) * 100}%"></i></div>
            <em>${item.score.toFixed(1)}</em>
          </div>`).join("")}
      </div>
      ${picked >= 0 && best.index !== picked ? `
        <div class="jam-tension">
          <strong>有意思：你选的不是评分最高那瓶。</strong>
          <p>这不代表你选错了。问自己：模型漏掉了什么？风险偏好、直觉、某个人、某个不能量化的理由？把那个理由说清楚。</p>
        </div>` : ""}`;
  }

  function persistScore(index, criterion, value) {
    const scores = [...(loadStore().jamScores || [])];
    scores[index] = { ...(scores[index] || {}), [criterion]: Number(value) };
    saveStore({ jamScores: scores });
  }

  function refreshCardScore(index) {
    const store = loadStore();
    const avg = averageScore(scoreState(store, index));
    const badge = $("main").querySelector(`[data-jam-average="${index}"] b`);
    if (badge) badge.textContent = avg.toFixed(1);
    const rankingBox = $("jamRanking");
    if (rankingBox) rankingBox.innerHTML = rankingHtml(store);
  }

  renderJam = function renderJamDecision(store = loadStore()) {
    const jams = store.jams || ["", "", "", "", "", ""];
    $("main").innerHTML = `
      <p class="ch-kicker">练习 · 决策矩阵</p>
      <h1 class="ch-title">六瓶果酱</h1>
      <p class="ch-thesis">把“我可以做任何事”压缩成最多六个真实选项，然后比较，而不是在无限可能里漂着。</p>

      <div class="decision-guide">
        <strong>怎么打分</strong>
        <p>每项 1–5 分。不要打“这个方向客观上有多牛”，只打“它和现在的我有多匹配”。不知道时给 3 分，别假装精确。</p>
      </div>

      <section class="jam-ranking" id="jamRanking">${rankingHtml(store)}</section>

      <div class="decision-jam-grid">
        ${jams.map((_, index) => jamCard(store, index)).join("")}
      </div>

      <div class="jam-footnote">
        <strong>记住：</strong>高分选项值得认真验证，不等于必须选。低分但你依然强烈想选的选项，反而值得追问“为什么”。
      </div>`;

    $("main").querySelectorAll("[data-jam-name]").forEach((textarea) => {
      textarea.addEventListener("input", () => {
        const current = [...(loadStore().jams || ["", "", "", "", "", ""])];
        current[+textarea.dataset.jamName] = textarea.value;
        saveStore({ jams: current });
        const rankingBox = $("jamRanking");
        if (rankingBox) rankingBox.innerHTML = rankingHtml(loadStore());
      });
    });

    $("main").querySelectorAll("[data-jam-score]").forEach((slider) => {
      slider.addEventListener("input", () => {
        const index = +slider.dataset.jamScore;
        const criterion = slider.dataset.criterion;
        const output = $("main").querySelector(`[data-score-output="${index}-${criterion}"]`);
        if (output) output.textContent = slider.value;
        persistScore(index, criterion, slider.value);
        refreshCardScore(index);
      });
    });

    $("main").querySelectorAll("[data-jam-pick]").forEach((button) => {
      button.addEventListener("click", () => {
        const index = +button.dataset.jamPick;
        const currentPick = loadStore().jamPick ?? -1;
        saveStore({ jamPick: currentPick === index ? -1 : index });
        renderJamDecision(loadStore());
      });
    });
  };
})();
