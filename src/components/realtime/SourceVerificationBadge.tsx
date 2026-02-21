import React from 'react';
import { Shield, AlertTriangle, CheckCircle, Clock, ExternalLink } from 'lucide-react';
import { ContentVerification } from '../../types/realtime';
import { realTimeNewsService } from '../../services/realTimeNewsService';

interface SourceVerificationBadgeProps {
  sourceName: string;
  sourceUrl: string;
  verification?: ContentVerification;
  publishedAt: string;
  fetchedAt?: string;
  reliability?: 'high' | 'medium' | 'low';
}

const SourceVerificationBadge: React.FC<SourceVerificationBadgeProps> = ({
  sourceName,
  sourceUrl,
  verification,
  publishedAt,
  fetchedAt,
  reliability = 'medium'
}) => {
  const reliabilityConfig = {
    high: { color: 'text-green-600 bg-green-50', label: '高可信度' },
    medium: { color: 'text-yellow-600 bg-yellow-50', label: '中等可信度' },
    low: { color: 'text-red-600 bg-red-50', label: '待验证' }
  };

  const freshness = realTimeNewsService.getNewsFreshness(publishedAt);
  const freshnessConfig = {
    fresh: { color: 'text-green-600', label: '最新', icon: '🟢' },
    recent: { color: 'text-yellow-600', label: '近期', icon: '🟡' },
    older: { color: 'text-gray-500', label: '较早', icon: '⚪' }
  };

  const timeAgo = realTimeNewsService.formatTimeAgo(publishedAt);

  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      <div className={`inline-flex items-center px-2 py-1 rounded-full ${reliabilityConfig[reliability].color}`}>
        <Shield className="w-3 h-3 mr-1" />
        <span className="text-xs font-medium">{reliabilityConfig[reliability].label}</span>
      </div>

      <div className={`inline-flex items-center ${freshnessConfig[freshness].color}`}>
        <span className="mr-1">{freshnessConfig[freshness].icon}</span>
        <span className="text-xs">{freshnessConfig[freshness].label}</span>
      </div>

      <div className="flex items-center text-gray-500">
        <Clock className="w-3 h-3 mr-1" />
        <span className="text-xs">{timeAgo}</span>
      </div>

      <a
        href={sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-primary-600 hover:text-primary-700"
      >
        <span className="text-xs">{sourceName}</span>
        <ExternalLink className="w-3 h-3 ml-1" />
      </a>

      {verification && !verification.isValid && (
        <div className="inline-flex items-center px-2 py-1 rounded-full text-red-600 bg-red-50">
          <AlertTriangle className="w-3 h-3 mr-1" />
          <span className="text-xs">内容待审核</span>
        </div>
      )}

      {verification && verification.isValid && (
        <div className="inline-flex items-center px-2 py-1 rounded-full text-green-600 bg-green-50">
          <CheckCircle className="w-3 h-3 mr-1" />
          <span className="text-xs">已验证</span>
        </div>
      )}

      {fetchedAt && (
        <div className="text-xs text-gray-400">
          抓取于 {realTimeNewsService.formatTimeAgo(fetchedAt)}
        </div>
      )}
    </div>
  );
};

export default SourceVerificationBadge;
