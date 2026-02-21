import React, { useState, useEffect } from 'react';
import { RefreshCw, CheckCircle, Clock, Settings } from 'lucide-react';
import { realTimeNewsService } from '../../services/realTimeNewsService';
import { UpdateStatus } from '../../types/realtime';

interface UpdateStatusIndicatorProps {
  onRefresh?: () => void;
  showSettings?: boolean;
}

const UpdateStatusIndicator: React.FC<UpdateStatusIndicatorProps> = ({
  onRefresh,
  showSettings = false
}) => {
  const [status, setStatus] = useState<UpdateStatus>(realTimeNewsService.getUpdateStatus());
  const [showDropdown, setShowDropdown] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(5);

  useEffect(() => {
    const unsubscribe = realTimeNewsService.subscribeToStatus(setStatus);
    return unsubscribe;
  }, []);

  const handleManualRefresh = async () => {
    if (status.isUpdating) return;
    onRefresh?.();
  };

  const handleIntervalChange = (minutes: number) => {
    setRefreshInterval(minutes);
    realTimeNewsService.setUpdateInterval(minutes);
    setShowDropdown(false);
  };

  const formatTime = (dateString: string | null) => {
    if (!dateString) return '未更新';
    const date = new Date(dateString);
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
  };

  const getNextUpdateText = () => {
    if (!status.nextUpdate) return '自动更新已暂停';
    const next = new Date(status.nextUpdate);
    const now = new Date();
    const diffMs = next.getTime() - now.getTime();
    const diffMins = Math.ceil(diffMs / (1000 * 60));
    if (diffMins <= 0) return '即将更新';
    return `${diffMins}分钟后更新`;
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-3 bg-white rounded-lg border border-gray-200 px-3 py-2">
        <div className="flex items-center space-x-2">
          {status.isUpdating ? (
            <RefreshCw className="w-4 h-4 text-primary-500 animate-spin" />
          ) : (
            <CheckCircle className="w-4 h-4 text-green-500" />
          )}
          <span className="text-sm text-gray-600">
            {status.isUpdating ? '正在更新...' : '数据已同步'}
          </span>
        </div>

        <div className="h-4 w-px bg-gray-200" />

        <div className="flex items-center space-x-1 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          <span>上次更新: {formatTime(status.lastUpdate)}</span>
        </div>

        <div className="h-4 w-px bg-gray-200" />

        <span className="text-sm text-gray-500">{getNextUpdateText()}</span>

        <button
          onClick={handleManualRefresh}
          disabled={status.isUpdating}
          className={`p-1.5 rounded-lg transition-colors ${
            status.isUpdating
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-primary-50 text-primary-600 hover:bg-primary-100'
          }`}
          title="立即刷新"
        >
          <RefreshCw className={`w-4 h-4 ${status.isUpdating ? 'animate-spin' : ''}`} />
        </button>

        {showSettings && (
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="p-1.5 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
            title="设置"
          >
            <Settings className="w-4 h-4" />
          </button>
        )}
      </div>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 animate-fade-in">
          <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase">
            更新间隔设置
          </div>
          {[1, 5, 10, 30, 60].map(minutes => (
            <button
              key={minutes}
              onClick={() => handleIntervalChange(minutes)}
              className={`w-full px-3 py-2 text-left text-sm transition-colors ${
                refreshInterval === minutes
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              每 {minutes} 分钟
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpdateStatusIndicator;
