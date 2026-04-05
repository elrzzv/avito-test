import type { JSX } from 'react';
import { Tooltip, Button, Space, Divider } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './AIPriceTooltip.css';

interface AIPriceTooltipProps {
  loading: boolean;
  price: string | null;
  error: string | null;
  visible: boolean;
  itemTitle?: string;
  aiResponse?: string;
  onClose?: () => void;
  onApply?: () => void;
  onRetry?: () => void;
}

export function AIPriceTooltip({
  loading, price, error, visible, itemTitle, aiResponse, onClose, onApply, onRetry
}: AIPriceTooltipProps): JSX.Element | null {
  const preventAutoClose = () => { };
  const whiteOverlayStyle = { backgroundColor: '#ffffff', color: '#000000' };

  const getContent = () => {
    if (loading) {
      return (
        <div className="ai-tooltip-content loading">
          <LoadingOutlined style={{ fontSize: 20, color: '#1677ff' }} spin />
        </div>
      );
    }
    if (error) {
      return (
        <div className="ai-tooltip-content error">
          <div className="ai-tooltip-error-title">Произошла ошибка</div>
          <div className="ai-tooltip-error-message">{error}</div>
          <div className="ai-tooltip-error-hint">Попробуйте повторить запрос или закройте уведомление</div>
          <Divider style={{ margin: '12px 0 8px 0' }} />
          <Space className="ai-tooltip-actions">
            {onRetry && <Button onClick={onRetry}>Повторить</Button>}
            <Button className="ai-tooltip-btn" onClick={onClose}>Закрыть</Button>
          </Space>
        </div>
      );
    }
    if (price) {
      const text = aiResponse || `Средняя цена для ${itemTitle || 'товара'} с учетом состояния - ${price} ₽`;
      return (
        <div className="ai-tooltip-content success">
          <div className="ai-tooltip-response-label">Ответ AI:</div>
          <div className="ai-tooltip-response-text">{text}</div>
          <Divider style={{ margin: '12px 0 8px 0' }} />
          <Space className="ai-tooltip-actions">
            <Button
              type="primary"
              className="ai-tooltip-btn-primary"
              onClick={() => { onApply?.(); onClose?.(); }}
            >
              Применить
            </Button>
            <Button className="ai-tooltip-btn" onClick={onClose}>Закрыть</Button>
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
      placement="top"
      rootClassName="ai-price-tooltip"
      overlayInnerStyle={whiteOverlayStyle}
      onOpenChange={preventAutoClose}
      getPopupContainer={(node) => node.parentElement || document.body}
      title={content}
    >

      <div className="ai-tooltip-anchor" />
    </Tooltip>
  );
}