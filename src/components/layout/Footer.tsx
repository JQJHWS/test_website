import React from 'react';
import { Brain, Github, Twitter, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../data/categories';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">AI资讯中心</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              聚合最新AI领域资讯与发展动态，为您提供全面、及时的AI行业信息。
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">分类导航</h3>
            <ul className="space-y-2">
              {CATEGORIES.slice(0, 4).map(category => (
                <li key={category.id}>
                  <Link
                    to={`/category/${category.id}`}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">更多分类</h3>
            <ul className="space-y-2">
              {CATEGORIES.slice(4).map(category => (
                <li key={category.id}>
                  <Link
                    to={`/category/${category.id}`}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-white transition-colors">
                  首页
                </Link>
              </li>
              <li>
                <Link to="/trending" className="text-sm hover:text-white transition-colors">
                  热门趋势
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-sm hover:text-white transition-colors">
                  全部分类
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>© 2024 AI资讯中心. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
