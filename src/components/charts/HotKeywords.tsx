import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { HotKeyword } from '../../types';

interface HotKeywordsProps {
  keywords: HotKeyword[];
  maxItems?: number;
}

const HotKeywords: React.FC<HotKeywordsProps> = ({ keywords, maxItems = 10 }) => {
  const displayKeywords = keywords.slice(0, maxItems);
  const maxCount = Math.max(...displayKeywords.map(k => k.count));

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-3">
      {displayKeywords.map((keyword, index) => (
        <div
          key={keyword.keyword}
          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${
            index < 3 ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600'
          }`}>
            {index + 1}
          </span>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium text-gray-900">{keyword.keyword}</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">{keyword.count.toLocaleString()}</span>
                {getTrendIcon(keyword.trend)}
              </div>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  keyword.trend === 'up' ? 'bg-green-500' : keyword.trend === 'down' ? 'bg-red-500' : 'bg-gray-400'
                }`}
                style={{ width: `${(keyword.count / maxCount) * 100}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HotKeywords;
