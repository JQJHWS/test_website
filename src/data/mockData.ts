import { NewsItem, Tag, TrendData, HotKeyword } from '../types';

export const SAMPLE_TAGS: Tag[] = [
  { id: 'gpt', name: 'GPT', color: 'bg-green-100 text-green-700' },
  { id: 'llm', name: '大语言模型', color: 'bg-blue-100 text-blue-700' },
  { id: 'transformer', name: 'Transformer', color: 'bg-purple-100 text-purple-700' },
  { id: 'diffusion', name: '扩散模型', color: 'bg-pink-100 text-pink-700' },
  { id: 'multimodal', name: '多模态', color: 'bg-orange-100 text-orange-700' },
  { id: 'agi', name: 'AGI', color: 'bg-red-100 text-red-700' },
  { id: 'open-source', name: '开源', color: 'bg-teal-100 text-teal-700' },
  { id: 'chatbot', name: '聊天机器人', color: 'bg-indigo-100 text-indigo-700' },
  { id: 'image-generation', name: '图像生成', color: 'bg-cyan-100 text-cyan-700' },
  { id: 'code-assistant', name: '代码助手', color: 'bg-yellow-100 text-yellow-700' },
  { id: 'autonomous-driving', name: '自动驾驶', color: 'bg-lime-100 text-lime-700' },
  { id: 'medical-ai', name: '医疗AI', color: 'bg-emerald-100 text-emerald-700' },
  { id: 'ai-safety', name: 'AI安全', color: 'bg-rose-100 text-rose-700' },
  { id: 'quantum-ai', name: '量子AI', color: 'bg-violet-100 text-violet-700' },
  { id: 'edge-ai', name: '边缘AI', color: 'bg-amber-100 text-amber-700' }
];

export const SAMPLE_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'OpenAI发布GPT-5：多模态能力大幅提升，推理速度提升3倍',
    summary: 'OpenAI正式发布新一代大语言模型GPT-5，在多模态理解、逻辑推理和代码生成方面取得重大突破，同时推理速度相比GPT-4提升3倍。',
    content: `OpenAI今日正式发布了备受期待的GPT-5模型，这是继GPT-4之后的又一重大技术突破。

主要更新亮点：
1. 多模态能力：GPT-5在图像、音频、视频理解方面表现更加出色，可以同时处理多种模态的输入
2. 推理能力：在复杂逻辑推理任务上的准确率提升了40%
3. 代码生成：支持更多编程语言，代码质量显著提升
4. 速度优化：推理速度相比GPT-4提升3倍，响应延迟大幅降低

技术细节方面，GPT-5采用了全新的混合专家架构(MoE)，参数规模达到万亿级别，但通过稀疏激活技术实现了更高效的推理。

业内专家认为，GPT-5的发布标志着大语言模型进入了一个新的发展阶段，将推动AI应用在更多领域的落地。`,
    source: 'AI科技评论',
    sourceUrl: 'https://example.com/news/gpt5-release',
    publishedAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T12:30:00Z',
    category: 'natural-language-processing',
    tags: [SAMPLE_TAGS[0], SAMPLE_TAGS[1], SAMPLE_TAGS[2]],
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    keyPoints: [
      '多模态能力大幅提升',
      '推理速度提升3倍',
      '采用混合专家架构',
      '参数规模达万亿级别'
    ],
    viewCount: 15680,
    isFeatured: true
  },
  {
    id: '2',
    title: '谷歌DeepMind推出AlphaFold 3：蛋白质结构预测精度再创新高',
    summary: 'DeepMind发布AlphaFold 3，在蛋白质结构预测领域取得突破性进展，预测精度相比上一代提升50%。',
    content: `谷歌DeepMind团队发布了AlphaFold 3，这是蛋白质结构预测领域的又一里程碑式进展。

核心突破：
- 预测精度提升50%，几乎达到实验测定水平
- 新增蛋白质-配体复合物预测能力
- 支持蛋白质-RNA、蛋白质-DNA相互作用预测
- 预测速度提升10倍

这项技术将极大加速药物研发进程，帮助科学家更快地理解疾病机制并开发新疗法。目前已有超过200万研究人员使用AlphaFold平台。`,
    source: 'Nature',
    sourceUrl: 'https://example.com/news/alphafold3',
    publishedAt: '2024-01-14T08:00:00Z',
    updatedAt: '2024-01-14T09:00:00Z',
    category: 'academic-research',
    tags: [SAMPLE_TAGS[11], SAMPLE_TAGS[2]],
    imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800',
    keyPoints: [
      '预测精度提升50%',
      '新增复合物预测能力',
      '预测速度提升10倍',
      '加速药物研发进程'
    ],
    viewCount: 8920,
    isFeatured: true
  },
  {
    id: '3',
    title: '特斯拉FSD V12实现端到端神经网络驾驶，无需规则编码',
    summary: '特斯拉发布FSD V12版本，采用纯神经网络端到端驾驶方案，完全摒弃传统规则编码，实现更自然的驾驶体验。',
    content: `特斯拉发布了备受关注的FSD V12版本，这是自动驾驶技术的一次重大范式转变。

技术革新：
- 采用端到端神经网络架构
- 输入为摄像头图像，输出为驾驶控制信号
- 完全摒弃传统规则编码
- 训练数据量超过100万小时

实际表现：
- 驾驶行为更加自然流畅
- 复杂场景处理能力提升
- 人工接管率降低80%
- 支持全国范围内使用

马斯克表示，这是实现完全自动驾驶的关键一步，未来将继续迭代优化。`,
    source: 'TechCrunch',
    sourceUrl: 'https://example.com/news/tesla-fsd-v12',
    publishedAt: '2024-01-13T16:00:00Z',
    updatedAt: '2024-01-13T18:00:00Z',
    category: 'autonomous-driving' as any,
    tags: [SAMPLE_TAGS[10]],
    imageUrl: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800',
    keyPoints: [
      '端到端神经网络架构',
      '摒弃传统规则编码',
      '人工接管率降低80%',
      '训练数据超100万小时'
    ],
    viewCount: 12350,
    isFeatured: false
  },
  {
    id: '4',
    title: 'Meta开源Llama 3：最强开源大模型，性能媲美GPT-4',
    summary: 'Meta发布并开源Llama 3系列模型，包含70B和400B两个版本，在多项基准测试中表现优异，部分指标超越GPT-4。',
    content: `Meta正式发布Llama 3系列开源大模型，这是迄今为止最强大的开源语言模型。

模型规格：
- Llama 3 70B：700亿参数，适合大多数应用场景
- Llama 3 400B：4000亿参数，性能对标GPT-4

性能表现：
- MMLU基准测试得分86.3，超越GPT-4
- 代码生成能力显著提升
- 支持多语言，包括中文
- 上下文窗口扩展至128K

开源协议：
- 采用Llama社区许可协议
- 商业使用友好
- 提供完整的训练细节

此举将进一步推动开源AI生态的发展，让更多开发者能够使用先进的大模型技术。`,
    source: 'Meta AI Blog',
    sourceUrl: 'https://example.com/news/llama3-release',
    publishedAt: '2024-01-12T14:00:00Z',
    updatedAt: '2024-01-12T15:30:00Z',
    category: 'product-release',
    tags: [SAMPLE_TAGS[6], SAMPLE_TAGS[1], SAMPLE_TAGS[2]],
    imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800',
    keyPoints: [
      '最强开源大模型',
      '部分指标超越GPT-4',
      '支持128K上下文',
      '商业使用友好'
    ],
    viewCount: 18920,
    isFeatured: true
  },
  {
    id: '5',
    title: 'Stable Diffusion 3发布：图像生成质量再上新台阶',
    summary: 'Stability AI发布Stable Diffusion 3，在图像质量、文字渲染和多主题生成方面取得重大突破。',
    content: `Stability AI发布了Stable Diffusion 3，这是图像生成领域的又一重大更新。

核心改进：
- 图像分辨率支持最高4K
- 文字渲染准确率提升至95%
- 多主题生成能力大幅增强
- 生成速度提升2倍

新功能：
- 支持图像编辑和局部重绘
- 新增风格迁移功能
- 支持视频生成预览
- 提供API接口

模型将继续开源，预计将在下周发布模型权重。`,
    source: 'Stability AI',
    sourceUrl: 'https://example.com/news/sd3-release',
    publishedAt: '2024-01-11T10:00:00Z',
    updatedAt: '2024-01-11T11:00:00Z',
    category: 'computer-vision',
    tags: [SAMPLE_TAGS[3], SAMPLE_TAGS[8], SAMPLE_TAGS[6]],
    imageUrl: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800',
    keyPoints: [
      '支持4K分辨率',
      '文字渲染准确率95%',
      '生成速度提升2倍',
      '继续开源'
    ],
    viewCount: 14560,
    isFeatured: false
  },
  {
    id: '6',
    title: '欧盟AI法案正式生效：全球首部全面AI监管法规',
    summary: '欧盟AI法案正式生效，成为全球首部全面监管人工智能的法规，对高风险AI应用实施严格监管。',
    content: `欧盟AI法案于今日正式生效，这是全球首部全面监管人工智能的法规。

主要内容：
- 将AI系统按风险等级分类
- 高风险AI需通过严格审查
- 禁止某些高风险AI应用
- 要求AI系统透明可解释

影响范围：
- 在欧盟运营的所有AI公司
- 使用AI的公共服务机构
- AI产品和服务提供商

行业反应：
- 科技公司表示将积极配合
- 隐私倡导者表示欢迎
- 部分企业担忧合规成本

该法案将成为全球AI监管的重要参考。`,
    source: 'EU Official',
    sourceUrl: 'https://example.com/news/eu-ai-act',
    publishedAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-01-10T10:00:00Z',
    category: 'policy-regulation',
    tags: [SAMPLE_TAGS[12]],
    imageUrl: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800',
    keyPoints: [
      '全球首部全面AI监管法规',
      '按风险等级分类监管',
      '高风险AI需严格审查',
      '要求透明可解释'
    ],
    viewCount: 9870,
    isFeatured: false
  },
  {
    id: '7',
    title: 'Claude 3发布：Anthropic推出最强安全AI助手',
    summary: 'Anthropic发布Claude 3系列模型，在安全性和性能方面取得平衡，提供三个不同规模的版本。',
    content: `Anthropic发布了Claude 3系列模型，包括Haiku、Sonnet和Opus三个版本。

模型对比：
- Claude 3 Haiku：轻量级，适合快速响应
- Claude 3 Sonnet：平衡性能与成本
- Claude 3 Opus：旗舰版本，性能最强

安全特性：
- 内置宪法AI安全机制
- 拒绝有害请求能力增强
- 输出内容更加可控
- 减少幻觉和错误信息

性能表现：
- 在复杂推理任务上表现优异
- 支持200K上下文窗口
- 多语言支持更加完善
- 代码能力显著提升`,
    source: 'Anthropic',
    sourceUrl: 'https://example.com/news/claude3-release',
    publishedAt: '2024-01-09T11:00:00Z',
    updatedAt: '2024-01-09T12:00:00Z',
    category: 'product-release',
    tags: [SAMPLE_TAGS[1], SAMPLE_TAGS[7], SAMPLE_TAGS[12]],
    imageUrl: 'https://images.unsplash.com/photo-1676299081847-824916de030a?w=800',
    keyPoints: [
      '三个版本可选',
      '内置安全机制',
      '支持200K上下文',
      '复杂推理能力优异'
    ],
    viewCount: 11230,
    isFeatured: false
  },
  {
    id: '8',
    title: 'AI医疗诊断系统获FDA批准：准确率超越人类医生',
    summary: '某AI医疗诊断系统获得FDA批准，在多项疾病诊断中的准确率已超越人类医生平均水平。',
    content: `一款AI医疗诊断系统正式获得FDA批准，可用于辅助诊断多种疾病。

批准范围：
- 皮肤癌早期筛查
- 糖尿病视网膜病变检测
- 肺部CT影像分析
- 心电图异常检测

性能数据：
- 皮肤癌诊断准确率97%
- 糖尿病视网膜病变检测准确率95%
- 肺结节检测灵敏度提升30%

临床应用：
- 已在50家医院部署
- 辅助诊断超过100万例
- 平均诊断时间缩短60%

专家表示，AI医疗诊断将显著提升医疗效率和诊断准确性。`,
    source: 'Medical AI Journal',
    sourceUrl: 'https://example.com/news/ai-medical-fda',
    publishedAt: '2024-01-08T08:00:00Z',
    updatedAt: '2024-01-08T09:00:00Z',
    category: 'industry-application',
    tags: [SAMPLE_TAGS[11], SAMPLE_TAGS[2]],
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
    keyPoints: [
      '获FDA批准',
      '诊断准确率超人类医生',
      '已在50家医院部署',
      '诊断时间缩短60%'
    ],
    viewCount: 7650,
    isFeatured: false
  },
  {
    id: '9',
    title: 'GitHub Copilot X发布：集成GPT-4，支持对话式编程',
    summary: 'GitHub发布Copilot X，集成GPT-4能力，支持对话式编程、代码解释和自动测试生成。',
    content: `GitHub发布了新一代AI编程助手Copilot X，带来多项重大更新。

新功能：
- 对话式编程：通过自然语言描述需求
- 代码解释：自动解释复杂代码逻辑
- 测试生成：自动生成单元测试
- 代码审查：AI辅助代码审查

技术升级：
- 集成GPT-4模型
- 支持更多编程语言
- 上下文理解能力增强
- 响应速度提升

定价：
- 个人版：$10/月
- 企业版：$19/月
- 包含在GitHub Enterprise中`,
    source: 'GitHub Blog',
    sourceUrl: 'https://example.com/news/copilot-x',
    publishedAt: '2024-01-07T15:00:00Z',
    updatedAt: '2024-01-07T16:00:00Z',
    category: 'product-release',
    tags: [SAMPLE_TAGS[9], SAMPLE_TAGS[1]],
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
    keyPoints: [
      '集成GPT-4',
      '对话式编程',
      '自动生成测试',
      'AI辅助代码审查'
    ],
    viewCount: 16890,
    isFeatured: false
  },
  {
    id: '10',
    title: '中国发布新一代AI芯片：算力达国际先进水平',
    summary: '中国科技公司发布新一代AI训练芯片，算力达到国际先进水平，将用于国产大模型训练。',
    content: `中国科技公司发布了新一代AI训练芯片，标志着国产AI芯片取得重大突破。

技术规格：
- 采用7nm先进制程
- FP16算力达500 TFLOPS
- 支持大模型训练
- 能效比提升40%

应用场景：
- 大语言模型训练
- 计算机视觉推理
- 科学计算加速
- 云服务部署

产业影响：
- 降低对进口芯片依赖
- 支持国产AI生态发展
- 预计年产能达100万片

该芯片将于下季度开始量产。`,
    source: '科技日报',
    sourceUrl: 'https://example.com/news/china-ai-chip',
    publishedAt: '2024-01-06T10:00:00Z',
    updatedAt: '2024-01-06T11:00:00Z',
    category: 'industry-application',
    tags: [SAMPLE_TAGS[2]],
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
    keyPoints: [
      '7nm先进制程',
      'FP16算力500 TFLOPS',
      '能效比提升40%',
      '年产能100万片'
    ],
    viewCount: 13420,
    isFeatured: false
  },
  {
    id: '11',
    title: '机器人学会自主决策：波士顿动力Atlas新技能展示',
    summary: '波士顿动力展示Atlas机器人新能力，实现自主决策和动态环境适应，无需预设动作。',
    content: `波士顿动力发布了Atlas机器人的最新演示视频，展示了令人惊叹的自主决策能力。

新能力展示：
- 自主规划行走路线
- 动态避开障碍物
- 自主拾取和放置物品
- 跌倒后自主恢复

技术突破：
- 整合强化学习算法
- 实时环境感知能力
- 毫秒级决策响应
- 全身协调控制

应用前景：
- 工业自动化
- 救援任务
- 物流仓储
- 特殊环境作业`,
    source: 'Boston Dynamics',
    sourceUrl: 'https://example.com/news/atlas-update',
    publishedAt: '2024-01-05T14:00:00Z',
    updatedAt: '2024-01-05T15:00:00Z',
    category: 'robotics',
    tags: [],
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
    keyPoints: [
      '自主决策能力',
      '动态环境适应',
      '强化学习整合',
      '毫秒级响应'
    ],
    viewCount: 21560,
    isFeatured: true
  },
  {
    id: '12',
    title: '多模态大模型Mistral Multimodal开源：支持图文音视频',
    summary: 'Mistral AI开源多模态大模型，支持图像、文本、音频、视频等多种模态的统一处理。',
    content: `Mistral AI发布了开源多模态大模型，支持多种模态的统一理解和生成。

模型特点：
- 统一处理图文音视频
- 参数规模70B
- 支持跨模态推理
- 开源可商用

性能表现：
- 图像理解能力优秀
- 视频理解支持长序列
- 音频转写准确率高
- 多模态生成质量佳

开源信息：
- Apache 2.0许可
- 提供完整权重
- 包含训练代码
- 社区活跃`,
    source: 'Mistral AI',
    sourceUrl: 'https://example.com/news/mistral-multimodal',
    publishedAt: '2024-01-04T09:00:00Z',
    updatedAt: '2024-01-04T10:00:00Z',
    category: 'academic-research',
    tags: [SAMPLE_TAGS[4], SAMPLE_TAGS[6], SAMPLE_TAGS[1]],
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800',
    keyPoints: [
      '统一多模态处理',
      '70B参数规模',
      '开源可商用',
      '跨模态推理'
    ],
    viewCount: 9870,
    isFeatured: false
  }
];

export const TREND_DATA: TrendData[] = [
  { date: '2024-01-01', count: 45, category: 'natural-language-processing' },
  { date: '2024-01-02', count: 52, category: 'natural-language-processing' },
  { date: '2024-01-03', count: 48, category: 'natural-language-processing' },
  { date: '2024-01-04', count: 61, category: 'natural-language-processing' },
  { date: '2024-01-05', count: 55, category: 'natural-language-processing' },
  { date: '2024-01-06', count: 67, category: 'natural-language-processing' },
  { date: '2024-01-07', count: 72, category: 'natural-language-processing' },
  { date: '2024-01-01', count: 32, category: 'computer-vision' },
  { date: '2024-01-02', count: 38, category: 'computer-vision' },
  { date: '2024-01-03', count: 41, category: 'computer-vision' },
  { date: '2024-01-04', count: 35, category: 'computer-vision' },
  { date: '2024-01-05', count: 44, category: 'computer-vision' },
  { date: '2024-01-06', count: 49, category: 'computer-vision' },
  { date: '2024-01-07', count: 52, category: 'computer-vision' },
  { date: '2024-01-01', count: 28, category: 'machine-learning' },
  { date: '2024-01-02', count: 31, category: 'machine-learning' },
  { date: '2024-01-03', count: 35, category: 'machine-learning' },
  { date: '2024-01-04', count: 38, category: 'machine-learning' },
  { date: '2024-01-05', count: 42, category: 'machine-learning' },
  { date: '2024-01-06', count: 45, category: 'machine-learning' },
  { date: '2024-01-07', count: 48, category: 'machine-learning' },
];

export const HOT_KEYWORDS: HotKeyword[] = [
  { keyword: 'GPT-5', count: 15680, trend: 'up' },
  { keyword: '大语言模型', count: 12350, trend: 'up' },
  { keyword: '多模态', count: 9870, trend: 'up' },
  { keyword: 'AI安全', count: 8650, trend: 'stable' },
  { keyword: '开源模型', count: 7890, trend: 'up' },
  { keyword: 'AI芯片', count: 6540, trend: 'down' },
  { keyword: '自动驾驶', count: 5890, trend: 'stable' },
  { keyword: '医疗AI', count: 5230, trend: 'up' },
  { keyword: '机器人', count: 4870, trend: 'up' },
  { keyword: 'AI监管', count: 4320, trend: 'stable' },
];
