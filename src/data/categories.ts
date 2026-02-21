import { CategoryInfo, NewsCategory } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'natural-language-processing',
    name: '自然语言处理',
    nameEn: 'NLP',
    description: '文本理解、生成、翻译等语言智能技术',
    icon: 'MessageSquare'
  },
  {
    id: 'computer-vision',
    name: '计算机视觉',
    nameEn: 'Computer Vision',
    description: '图像识别、目标检测、视频分析等视觉技术',
    icon: 'Eye'
  },
  {
    id: 'machine-learning',
    name: '机器学习',
    nameEn: 'Machine Learning',
    description: '深度学习、强化学习、模型训练等核心技术',
    icon: 'Brain'
  },
  {
    id: 'robotics',
    name: '机器人技术',
    nameEn: 'Robotics',
    description: '智能机器人、自动化系统、人机交互',
    icon: 'Bot'
  },
  {
    id: 'industry-application',
    name: '行业应用',
    nameEn: 'Industry',
    description: 'AI在医疗、金融、制造等领域的应用',
    icon: 'Building2'
  },
  {
    id: 'policy-regulation',
    name: '政策法规',
    nameEn: 'Policy',
    description: 'AI相关政策、法规、伦理标准',
    icon: 'Scale'
  },
  {
    id: 'academic-research',
    name: '学术研究',
    nameEn: 'Research',
    description: '前沿学术论文、研究成果、技术突破',
    icon: 'GraduationCap'
  },
  {
    id: 'product-release',
    name: '产品发布',
    nameEn: 'Products',
    description: 'AI产品、工具、平台发布动态',
    icon: 'Rocket'
  }
];

export const getCategoryById = (id: NewsCategory): CategoryInfo | undefined => {
  return CATEGORIES.find(cat => cat.id === id);
};

export const getCategoryName = (id: NewsCategory): string => {
  return getCategoryById(id)?.name || id;
};
