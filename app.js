const STORE_KEY = "decade-companion-v1";

const CHAPTERS = [
  {
    id: "preface",
    part: "open",
    n: "00",
    title: "什么是不可辜负的十年",
    thesis: "一生里大约 80% 最具决定性的时刻，发生在 35 岁之前。当时它们看起来微不足道。",
    quote: "现在那些看似微不足道的时刻，可能正决定着你的未来。",
    quoteBy: "梅格·杰伊",
    person: null,
    story: "波士顿大学和密歇根大学收集成功人士的人生故事，寻找“决定性时刻”。重要经历从出生到死亡都有，但真正改写轨迹的，几乎都挤在二十多岁：遇到的人、做过的工作、回拨的电话、聊过的那几句。",
    evidence: "30 岁之后，学业、职业、伴侣、房贷开始锁住路径。决定性时刻不会越来越多，只会沿已有轨迹微调。这十年不一定精确卡在 20 到 30，也可能是 22–32 或 25–35。确定的是：你正处在最贵的窗口。",
    trap: "二十多岁还早，真正的人生 30 岁才开始。",
    truth: "30 岁之后你多半是在已有航线上微调。起飞时偏一度，终点可能是阿拉斯加或斐济。",
    monday: ["写下 35 岁前你希望发生的 5 个决定性时刻", "圈出本周可以动手的一件小事"],
    ask: "你希望自己在 35 岁前经历哪些决定性时刻？"
  },
  {
    id: "intro",
    part: "open",
    n: "01",
    title: "真正的人生",
    thesis: "20 多岁就是真正的人生。30 岁不是新的 20 岁。推迟一件事，不等于更好地做这件事。",
    quote: "未曾活过的人生，是不值得审视的。",
    quoteBy: "谢尔登·科普",
    person: { name: "凯特", meta: "26 岁 · 服务生 · 没驾照" },
    story: "凯特以为二十多岁该尽情享受父母错过的自由，结果焦虑得像一座山。父亲带她来咨询，她却用周末八卦填满时间。同学聚餐那天她发现：别人有工作、未婚夫、人生使命，自己什么都没有。她说再也不信“未来自然会好”这种鬼话。",
    evidence: "文化一边说二十多岁无关紧要（巨婴、奥德赛时光），一边把 18–35 岁做成唯一被崇拜的年龄。结果是挥霍最关键的十年。工作、爱情、大脑、生育：40 岁绝不是新的 30 岁。把挣钱、结婚、买房、升职、生两三个孩子全堆到 30 岁后，等待你的是兼容性极差的挤压。",
    trap: "先把童年谈清楚，或去欧洲找自我，真正的人生以后再说。",
    truth: "真正让你不开心的是工作日，不是周末。活得有目的性，需要信息和行动，不会随年龄自动出现。",
    monday: ["把“30 岁是新的 20 岁”从口头禅里删掉", "列出一件你一直推迟、但 30 岁后会更难做的事，本周启动"],
    ask: "多出来的时间，你想拿来收获更好的未来，还是拿来逃避？"
  },
  {
    id: "capital",
    part: "work",
    n: "02",
    title: "身份资本",
    thesis: "“我是谁”不是等灵光乍现。它是一点一点攒出来的，能拿去换机会的资本。",
    quote: "我们不是突然来到这个世界的，而是一点一滴诞生于这个世界的。",
    quoteBy: "玛丽·安廷",
    person: { name: "海伦", meta: "27 岁 · 保姆 · 等灵光" },
    story: "海伦以为自己该经历身份认同危机，从医学预科转到艺术，毕业后自由摄影付不起电话费，改做保姆和瑜伽。朋友开始可怜她。她想去咖啡馆，因为“很酷、不商业”；作者劝她去动画工作室做临时工。半年转正，被导演看中，去了洛杉矶拍电影。",
    evidence: "埃里克森提出身份认同危机，自己却在 25 岁教书、26 岁接受分析训练、30 岁已有职业——边探索边攒身份资本。针对 500 万工作者 40 年的研究：一生能赚多少，很大程度上在二十多岁定方向。仅 9 个月就业不足，动机和抑郁可能比失业更差。收入高峰多在 40 多岁。",
    trap: "先搞清楚我是谁，再开始真正的工作。咖啡馆也很自由。",
    truth: "探索和承诺要同时进行。下一份工作问的不是酷不酷，是身份资本含量高不高。没人会在面试时兴奋地说：讲讲你做保姆的经历。",
    monday: ["列出 10 项现有身份资本（含写不进简历的）", "写下未来 12 个月要攒的 3 项", "下一份机会用“资本含量”而不是“好不好看”来选"],
    ask: "你接下来想积累的三项身份资本是什么？"
  },
  {
    id: "weakties",
    part: "work",
    n: "03",
    title: "弱连接",
    thesis: "改写人生的，往往不是城市部落里的死党，而是几乎不认识的人。",
    quote: "真正决定他们生活的，不是自己频繁来往的那一小群人，而是他们未能想象的、更大的一群人。",
    quoteBy: "罗斯·科泽",
    person: { name: "科尔 & 贝齐", meta: "工程学毕业生 · 雕塑家" },
    story: "科尔毕业后“彻底放松”，和酒吧认识的人合租抱怨。姐姐硬拉他去室友的 30 岁派对，遇见贝齐；贝齐为了遇见新的人回复了“好”。科尔靠几乎不联系的高中同学内推创业公司，十年后成 CIO，两人结婚。作者这本书也来自误寄的一箱书和一个几乎没见过的编辑。",
    evidence: "格兰诺维特：超过四分之三的新工作来自“见过几面”的人。强连接同质，给安慰；弱连接接圈外。成人社交圈只会随年龄变窄。助人会产生“助人快感”，多数前辈愿意帮一个具体、短、做过功课的忙。",
    trap: "我讨厌社交 / 我想靠自己 / 别人都有关系我没有。",
    truth: "弱连接不是裙带。请求要具体：不要“喝杯咖啡聊聊我该做什么”，要“能否看一眼这份提案”。富兰克林效应：请人帮过小忙后，对方更愿意再帮。",
    monday: ["列出 5 个弱连接", "准备一个对方 2 分钟就能帮的请求", "今天发出其中一封"],
    ask: "现在有什么正阻碍你去联系他们？"
  },
  {
    id: "unthought",
    part: "work",
    n: "04",
    title: "未知的已知",
    thesis: "你不是困在没有陆地的大海里。你站在大约六种果酱前面，只是不敢承认自己已经知道。",
    quote: "年少时，寻找自我并非执着所有的可能性，而是以新的可能性，直面对自己而言真正重要的事物。",
    quoteBy: "爱利克·埃里克森",
    person: { name: "伊恩", meta: "25 岁 · 自行车店 · “可以做任何事”" },
    story: "伊恩说自己在一片没有标记的海里，等船来救。父母说“你最棒、未来无可限量”，朋友说“我们才不做决定”。作者把比喻改成果酱实验。摊开之后，六种选项里真正发光的是数码设计。他害怕的不是不知道，是一知道就要面对可能失败。",
    evidence: "希娜·艾扬格果酱实验：24 种口味只有 3% 人买，6 种有 30% 人买。选择越少，越可能选。博拉斯的“未知的已知”：你其实知道，只是意识不肯认。敢于做决定的年轻人，比在海里挣扎的人更幸福。",
    trap: "先想清楚哪个方向绝对正确，再游。不问中彩票想做什么，就不知道真正想要什么。",
    truth: "没中彩票，什么事你能做好、能谋生、愿意投入时间？不做选择并不安全，三四十岁会看见后果。你不会一辈子只买这一瓶果酱。",
    monday: ["把“任何事”收成最多 6 个真实选项", "划掉不是你的（法学院、别人的船）", "选一瓶，本周迈出最小一步"],
    ask: "你一直在逃避、其实已经知道的那件事，是什么？"
  },
  {
    id: "instagram",
    part: "work",
    n: "05",
    title: "Instagram 上的完美人生",
    thesis: "没有对比，就没有伤害。社交媒体约等于向上社会比较。",
    quote: "如果我们只想幸福，那其实易如反掌；但如果我们想比别人更幸福，那将会难于登天。",
    quoteBy: "孟德斯鸠",
    person: { name: "塔莉娅", meta: "本硕连读毕业 · 旧金山 · 崩溃" },
    story: "塔莉娅毕业后以为真正的人生开始了，派对和自由却让她失眠大哭。她说 Facebook 上大家的人生都那么完美。一位来访者觉得“所有朋友都开始生孩子”——那是关注列表里的 900 人，不是真实社交圈。",
    evidence: "用得越多、平台越多，越容易焦虑、抑郁、自尊低、饮食失调和错失恐惧。比较以毫秒完成，安抚自己却要很久。二十多岁本就是一生最孤独的阶段之一，社交软件把孤独做成了人气比赛。",
    trap: "别人都有更好的工作、身材、伴侣、假期。我落后了。",
    truth: "你在拿别人的面子比自己的里子。只和昨天的自己比。",
    monday: ["记一周屏幕时间", "取关 10 个让你向上比较的账号", "把省下的一小时还给睡觉、出门或一项身份资本"],
    ask: "你的比较，是在激励你，还是在让你动弹不得？"
  },
  {
    id: "glory",
    part: "work",
    n: "06",
    title: "追求荣耀",
    thesis: "目标来自内在向往；“应该”来自外在评判。完美是卓越的敌人。",
    quote: "完美，是卓越的敌人。",
    quoteBy: "伏尔泰",
    person: { name: "塔莉娅", meta: "市场分析员 · 想回家被说成逃兵" },
    story: "她觉得自己应该去帮孤儿、应该读博、人生应该让人喊哇，后来又觉得应该像《美食，祈祷，恋爱》去法国三年。真正想要的是回纳什维尔靠近家人、做品牌经理、成家。30 多岁的邻居还在犹豫考 GRE，公寓里一堆乱家具。塔莉娅联系已经关申请的公司，靠弱连接拿到面试，走了。",
    evidence: "卡伦·霍妮称之为“应该的暴政”。刚入社会本来就要做不光鲜的事。大学毕业生起薪中位数和学生贷款中位数都大约在四万五千美元量级。发展潜能常常是 30、40、50 岁的事。",
    trap: "安定等于妥协。探索永远好过回家。",
    truth: "成年人的生活建立在人物、地点、事情上：和谁在一起、住哪里、靠什么谋生。承认平凡、交付眼前的事，才是投资自己现有的才能。",
    monday: ["列出你的“应该”和你的“想要”，分成两列", "划掉一条不是你的应该", "如果想安定某处，本周做一件让它更真的事"],
    ask: "你是在发展潜能，还是在追求别人眼里的荣耀？"
  },
  {
    id: "custom",
    part: "work",
    n: "07",
    title: "定制化的人生",
    thesis: "独一无二不是拒绝标准零件，而是从车轮开始，亲手组装。",
    quote: "如何清楚地描述自己的人生、生存于当下的世界和未来的可能性，是我们每个人的必修课。",
    quoteBy: "大卫·怀特",
    person: { name: "伊恩", meta: "骑定制自行车 · 不愿朝九晚五" },
    story: "伊恩要与众不同，把上班看成扼杀可能。作者用他的定制车作比喻：先有车轮尺寸，再加零件，越骑越独特。他重写申请故事——从小画画、被叫乐高先生，到建筑学与认知科学——拿到华盛顿的设计培训生。几年后他写信：做出决定的那一刻是解脱，工作带来了更多可能。",
    evidence: "面试官每天淹没在 GPA 和证书里。二十多岁缺的是过去的成就，多的是未来的可能。一个复杂但连贯的故事，胜过一堆数据。人力资源主管说：不必假装这里是五年梦想，但要走得明白。",
    trap: "选了一条路，就放弃了其他所有路。故事写清楚等于限制自己。",
    truth: "身份不能建立在“我不是谁”上。故事不是合同，是介绍。踏入社会不是结束，是开始。",
    monday: ["用三句话写：过去如何接到现在，现在如何指向下一步", "把这篇东西读给一个不太熟的人听，改到他们听得懂"],
    ask: "你的定制人生，第一颗标准零件是什么？"
  },
  {
    id: "table",
    part: "love",
    n: "08",
    title: "台面上的话题",
    thesis: "和谁结婚，可能是你最重要的决定。学校不教。二十多岁就要认真对待，而不是 30 岁音乐停了再抓椅子。",
    quote: "如今的社会，让我们更多地去关注那些实际上对于我们幸福影响甚微的事情，而不去关注那些真正决定我们幸福的事情，比如和谁结婚。",
    quoteBy: "大卫·布鲁克斯",
    person: { name: "亚历克丝", meta: "26 岁 · 作者的第一位来访者" },
    story: "作者当研究生时觉得二十多岁姑娘“还没到结婚的时候”，督导说：她不会和现在这个男人结婚，但可能和下一个结婚。若真想在婚姻上帮她，最佳时机是结婚之前。三十多岁的来访者开始恐慌别人的订婚状态；有人说最好的男朋友是 25 岁那个，当时觉得还没到时候。",
    evidence: "美国均婚年龄大约女 28、男 30；仍有约四分之三的年轻人想结婚，多数会在 35 岁前结合。约 70% 单身者渴望爱情，约 10% 表示很随意。青少年婚最不稳；25 岁之后再晚婚并不继续降低离婚率。晚婚不等于更幸福。离婚率仍约 45%。",
    trap: "现在认真谈感情显得太传统。先把工作搞顺，爱情以后自然会出现。",
    truth: "选择伴侣等于选择金钱、家庭、健康、性、退休甚至死亡的绑定方式。失败的婚姻不能从简历上一笔勾销。",
    monday: ["像对待工作一样，写下你对下一段关系的三条硬标准", "停止把明知没有未来的关系当成消遣"],
    ask: "你对待爱情，会和对待工作或学习一样认真吗？"
  },
  {
    id: "family",
    part: "love",
    n: "09",
    title: "选择你的家庭",
    thesis: "成年之后，你没办法只选择朋友。你正在选择下一个家庭。",
    quote: "在这诡谲多变的人生里，家，是我们永恒的起点及终点。",
    quoteBy: "安东尼·布兰德",
    person: { name: "埃玛", meta: "雅斐士来访者 · 父亲自杀 · 母亲酗酒" },
    story: "埃玛光鲜、好相处、成绩顶尖，紧急联系人那一栏却填不出来。她对工作极野心，对爱情满不在乎。男朋友爱打游戏、会因嫉妒吼她；见对方父母后她在床上默默哭。分手后几年，她嫁了人，公婆搬来帮忙，小姑子住附近——紧急联系人不够写了。",
    evidence: "约四分之三的年轻人经历过重大挫折。婚姻仍是两个家庭的结合。新家庭将决定未来幸福，而不是“没办法选择原生家庭”这句话。",
    trap: "我的家不完美，所以不能期望对方的家。爱情是奢侈品，工作才是生存。",
    truth: "对爱情完全不害怕，说明还没认真想过它意味着什么。选择家庭是主动权，不是等丘比特。",
    monday: ["写下你想要的家庭长什么样，以及绝对不要重复的原生模式", "用这个清单看一看你现在的关系"],
    ask: "你希望有一天拥有的家庭，和原生家庭相比，哪里必须不同？"
  },
  {
    id: "esteem",
    part: "love",
    n: "10",
    title: "为爱失去自尊",
    thesis: "约会软件是交友软件，真正的算法是你的大脑。你走到哪，你依然是你。",
    quote: "我感觉别人从未真正喜欢过我。",
    quoteBy: "比莉·艾利什（18 岁）",
    person: { name: "凯茜", meta: "小学教师 · 儿童文学作者 · 晚上来者不拒" },
    story: "凯茜把乱爱叫彩排。闺蜜不知道她的爱情生活，音乐才知道。高中被取笑没有性经历，父母说再瘦一点男生会喜欢。27 岁仍在用 17 岁的故事跑。后来她开始思考自己想要什么样的伴侣，发现不以性为前提，也有人想和她在一起。",
    evidence: "自感配偶价值主要由“到目前为止感觉自己有多受欢迎”决定，尤其是那些第一次：心动、被拒、接吻、性爱、心碎。二十出头约 25%、临近 30 岁约 15% 的人在特定年份没有性生活，比想象中更平常。消极故事困住人，积极故事能改写身份。",
    trap: "被渴望才能证明我有价值。这没什么大不了。",
    truth: "过河时带木筏是明智的；上岸后还背着木筏，就多此一举。被渴望不是爱情的全部。",
    monday: ["写下你是否正在为爱失去自尊，以及这个故事从几岁开始", "把这个故事讲给一个安全的人听，而不是循环播放同一张歌单"],
    ask: "你打算什么时候停止为爱失去自尊？"
  },
  {
    id: "cohabit",
    part: "love",
    n: "11",
    title: "同居效应",
    thesis: "同居测不出婚姻。危险的不是住在一起，是任其发展、而非共同决定。",
    quote: "身陷困境，如同身陷流沙。你不能随遇而安，而要尽早摆脱。",
    quoteBy: "罗斯·怀尔德·莱恩",
    person: { name: "珍妮弗", meta: "32 岁 · 婚礼六个月后找离婚律师" },
    story: "她和卡特同居三年，婚礼奢华。婚后才开始谈房子、孩子、谁养家、要不要搬回父母附近。卡特是完美男友——玩音乐、生活就是玩——不是丈夫。她说走不了，有时只是因为没钱买新沙发。30 岁一到，身边都在结婚，就“刚好在一起所以结婚”。",
    evidence: "约一半年轻人相信同居才能判断适不适合；约三分之二相信能避免离婚。证据几乎不支持，部分研究显示同居者离婚更高。约三分之二情侣从过夜滑到同居，没有一次认真对话。订婚后同居的沟通和稳定性通常更好——因为承诺被说清楚了。行为经济学叫锁定效应。",
    trap: "先试后买。合不来我可以搬走。我只是在打发时间。",
    truth: "结婚的潜台词是“你就是对的人”；同居更像“你或许是”。测试感情还有旅行、见家人、谈钱、谈孩子。",
    monday: ["若已同居或打算同居：问彼此承诺度，写下来", "问自己：留下是因为对的人，还是因为沙发？"],
    ask: "有什么因素正在阻止你结束一段不合适的关系？"
  },
  {
    id: "fit",
    part: "love",
    n: "12",
    title: "彼此合拍",
    thesis: "床上合拍，不等于彼此合拍。当别人告诉你他们是怎样的人，请先相信。",
    quote: "人们喜欢相似之人。",
    quoteBy: "亚里士多德",
    person: { name: "伊莱 / 马克斯", meta: "消防员与女友旅行决裂 · 财务与公关同居一年" },
    story: "伊莱喜欢女朋友漂亮、床上合拍，但她不怎么爱笑。尼加拉瓜旅行里，预算、节奏、生病时谁照顾，全暴露了，回来就分了。马克斯嫌艾丽斯不是“想象中的女朋友”，想要爸妈那种男主外女主内；艾丽斯明确说不想当保姆。他听不进去，因为马上 30 岁，结婚像预料中的结果。",
    evidence: "选型婚配：价值观、教育、宗教、社会经济地位相似的伴侣更幸福。相似是关系终结者，不是催化剂。短期关系看外表；长期关系看易怒、信任、关心、懒惰、幽默、地理距离。异性恋容易掉进没说出口的性别剧本；同性恋伴侣反而更常坐下来谈谁做什么。",
    trap: "心动和性爱够了。她以后会改的。",
    truth: "爱情没有标准答案，但理想和现实必须谈拢。发现自己并不喜欢正在交往的这个人，要面对这个答案。",
    monday: ["除了约会和做爱，列 5 件你们可以一起做的事，去做一件高压的", "把对性别角色、家务、孩子的期待说出口"],
    ask: "对方已经告诉过你他们是怎样的人。你信了吗？"
  },
  {
    id: "q29",
    part: "love",
    n: "13",
    title: "二十九问",
    thesis: "沟通是爱情里的氧气。最佳时机是这些问题还没变成争吵之前。",
    quote: "婚姻就像一场漫长的对话，而争吵夹杂其间。",
    quoteBy: "罗伯特·路易斯·史蒂文森",
    person: null,
    story: "到了“婚前”往往已经决定要结，甜蜜会盖住没说出口的话。真正的分水岭常常不是婚前婚后，而是生孩子之前和之后——满意度最大一次下跌发生在有孩子之后。二十九问不是考卷，是你和对方、你和自己的对话。对方不愿谈，本身就是信号。",
    evidence: "研究反复指向：能清晰表达并匹配承诺度的伴侣更满意。孩子带来争吵，也带来意义；关键是如何处理争吵。没有及格分数。越一致，或越能接纳不一致，越稳。",
    trap: "现在谈钱、孩子、家务太早，会把浪漫谈没。",
    truth: "你若打算再投入一年，为什么只谈万圣节角色，不谈你在这段关系里要演什么。去练习页把 29 问过一遍。",
    monday: ["打开本站「练习 → 二十九问」", "这个月每天散步时只谈一个问题"],
    ask: "你认为双方最多在多少问题上可以存在分歧？"
  },
  {
    id: "futurebrain",
    part: "body",
    n: "14",
    title: "为未来着想",
    thesis: "额叶成熟期持续到 20–30 岁之间。为未来着想的能力，不会等年龄到了就自动出现。",
    quote: "虽人生只能于回首往事之时明了来路，但未来必于披星戴月之中一苇以航。",
    quoteBy: "克尔凯郭尔",
    person: { name: "菲尼亚斯·盖奇", meta: "25 岁铁路工人 · 铁棍洞穿额叶" },
    story: "盖奇出事后仍能说话走路，却从温和能干变成口无遮拦、对未来举棋不定。后来他当了多年马车夫：日复一日备马、赶路、记挂终点。工作像社交康复，额叶重新学习计划。",
    evidence: "情绪大脑已就位，冷静计划的额叶还在施工，所以会不均衡：能以优秀毕业生致辞，却不会选工作和对象。第二次也是最后一次神经生长高峰在二十多岁结束。用进废退，最忙者生存。之后仍可塑，但再没有这样的速度。",
    trap: "大脑还在发育，所以二十多岁该被特殊对待，先等成熟了再说。",
    truth: "有人 22 岁已能与未知共处，有人 34 岁仍像浮萍。浇灌额叶的是真实工作和真实关系，不是等待。",
    monday: ["选一件你因为“还早”而没练的成人技能，本周练一次", "减少一件让额叶闲置的逃避"],
    ask: "“大脑还在发育”，对你来说更像解释、借口，还是机会？"
  },
  {
    id: "experiment",
    part: "body",
    n: "15",
    title: "一项社会实验",
    thesis: "二十多岁时，时间是你最重要的资产。手机正在五分钟五分钟地偷走它。",
    quote: "过好现在就是过好未来。",
    quoteBy: "西藏谚语",
    person: { name: "海上学府的学生", meta: "太平洋三周几乎没有互联网" },
    story: "作者带 500 多名学生环球航行。没有网之后：不比较就没那么惨；晚上只能睡觉所以更有精神；两周建立的连接超过家里一些朋友。有人承认在学校每天花两三个小时看色情片，船上把这些时间拿去跟真人相处。",
    evidence: "有来访者每天刷 Instagram 三小时，约等于过去每天抽一盒烟的“吸烟时间”。社交焦虑成了这个年龄最常见的焦虑。你已经在人类史上最大的一场无对照组实验里。",
    trap: "没手机我就活不下去。社交媒体让我更连接。",
    truth: "电子设备关掉的是对生活的体验。少看手机，是二十多岁最容易开始的改变。",
    monday: ["追踪一周屏幕时间", "设每天无手机的 90 分钟", "用这段时间见一个人或做一项爱好"],
    ask: "如果不使用电子设备，你还可以做哪些更让你开心或健康的事？"
  },
  {
    id: "calm",
    part: "body",
    n: "16",
    title: "冷静下来",
    thesis: "二十多岁的大脑把批评拍成闪光灯记忆。你要有根，站在风中而不倒。",
    quote: "智慧就是懂得该忽略什么的技巧。",
    quoteBy: "威廉·詹姆斯",
    person: { name: "丹妮尔", meta: "顶级电视新闻机构助理 · 周一哭着问能不能辞职" },
    story: "老板因她“什么都该知道”而咆哮。她每天感觉要被解雇，午休打给妈妈哭诉。作者说：你可以辞职，但不觉得你应该。她把工作当成受虐恋爱。灾难化思维是：被炒 → 只能去端盘子。",
    evidence: "大脑更记得怪诞和惊吓。二十多岁对负面信息的反应强于年长者，情绪像风中的叶子。年长者有“积极效应”。经常把痛苦扔给别人，就失去了锻炼自己额叶的机会。更能控制情绪的人，生活满意度和关系更好。",
    trap: "辞职就能逃离这些感受。一直担心最坏情况，问题来时才不会意外。",
    truth: "情绪不是事实。问“事实是什么？”挂掉那通求救电话，处理事情。维克多·弗兰克尔：面对处境的态度，是人最后的自由。",
    monday: ["下次被批评后，写三句事实、一句最坏幻想，把幻想划掉", "连续三天午休不把情绪外包"],
    ask: "上次你以为会发生的灾难，最后实际发生了什么？"
  },
  {
    id: "outsidein",
    part: "body",
    n: "17",
    title: "由外而内",
    thesis: "自信不是由内而外长出来的。它来自外面做过的难事，尤其是失败后还做成的事。",
    quote: "知识不是能力。知识加上 10000 次练习才是能力。",
    quoteBy: "铃木镇一",
    person: { name: "丹妮尔", meta: "老板说：你不是那块料，但努力工作，你可能会是" },
    story: "她以为职场里的人要么有自信要么没有。熬过第一年去要反馈，老板写她是最好的助理、冷静的问题解决者。年终奖 1000 美元她当成 1000 小时。后来弱连接把她挖到更好的组。她说没时间恋爱；作者说可以一边工作一边恋爱。",
    evidence: "德韦克：固定型思维遇到挑战就放弃；成长型思维更努力。艾利克森：精通大约 10000 小时，约 5 年全职或 10 年每周 20 小时。知道想做什么 ≠ 会做 ≠ 能做好。",
    trap: "找一份简单工作就不用动脑子，也不会犯错。一次催眠或一瓶药就能有自信。",
    truth: "大材小用堆不出真自信。管理情绪、继续待着、收集成功数据，这就是在增强自信。",
    monday: ["盘点你已经积累的小时和成功", "向一位苛刻但公正的人要具体反馈", "把“我不是那块料”改成“我还在前 2000 小时”"],
    ask: "若有 10000 小时，你想用来精通什么？"
  },
  {
    id: "social",
    part: "body",
    n: "18",
    title: "融入社会",
    thesis: "不是长大了才能融入社会。是融入社会，才能真正长大。",
    quote: "生活本身就是一位非常好的治疗师。",
    quoteBy: "卡伦·霍妮",
    person: { name: "萨姆", meta: "父母离异后轮换居住 6 年 · 二十多岁仍居无定所" },
    story: "萨姆觉得越长大越没长大，简历像睡过的地方一样乱。他以为要先换一个大脑。后来固定住所、养了一条狗、跟训犬师做助理，开了狗狗日托。照顾别人反而是他的强项。性格在咨询室另一头自己长出来了。",
    evidence: "性格在二十多岁可变幅度最大，30 岁后相对稳定。有工作的年轻人比没工作的更快乐。工作是年轻时性格改变的最大驱动之一。稳定关系降低社交焦虑；长期单身的男性临近 30 岁自尊波动最大。约 80% 一直约会不认真的人对爱情生活不满意。目标是成人性格的基石。",
    trap: "无聊的工作只会更糟。先感觉好了，再安定下来。",
    truth: "朝一份工作、一个住所、一个目标、一段认真关系做承诺，责任感才会来。失业快乐族并不快乐。",
    monday: ["选一个能让下周更安定的承诺：工作、住所、目标或关系", "把截止日期写在理想后面"],
    ask: "你最想在 30 岁前改变自己的一点是什么？什么会阻碍你？"
  },
  {
    id: "body",
    part: "body",
    n: "19",
    title: "你的身体",
    thesis: "若可能要孩子，二十多岁就该知道曲线，而不是 38 岁才第一次认真想。确定不要，可以跳过。",
    quote: "管理生育能力是成年时最重要的事情之一。",
    quoteBy: "杰梅茵·格里尔",
    person: { name: "凯特琳 / 比利", meta: "36 岁还觉得孩子不着急 · 38 岁躺进核磁只想起儿子的小手" },
    story: "作者 34 岁被导师当面说“想要孩子就得赶快”，当时觉得被冒犯；后来两个孩子。凯特琳 38 岁才开始准备怀孕，辅助生育多年未果。比利二十多岁追求最少遗憾最多回忆，真正害怕失去的是还没发生的未来。",
    evidence: "女性生育力二十多岁高峰，35 左右显著下降，40 陡降。男性精子质量同样随年龄下降。35 岁前自然周期受孕率约 25%/周期，40 岁约 5%。IVF 35 岁前约 33%，40 岁约 15%，失败比成功更常见。约三分之一无子女的成年人并非自愿。约 52% 的二十多岁把“成为好父母”列为成年最重要的事之一。医学是不确定性的科学，个体有差异，这是群体曲线。",
    trap: "好莱坞明星 40 多岁还能生。科技会解决。现在谈孩子过时。",
    truth: "获得性启发会骗你。推迟生育就算成功，后面还有时间账：收入高峰撞上育儿，可能同时照顾幼儿和八十多岁父母。",
    monday: ["若不确定：把“要不要、几个、怎样、何时”写下来", "把答案放进爱情和时间线里看一看是否兼容"],
    ask: "这些数据和故事之后，你的想法有没有移动一寸？"
  },
  {
    id: "end",
    part: "body",
    n: "20",
    title: "以终为始",
    thesis: "做成大事需要一份计划，以及不那么充裕的时间。从 30、40 岁想要的生活倒推今天。",
    quote: "我总会从最后一句话开始写起，然后从后往前推。",
    quoteBy: "约翰·欧文",
    person: { name: "雷切尔", meta: "26 岁 · 公卫硕士退学当酒吧服务生" },
    story: "她说 40 结婚、45 生孩子，画时间线后发现：若 30 岁才申法学院，35 岁才当上律师，同时还要结婚生子——她自己也不想挤在一起。于是现在就开始。她后来写信：我以为不去想，时间就会停。它没有停。",
    evidence: "洞穴里的西弗尔：两个月感觉只过了 25 天。大脑压缩没有刻度的时间。卡斯滕森用 VR 让二十多岁看见老年的自己，给退休账户的钱翻倍还多。现时偏见是人类的，二十多岁尤其重，又被人用“你有的是时间”喂养。",
    trap: "工作结婚都比以前晚，所以 30 岁才开始真正的人生。",
    truth: "30 岁才开始，绝不等于 30 岁拥有。未来越远越抽象，越抽象越不会去想。时间线让大脑看见：时间有限。",
    monday: ["打开「练习 → 十年时间线」", "从 10 年后倒推，看哪几件事挤在同一窗口"],
    ask: "把 10 年后的期望写下来时，你害怕、兴奋，还是第一次觉得有条理？"
  },
  {
    id: "afterword",
    part: "close",
    n: "21",
    title: "我的未来会好吗",
    thesis: "人生没有标准答案，没有抽象的好或不好，只有选择和结果。山野无情，这得你自己决定。",
    quote: "你正在决定自己的人生。",
    quoteBy: "梅格·杰伊",
    person: null,
    story: "落基山入口牌子写着：山野无情。作者问护林员自己能不能翻过雪坡，对方说：这得你自己决定。所有二十多岁的来访者几乎都问过：我的未来会好吗？关键在于你如何定义“好”。",
    evidence: "二十多年来的咨询说明：年轻人希望被认真对待。他们做的事情确实很重要。老去最妙的一点：你知道自己的人生如何活过——尤其当你正在做喜欢的事。",
    trap: "如果二十多岁做过的工作、谈过的恋爱可以不算数就好了。",
    truth: "把选择看清楚，结果来时才不会惊讶。把握时间，以终为始，踏入职场，选择家庭，创造自己的已知。",
    monday: ["给 35 岁的自己写一封信", "再以 35 岁的口吻回一封给现在的自己"],
    ask: "你脚下这条路，是你自己选的吗？"
  }
];

const PARTS = {
  open: { label: "开场", blurb: "先把那句“30 岁是新的 20 岁”放下。" },
  work: { label: "工作", blurb: "身份资本、弱连接、六瓶果酱。" },
  love: { label: "爱情", blurb: "选择家庭，而不是打发时间。" },
  body: { label: "大脑与身体", blurb: "额叶、时间、自信、生育、以终为始。" },
  close: { label: "后记", blurb: "山野无情。这得你自己决定。" },
  tools: { label: "练习", blurb: "把书用起来，而不只是读完。" }
};

const QUESTIONS_29 = [
  "你如何看待婚姻？想结婚还是其他结合方式？",
  "我让你成为更好的自己了吗？何时展现出最好的一面？",
  "你有宗教信仰吗？希望孩子也有吗？",
  "如何管理金钱、债务、消费门槛和婚前协议？",
  "想不想生孩子？几个？何时？考虑领养吗？",
  "性生活里什么管用、什么绝对不尝试？单一还是多元？",
  "政治观念一致吗？不一致在不在乎？",
  "短期和长期职业目标？谁的工作可以让对方搬家？",
  "性别角色从哪来？父母在家如何分工？",
  "想成为什么样的父母？产假、尿布、接送、家长会谁来？",
  "谁做饭？会不会做？打算何时学？",
  "家务和整洁标准如何分工？雇不雇人？",
  "期望的生活水平？钱花在物质还是体验上？",
  "两边原生家庭扮演什么角色？假期怎么过？",
  "如何处理矛盾？能否接受咨询？如何看离婚？",
  "如何为爱情保鲜？约会、出游、度假如何保证？",
  "5 / 10 / 20 年后你是谁？那时我们还合得来吗？",
  "想住市区还是郊区？安顿还是四海为家？",
  "你为什么喜欢我？我身上什么让你不再去找别人？",
  "旅行有多重要？有没有必须打卡的遗愿清单？",
  "理想的周末是怎样的？爱好会不会占用我的时间或钱？",
  "你曾经背叛过伴侣吗？会背叛我吗？",
  "健康、饮食、锻炼、烟酒、心理问题我需要知道哪些？",
  "需要时时刻刻在一起吗？独处和朋友时间如何安排？",
  "什么让你开心？我可以怎样帮你？",
  "什么让你感觉被爱？",
  "一天劳累之后你最需要什么？",
  "有什么问题是我应该问但没问的？",
  "有什么问题是你想问但没问的？"
];

function loadStore() {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY)) || {};
  } catch {
    return {};
  }
}
function saveStore(patch) {
  const cur = { ...loadStore(), ...patch };
  localStorage.setItem(STORE_KEY, JSON.stringify(cur));
  return cur;
}

const state = {
  view: "cover",
  part: "open",
  chapterId: null,
  tool: null
};

function $(id) { return document.getElementById(id); }

function readSet() {
  return new Set(loadStore().read || []);
}
function markRead(id) {
  const s = readSet();
  s.add(id);
  saveStore({ read: [...s] });
  renderRail();
  updateProgress();
}

function updateProgress() {
  $("progressLabel").textContent = `${readSet().size} / ${CHAPTERS.length}`;
}

function showCover() {
  state.view = "cover";
  $("cover").hidden = false;
  $("app").hidden = true;
  history.replaceState(null, "", "#cover");
}

function showApp() {
  $("cover").hidden = true;
  $("app").hidden = false;
}

function navigate(hash) {
  const raw = (hash || location.hash || "#map").replace(/^#/, "");
  const [a, b] = raw.split("/");
  if (!raw || raw === "cover") {
    showCover();
    return;
  }
  showApp();
  if (raw === "map" || a === "map") {
    state.view = "map";
    state.part = "open";
    render();
    return;
  }
  if (a === "part") {
    state.view = "map";
    state.part = b || "open";
    render();
    return;
  }
  if (a === "c") {
    state.view = "chapter";
    state.chapterId = b;
    state.part = (CHAPTERS.find((c) => c.id === b) || {}).part || "open";
    render();
    return;
  }
  if (a === "tools") {
    state.view = "tools";
    state.part = "tools";
    state.tool = b || null;
    render();
  }
}

function render() {
  document.querySelectorAll(".parts button").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.part === state.part);
  });
  renderRail();
  updateProgress();
  if (state.view === "map") renderMap();
  else if (state.view === "chapter") renderChapter();
  else if (state.view === "tools") renderTools();
}

function renderRail() {
  const read = readSet();
  const chunks = [];
  let last = "";
  for (const c of CHAPTERS) {
    if (c.part !== last) {
      if (last) chunks.push("</div>");
      chunks.push(`<div class="rail-group"><div class="rail-label">${PARTS[c.part].label}</div>`);
      last = c.part;
    }
    const active = state.view === "chapter" && state.chapterId === c.id;
    chunks.push(`<button class="rail-item ${active ? "active" : ""} ${read.has(c.id) ? "done" : ""}" data-go="#c/${c.id}">${c.n} ${c.title}</button>`);
  }
  if (last) chunks.push("</div>");
  const rail = $("rail");
  rail.innerHTML = chunks.join("") + `<div class="rail-group"><div class="rail-label">练习</div>
    <button class="rail-item ${state.view === "tools" && !state.tool ? "active" : ""}" data-go="#tools">工具箱</button>
    <button class="rail-item ${state.tool === "capital" ? "active" : ""}" data-go="#tools/capital">身份资本</button>
    <button class="rail-item ${state.tool === "jam" ? "active" : ""}" data-go="#tools/jam">六瓶果酱</button>
    <button class="rail-item ${state.tool === "ties" ? "active" : ""}" data-go="#tools/ties">弱连接</button>
    <button class="rail-item ${state.tool === "q29" ? "active" : ""}" data-go="#tools/q29">二十九问</button>
    <button class="rail-item ${state.tool === "timeline" ? "active" : ""}" data-go="#tools/timeline">十年时间线</button>
  </div>`;
}

function renderMap() {
  const part = state.part === "tools" ? "open" : state.part;
  const list = CHAPTERS.filter((c) => (part === "open" ? true : c.part === part));
  const heading = part === "open"
    ? `<div class="map-hero">
        <div class="stat"><b>80%</b><span>最具决定性的时刻发生在 35 岁之前</span></div>
        <div class="map-lead">
          <h2>不当书页翻。<br/>当咨询室用。</h2>
          <p>梅格·杰伊对着二十多岁的人直接说话。流行文化说你可以再玩几年；临床证据说，这十年的工作、爱情、大脑和身体，会把航线从阿拉斯加拧到斐济。</p>
        </div>
      </div>
      <div class="myths">
        <div class="myth"><em>流行说法</em><strong>30 岁是新的 20 岁</strong></div>
        <div class="myth"><em>书里的反击</em><strong>40 岁绝不是新的 30 岁</strong></div>
        <div class="myth"><em>流行说法</em><strong>先搞清楚我是谁再生活</strong></div>
        <div class="myth"><em>书里的反击</em><strong>身份是做出来的，探索和承诺同时进行</strong></div>
      </div>
      <div class="grid-3">
        <button class="door work" data-go="#part/work"><span class="k">PART I</span><h3>工作</h3><p>身份资本、弱连接、未知的已知。下一份工作问资本含量，不问好不好看。</p></button>
        <button class="door love" data-go="#part/love"><span class="k">PART II</span><h3>爱情</h3><p>和谁在一起可能比和谁上班更重要。你正在选择下一个家庭。</p></button>
        <button class="door body" data-go="#part/body"><span class="k">PART III</span><h3>大脑与身体</h3><p>额叶还在长，时间正在被偷走。自信由外而内，生育有曲线。</p></button>
      </div>
      <div class="section-h">点哪一章进哪一章 · 不必按顺序</div>`
    : `<p class="ch-kicker">${PARTS[part].label}</p><h2 class="ch-title">${PARTS[part].blurb}</h2>`;

  const cards = (part === "open" ? CHAPTERS : list).map((c) => `
    <button class="card" data-go="#c/${c.id}">
      <span class="n">${c.n}</span>
      <h3>${c.title}</h3>
      <p>${c.thesis}</p>
    </button>`).join("");

  $("main").innerHTML = heading + `<div class="cards">${cards}</div>
    <p class="save-hint" style="margin-top:28px">这是私人速读笔记，不是原书替代。原书：梅格·杰伊《人生十年，不可辜负的20岁到30岁》。练习数据存在你这台浏览器里。</p>`;
}

function renderChapter() {
  const c = CHAPTERS.find((x) => x.id === state.chapterId) || CHAPTERS[0];
  markRead(c.id);
  const idx = CHAPTERS.findIndex((x) => x.id === c.id);
  const prev = CHAPTERS[idx - 1];
  const next = CHAPTERS[idx + 1];
  const dossier = c.person ? `
    <div class="dossier">
      <div class="who"><b>${c.person.name}</b><span>来访者档案<br>${c.person.meta}</span></div>
      <div class="what">${c.story}</div>
    </div>` : `<div class="block"><h4>现场</h4><p>${c.story}</p></div>`;

  $("main").innerHTML = `
    <p class="ch-kicker">${PARTS[c.part].label} · ${c.n}</p>
    <h1 class="ch-title">${c.title}</h1>
    <p class="ch-thesis">${c.thesis}</p>
    <blockquote class="quote">${c.quote}<cite>${c.quoteBy}</cite></blockquote>
    ${dossier}
    <div class="block"><h4>证据</h4><p>${c.evidence}</p></div>
    <div class="split">
      <div class="trap"><h4>流行说法</h4><p>${c.trap}</p></div>
      <div class="truth"><h4>书里的反击</h4><p>${c.truth}</p></div>
    </div>
    <div class="monday">
      <h4>周一做什么</h4>
      <ul>${c.monday.map((x) => `<li>${x}</li>`).join("")}</ul>
    </div>
    <p class="ask">${c.ask}</p>
    <div class="pager">
      <button ${prev ? `data-go="#c/${prev.id}"` : "disabled"}>${prev ? "← " + prev.title : "已是开头"}</button>
      <button ${next ? `data-go="#c/${next.id}"` : "disabled"}>${next ? next.title + " →" : "已是结尾"}</button>
    </div>`;
  window.scrollTo({ top: 0, behavior: "instant" });
}

function renderTools() {
  if (!state.tool) {
    $("main").innerHTML = `
      <p class="ch-kicker">把书用起来</p>
      <h1 class="ch-title">练习</h1>
      <p class="ch-thesis">作者说她希望引发更多思考，而不是提供轻松三步。答案不分对错。重要的是诚实面对自己。</p>
      <div class="tool-grid">
        <button class="tool-card" data-go="#tools/capital"><h3>身份资本</h3><p>列出你现有的 10 项，以及接下来要攒的 3 项。</p></button>
        <button class="tool-card" data-go="#tools/jam"><h3>六瓶果酱</h3><p>把“我可以做任何事”收成最多六个真实选项，标出要买的那瓶。</p></button>
        <button class="tool-card" data-go="#tools/ties"><h3>五个弱连接</h3><p>写下几乎不熟、却可能改写轨迹的人，以及一个两分钟请求。</p></button>
        <button class="tool-card" data-go="#tools/q29"><h3>二十九问</h3><p>和伴侣或自己谈。对方不愿谈，本身就是信号。</p></button>
        <button class="tool-card" data-go="#tools/timeline"><h3>十年时间线</h3><p>从终局倒推。你会发现时间没有想象中充裕。</p></button>
      </div>`;
    return;
  }
  const store = loadStore();
  if (state.tool === "capital") renderCapital(store);
  if (state.tool === "jam") renderJam(store);
  if (state.tool === "ties") renderTies(store);
  if (state.tool === "q29") renderQ29(store);
  if (state.tool === "timeline") renderTimeline(store);
}

function renderCapital(store) {
  const items = store.capital || [];
  const next = store.capitalNext || ["", "", ""];
  $("main").innerHTML = `
    <p class="ch-kicker">练习</p>
    <h1 class="ch-title">身份资本</h1>
    <p class="ch-thesis">学位和工作经历可以写进简历；气质、来处、爱好、你解决问题的方式，写不进去，但一样能买机会。</p>
    <div class="field"><label>新增一项（写完回车）</label>
      <input id="capInput" placeholder="例如：带过少年犯划独木舟 / 很会把复杂事讲清楚" />
    </div>
    <div class="chips" id="capChips">${items.map((t, i) => `<span class="chip">${t}<button data-del="${i}" type="button">×</button></span>`).join("")}</div>
    <p class="save-hint">已有 ${items.length} 项。目标至少 10 项，含写不进简历的。</p>
    <div class="section-h">接下来 12 个月要攒的三件</div>
    ${[0,1,2].map((i) => `<div class="field"><label>第 ${i + 1} 件</label><input class="nextCap" data-i="${i}" value="${escapeAttr(next[i] || "")}" /></div>`).join("")}
    <p class="save-hint">自动保存在本机。</p>`;
  $("capInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      saveStore({ capital: [...(loadStore().capital || []), e.target.value.trim()] });
      renderCapital(loadStore());
    }
  });
  $("main").querySelectorAll("[data-del]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const arr = [...(loadStore().capital || [])];
      arr.splice(+btn.dataset.del, 1);
      saveStore({ capital: arr });
      renderCapital(loadStore());
    });
  });
  $("main").querySelectorAll(".nextCap").forEach((inp) => {
    inp.addEventListener("input", () => {
      const n = loadStore().capitalNext || ["", "", ""];
      n[+inp.dataset.i] = inp.value;
      saveStore({ capitalNext: n });
    });
  });
}

function renderJam(store) {
  const jams = store.jams || ["", "", "", "", "", ""];
  const pick = store.jamPick ?? -1;
  $("main").innerHTML = `
    <p class="ch-kicker">练习</p>
    <h1 class="ch-title">六瓶果酱</h1>
    <p class="ch-thesis">24 种口味是迷思。你面前从来不是无限可能，是过去已经替你筛过的大约六种。</p>
    <div class="jam-grid">
      ${jams.map((v, i) => `<div class="jam ${pick === i ? "active" : ""}">
        <div class="jam-n">第 ${i + 1} 瓶</div>
        <textarea data-jam="${i}" placeholder="一个真实选项">${escapeHtml(v)}</textarea>
        <button class="primary" data-pick="${i}" type="button">${pick === i ? "这瓶就是" : "买这瓶"}</button>
      </div>`).join("")}
    </div>
    <p class="save-hint">标出要买的那瓶，不等于一辈子只买这一瓶。它会成为经验。</p>`;
  $("main").querySelectorAll("[data-jam]").forEach((t) => {
    t.addEventListener("input", () => {
      const arr = loadStore().jams || ["", "", "", "", "", ""];
      arr[+t.dataset.jam] = t.value;
      saveStore({ jams: arr });
    });
  });
  $("main").querySelectorAll("[data-pick]").forEach((b) => {
    b.addEventListener("click", () => {
      saveStore({ jamPick: +b.dataset.pick });
      renderJam(loadStore());
    });
  });
}

function renderTies(store) {
  const ties = store.ties || [];
  $("main").innerHTML = `
    <p class="ch-kicker">练习</p>
    <h1 class="ch-title">弱连接</h1>
    <p class="ch-thesis">改写轨迹的往往是见过几面的人。请求要具体、短、做过功课。</p>
    <div class="field"><label>谁 · 你们怎么认识的</label><input id="tieWho" placeholder="前老板的同事 / 误寄书的编辑" /></div>
    <div class="field"><label>一个两分钟就能帮的请求</label><input id="tieAsk" placeholder="能否把我的简历转给招聘经理" /></div>
    <button class="primary" id="tieAdd" type="button">加到名单</button>
    <div class="section-h">名单</div>
    <div id="tieList">${ties.map((t, i) => `<div class="q-item"><div><button data-del="${i}" type="button">×</button></div><div><strong>${escapeHtml(t.who)}</strong><br/>${escapeHtml(t.ask)}</div></div>`).join("") || "<p class='save-hint'>还没有人。从校友、前同事、只打过招呼的邻居开始。</p>"}</div>`;
  $("tieAdd").addEventListener("click", () => {
    const who = $("tieWho").value.trim();
    const ask = $("tieAsk").value.trim();
    if (!who || !ask) return;
    saveStore({ ties: [...(loadStore().ties || []), { who, ask }] });
    renderTies(loadStore());
  });
  $("main").querySelectorAll("[data-del]").forEach((b) => {
    b.addEventListener("click", () => {
      const arr = [...(loadStore().ties || [])];
      arr.splice(+b.dataset.del, 1);
      saveStore({ ties: arr });
      renderTies(loadStore());
    });
  });
}

function renderQ29(store) {
  const checks = store.q29 || {};
  $("main").innerHTML = `
    <p class="ch-kicker">练习</p>
    <h1 class="ch-title">二十九问</h1>
    <p class="ch-thesis">不要一次聊完。一个月，每天吃饭或散步时一个话题。打勾表示你们已经真正谈过。</p>
    <div class="q-list">
      ${QUESTIONS_29.map((q, i) => `<label class="q-item"><input type="checkbox" data-q="${i}" ${checks[i] ? "checked" : ""} /><span>${i + 1}. ${q}</span></label>`).join("")}
    </div>
    <p class="save-hint">已谈过 ${Object.values(checks).filter(Boolean).length} / 29。对方拒绝谈，本身就是信息。</p>`;
  $("main").querySelectorAll("[data-q]").forEach((box) => {
    box.addEventListener("change", () => {
      const q29 = { ...(loadStore().q29 || {}) };
      q29[box.dataset.q] = box.checked;
      saveStore({ q29 });
    });
  });
}

function renderTimeline(store) {
  const t = store.timeline || {};
  const fields = [
    ["now", "现在，你几岁"],
    ["work", "10 年后的工作"],
    ["love", "10 年后的爱情 / 家庭"],
    ["money", "10 年后的钱"],
    ["place", "10 年后住哪里"],
    ["health", "10 年后的身体"],
    ["kid", "要不要孩子、几个、大约何时"],
    ["block", "哪几件事会挤在同一窗口"]
  ];
  $("main").innerHTML = `
    <p class="ch-kicker">练习</p>
    <h1 class="ch-title">十年时间线</h1>
    <p class="ch-thesis">雷切尔以为 40 岁结婚、45 岁生孩子。画出来才发现，法学院和孩子会撞车。未来越具体，越会动手。</p>
    ${fields.map(([k, label]) => `<div class="field"><label>${label}</label><textarea data-tl="${k}">${escapeHtml(t[k] || "")}</textarea></div>`).join("")}
    <p class="save-hint">伯恩斯坦：做成大事需要一份计划，以及不那么充裕的时间。</p>`;
  $("main").querySelectorAll("[data-tl]").forEach((el) => {
    el.addEventListener("input", () => {
      const timeline = { ...(loadStore().timeline || {}) };
      timeline[el.dataset.tl] = el.value;
      saveStore({ timeline });
    });
  });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function escapeAttr(s) { return escapeHtml(s); }

function go(hash) {
  location.hash = hash;
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-go]");
  if (btn) {
    e.preventDefault();
    go(btn.dataset.go);
  }
});

$("enterBtn").addEventListener("click", () => go("#map"));
$("brandBtn").addEventListener("click", () => go("#cover"));
$("mapBtn").addEventListener("click", () => go("#map"));
document.querySelectorAll(".parts button").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.dataset.part === "tools") go("#tools");
    else go("#part/" + btn.dataset.part);
  });
});

window.addEventListener("hashchange", () => navigate(location.hash));
document.addEventListener("keydown", (e) => {
  if (state.view !== "chapter") return;
  if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) return;
  const idx = CHAPTERS.findIndex((c) => c.id === state.chapterId);
  if (e.key === "j" || e.key === "ArrowRight") {
    if (CHAPTERS[idx + 1]) go("#c/" + CHAPTERS[idx + 1].id);
  }
  if (e.key === "k" || e.key === "ArrowLeft") {
    if (CHAPTERS[idx - 1]) go("#c/" + CHAPTERS[idx - 1].id);
  }
});

if (location.hash && location.hash !== "#cover") navigate(location.hash);
else showCover();
