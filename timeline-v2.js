(() => {
  const extensions = window.DecadeExtensions;
  if (!extensions) throw new Error("extension-runtime.js must load before timeline-v2.js");

  const CATEGORIES = {
    work: "工作",
    study: "学习",
    love: "爱情",
    family: "家庭",
    money: "财务",
    place: "城市",
    health: "身体",
    other: "其他"
  };

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  function ageNumber(value, fallback) {
    const parsed = Number.parseInt(value, 10);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  function timelineSettings(store) {
    const legacyNow = ageNumber(store.timeline?.now, 20);
    const startAge = clamp(ageNumber(store.timelineSettings?.startAge, legacyNow), 15, 60);
    const proposedEnd = ageNumber(store.timelineSettings?.endAge, startAge + 10);
    const endAge = clamp(Math.max(proposedEnd, startAge + 1), startAge + 1, 70);
    return { startAge, endAge };
  }

  function milestonesFor(store, startAge, endAge) {
    return (store.timelineMilestones || [])
      .map((item) => ({
        id: String(item.id || ""),
        age: ageNumber(item.age, startAge),
        category: CATEGORIES[item.category] ? item.category : "other",
        title: String(item.title || "").trim(),
        note: String(item.note || "").trim()
      }))
      .filter((item) => item.id && item.title && item.age >= startAge && item.age <= endAge)
      .sort((a, b) => a.age - b.age || a.title.localeCompare(b.title, "zh-CN"));
  }

  function saveSettings(startAge, endAge) {
    const store = loadStore();
    const timeline = { ...(store.timeline || {}), now: String(startAge) };
    saveStore({
      timeline,
      timelineSettings: { startAge, endAge }
    });
  }

  function saveMilestones(items) {
    saveStore({ timelineMilestones: items });
  }

  function milestoneCard(item) {
    return `
      <article class="milestone-card" data-category="${item.category}">
        <div class="milestone-meta">
          <span>${escapeHtml(CATEGORIES[item.category])}</span>
          <button type="button" data-delete-milestone="${escapeAttr(item.id)}" aria-label="删除 ${escapeAttr(item.title)}">×</button>
        </div>
        <strong>${escapeHtml(item.title)}</strong>
        ${item.note ? `<p>${escapeHtml(item.note)}</p>` : ""}
      </article>`;
  }

  function decadeColumns(milestones, startAge, endAge) {
    const ages = Array.from({ length: endAge - startAge + 1 }, (_, index) => startAge + index);
    return ages.map((age) => {
      const items = milestones.filter((item) => item.age === age);
      return `
        <div class="decade-column ${items.length ? "has-milestone" : ""}">
          <div class="age-badge">${age}<small>岁</small></div>
          <div class="age-line"><i></i></div>
          <div class="milestone-stack">
            ${items.map(milestoneCard).join("")}
          </div>
        </div>`;
    }).join("");
  }

  function collisionSummary(milestones) {
    const counts = new Map();
    milestones.forEach((item) => counts.set(item.age, (counts.get(item.age) || 0) + 1));
    const collisions = [...counts.entries()].filter(([, count]) => count >= 2).sort((a, b) => b[1] - a[1] || a[0] - b[0]);
    if (!collisions.length) {
      return `<p><strong>目前没有明显拥挤点。</strong>继续把毕业、换城、结婚、育儿、职业跃迁等放进去，时间冲突会更清楚。</p>`;
    }
    const [age, count] = collisions[0];
    return `<p><strong>${age} 岁最拥挤：</strong>你已经放了 ${count} 件重要事件。不是说不能同时做，而是值得提前问一句：时间、钱和精力够不够？</p>`;
  }

  function legacyVisionFields(timeline) {
    const fields = [
      ["work", "工作", "10 年后你希望自己在做什么？"],
      ["love", "爱情 / 关系", "你希望身边是谁？关系是什么状态？"],
      ["money", "财务", "收入、储蓄、自由度希望到哪里？"],
      ["place", "城市 / 住所", "你希望在哪里生活？"],
      ["health", "身体", "体能、作息、健康希望是什么状态？"],
      ["kid", "孩子 / 家庭", "要不要、几个、大约何时？"],
      ["block", "可能撞车的事", "哪些目标会争夺同一段时间？"]
    ];

    return fields.map(([key, label, placeholder]) => `
      <div class="vision-field">
        <label>${label}</label>
        <textarea data-tl="${key}" placeholder="${placeholder}">${escapeHtml(timeline[key] || "")}</textarea>
      </div>`).join("");
  }

  function renderTimelineV2(store = loadStore()) {
    const timeline = store.timeline || {};
    const { startAge, endAge } = timelineSettings(store);
    const milestones = milestonesFor(store, startAge, endAge);

    $("main").innerHTML = `
      <p class="ch-kicker">练习 · 时间不是无限画布</p>
      <h1 class="ch-title">十年时间线 2.0</h1>
      <p class="ch-thesis">不要只说“以后”。给重要的事一个年龄，看看它们是否全挤在同一个以后。</p>

      <section class="timeline-settings" aria-label="时间范围">
        <div class="range-field">
          <label for="timelineStartAge">起点年龄</label>
          <input id="timelineStartAge" type="number" min="15" max="60" value="${startAge}" inputmode="numeric" />
        </div>
        <div class="range-arrow" aria-hidden="true">→</div>
        <div class="range-field">
          <label for="timelineEndAge">终点年龄</label>
          <input id="timelineEndAge" type="number" min="16" max="70" value="${endAge}" inputmode="numeric" />
        </div>
        <p>${endAge - startAge} 年窗口 · 先把大石头放进去，再看小事往哪里塞。</p>
      </section>

      <section class="decade-board" aria-label="人生时间线">
        <div class="decade-scroll">
          <div class="decade-grid" style="--age-count:${endAge - startAge + 1}">
            ${decadeColumns(milestones, startAge, endAge)}
          </div>
        </div>
      </section>

      <section class="collision-card">
        <span>拥挤检测</span>
        ${collisionSummary(milestones)}
      </section>

      <section class="milestone-composer">
        <div class="composer-heading">
          <div>
            <p class="ch-kicker">放一块大石头</p>
            <h2>新增里程碑</h2>
          </div>
          <p>比如：硕士毕业、第一次全职工作、搬去新城市、结婚、攒到第一桶金。</p>
        </div>
        <div class="composer-grid">
          <div class="field compact-field">
            <label for="milestoneAge">年龄</label>
            <input id="milestoneAge" type="number" min="${startAge}" max="${endAge}" value="${Math.min(startAge + 1, endAge)}" />
          </div>
          <div class="field compact-field">
            <label for="milestoneCategory">类别</label>
            <select id="milestoneCategory">
              ${Object.entries(CATEGORIES).map(([value, label]) => `<option value="${value}">${label}</option>`).join("")}
            </select>
          </div>
          <div class="field milestone-title-field">
            <label for="milestoneTitle">发生什么</label>
            <input id="milestoneTitle" maxlength="60" placeholder="例如：完成硕士 / 去伦敦工作" />
          </div>
          <div class="field milestone-note-field">
            <label for="milestoneNote">备注（可选）</label>
            <input id="milestoneNote" maxlength="120" placeholder="为什么重要 / 前置条件" />
          </div>
          <button class="primary add-milestone" id="addMilestone" type="button">加到时间线</button>
        </div>
      </section>

      <section class="vision-section">
        <div class="vision-heading">
          <div>
            <p class="ch-kicker">以终为始</p>
            <h2>${endAge} 岁时，你希望看到什么？</h2>
          </div>
          <p>这些是原版时间线里的文字答案，全部保留。可视化负责“何时”，这里负责“为什么”和“想要什么”。</p>
        </div>
        <div class="vision-grid">
          ${legacyVisionFields(timeline)}
        </div>
      </section>

      <p class="save-hint">所有内容自动保存在这台浏览器里，也会包含在「我的十年 → 导出备份」中。</p>`;

    const updateRange = () => {
      const nextStart = clamp(ageNumber($("timelineStartAge").value, startAge), 15, 60);
      const nextEnd = clamp(ageNumber($("timelineEndAge").value, nextStart + 10), nextStart + 1, 70);
      saveSettings(nextStart, nextEnd);
      renderTimelineV2(loadStore());
    };

    $("timelineStartAge").addEventListener("change", updateRange);
    $("timelineEndAge").addEventListener("change", updateRange);

    $("addMilestone").addEventListener("click", () => {
      const title = $("milestoneTitle").value.trim();
      if (!title) {
        $("milestoneTitle").focus();
        return;
      }
      const currentStore = loadStore();
      const current = [...(currentStore.timelineMilestones || [])];
      current.push({
        id: `m-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        age: clamp(ageNumber($("milestoneAge").value, startAge), startAge, endAge),
        category: CATEGORIES[$("milestoneCategory").value] ? $("milestoneCategory").value : "other",
        title,
        note: $("milestoneNote").value.trim()
      });
      saveMilestones(current);
      renderTimelineV2(loadStore());
    });

    $("main").querySelectorAll("[data-delete-milestone]").forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.dataset.deleteMilestone;
        const current = (loadStore().timelineMilestones || []).filter((item) => String(item.id) !== id);
        saveMilestones(current);
        renderTimelineV2(loadStore());
      });
    });

    $("main").querySelectorAll("[data-tl]").forEach((element) => {
      element.addEventListener("input", () => {
        const nextTimeline = { ...(loadStore().timeline || {}) };
        nextTimeline[element.dataset.tl] = element.value;
        saveStore({ timeline: nextTimeline });
      });
    });
  }

  extensions.registerToolRenderer("timeline", renderTimelineV2);
})();
