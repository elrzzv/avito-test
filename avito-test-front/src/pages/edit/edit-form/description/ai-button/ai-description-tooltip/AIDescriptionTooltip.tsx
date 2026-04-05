import type { JSX } from 'react';
import { Tooltip, Button, Space, Divider } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './AIDescriptionTooltip.css';

interface AIDescriptionTooltipProps {
  loading: boolean;
  description: string | null;
  error: string | null;
  visible: boolean;
  itemTitle?: string;
  aiResponse?: string;
  onClose?: () => void;
  onApply?: () => void;
  onRetry?: () => void;
}

export function AIDescriptionTooltip({
  loading,
  description,
  error,
  visible,
  aiResponse,
  onClose,
  onApply,
  onRetry,
}: AIDescriptionTooltipProps): JSX.Element | null {
  const preventAutoClose = () => {};
  const whiteOverlayStyle = { backgroundColor: '#ffffff', color: '#000000' };

  const getContent = () => {
    if (loading) {
      return (
        <div className="ai-description-tooltip-content loading">
          <LoadingOutlined style={{ fontSize: 20, color: '#1677ff' }} spin />
          <div className="ai-description-tooltip-loading-text">Генерируем описание...</div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="ai-description-tooltip-content error">
          <div className="ai-description-tooltip-error-title">Произошла ошибка</div>
          <div className="ai-description-tooltip-error-message">{error}</div>
          <div className="ai-description-tooltip-error-hint">
            Попробуйте повторить запрос или закройте уведомление
          </div>
          <Divider style={{ margin: '12px 0 8px 0' }} />
          <Space className="ai-description-tooltip-actions">
            {onRetry && (
              <Button className="ai-description-tooltip-btn" onClick={onRetry}>
                Повторить
              </Button>
            )}
            <Button className="ai-description-tooltip-btn" onClick={onClose}>
              Закрыть
            </Button>
          </Space>
        </div>
      );
    }

    if (description) {
      const text = aiResponse || description;
      return (
        <div className="ai-description-tooltip-content success">
          <div className="ai-description-tooltip-response-label">Ответ AI:</div>
          <div className="ai-description-tooltip-response-text">{text}</div>
          <Divider style={{ margin: '12px 0 8px 0' }} />
          <Space className="ai-description-tooltip-actions">
            <Button
              type="primary"
              className="ai-description-tooltip-btn-primary"
              onClick={() => {
                onApply?.();
                onClose?.();
              }}
            >
              Применить
            </Button>
            <Button className="ai-description-tooltip-btn" onClick={onClose}>
              Закрыть
            </Button>
          </Space>
        </div>
      );
    }

    return null;
  };

  const content = getContent();
  if (!content) return null;

  return (
    <Tooltip
      open={visible}
      trigger={[]}
      placement="topLeft"
      rootClassName="ai-description-price-tooltip"
      overlayInnerStyle={whiteOverlayStyle}
      onOpenChange={preventAutoClose}
      getPopupContainer={(node) => node.parentElement || document.body}
      title={content}
    >
      <div className="ai-description-tooltip-anchor" />
    </Tooltip>
  );
}