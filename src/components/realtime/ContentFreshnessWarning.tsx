import React from 'react';
import { AlertTriangle, Clock, Info, CheckCircle, XCircle } from 'lucide-react';
import { realTimeNewsService } from '../../services/realTimeNewsService';

interface ContentFreshnessWarningProps {
  publishedAt: string;
  showDetails?: boolean;
}

const ContentFreshnessWarning: React.FC<ContentFreshnessWarningProps> = ({
  publishedAt,
  showDetails = false
}) => {
  const isOutdated = realTimeNewsService.isNewsOutdated(publishedAt, 7);
  const freshness = realTimeNewsService.getNewsFreshness(publishedAt);
  const timeAgo = realTimeNewsService.formatTimeAgo(publishedAt);
  const publishedDate = new Date(publishedAt);

  if (freshness === 'fresh') {
    return null;
  }

  if (isOutdated) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
        <div className="flex items-start">
          <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-amber-800">
              此资讯可能已过时
            </p>
            <p className="text-xs text-amber-600 mt-1">
              发布于 {publishedDate.toLocaleDateString('zh-CN')}（{timeAgo}），内容可能不再准确反映最新情况。
            </p>
            {showDetails && (
              <p className="text-xs text-amber-600 mt-1">
                建议查看来源链接获取最新信息，或浏览其他最新资讯。
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (freshness === 'recent' && showDetails) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm text-blue-800">
              此资讯发布于 {timeAgo}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

interface ContentStatusBannerProps {
  isRealTime?: boolean;
  lastUpdate?: string;
  sourceVerified?: boolean;
}

export const ContentStatusBanner: React.FC<ContentStatusBannerProps> = ({
  isRealTime = true,
  lastUpdate,
  sourceVerified = true
}) => {
  return (
    <div className="bg-gray-50 rounded-lg p-3 mb-4">
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <div className="flex items-center">
          {isRealTime ? (
            <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
          ) : (
            <Clock className="w-4 h-4 text-yellow-500 mr-1" />
          )}
          <span className={isRealTime ? 'text-green-700' : 'text-yellow-700'}>
            {isRealTime ? '实时数据' : '缓存数据'}
          </span>
        </div>

        <div className="flex items-center">
          {sourceVerified ? (
            <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
          ) : (
            <XCircle className="w-4 h-4 text-red-500 mr-1" />
          )}
          <span className={sourceVerified ? 'text-green-700' : 'text-red-700'}>
            {sourceVerified ? '来源已验证' : '来源待验证'}
          </span>
        </div>

        {lastUpdate && (
          <div className="text-gray-500">
            更新于 {realTimeNewsService.formatTimeAgo(lastUpdate)}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentFreshnessWarning;
