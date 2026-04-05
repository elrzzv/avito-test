import type { JSX } from 'react';
import { Tooltip, Button, Space, Divider } from 'antd';
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
  loading, 
  price, 
  error, 
  visible,
  itemTitle,
  aiResponse,
  onClose,
  onApply
}: AIPriceTooltipProps): JSX.Element | null {
  
  if (loading) {
    return (
      <Tooltip
        title={
          <div className="ai-tooltip-content loading">
            <div className="ai-tooltip-spinner"></div>
            <div>
              <div className="ai-tooltip-title">Анализ рынка</div>
              <div className="ai-tooltip-message">Выполняется запрос к нейросети...</div>
            </div>
          </div>
        }
        open={visible}
        placement="rightTop"
        rootClassName="ai-price-tooltip"
        onOpenChange={(vis) => {
          if (!vis && onClose) onClose();
        }}
      >
        <span style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }} />
      </Tooltip>
    );
  }
  
  if (error) {
    return (
      <Tooltip
        title={
          <div className="ai-tooltip-content error">
            <div style={{ width: '100%' }}>
              <div className="ai-tooltip-error-title">Произошла ошибка при запросе к AI</div>
              <div className="ai-tooltip-error-message">{error}</div>
              <div className="ai-tooltip-error-hint">Попробуйте повторить запрос или закройте уведомление</div>
              <Divider style={{ margin: '12px 0 8px 0', backgroundColor: '#FCB3AD' }} />
              <Space size="small" style={{ width: '100%', justifyContent: 'flex-end', gap: '8px' }}>
                <Button 
                  size="middle"
                  className="ai-tooltip-error-close-btn"
                  onClick={onClose}
                >
                  Закрыть
                </Button>
              </Space>
            </div>
          </div>
        }
        open={visible}
        placement="rightTop"
        rootClassName="ai-price-tooltip"
        onOpenChange={(vis) => {
          if (!vis && onClose) onClose();
        }}
      >
        <span style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }} />
      </Tooltip>
    );
  }
  
  if (price) {
    const formattedResponse = aiResponse || `Средняя цена для ${itemTitle || 'товара'} с учетом состояния - ${price} ₽`;
    
    return (
      <Tooltip
        title={
          <div className="ai-tooltip-content success">
            <div style={{ width: '100%' }}>
              <div className="ai-tooltip-response-label">Ответ AI:</div>
              <div className="ai-tooltip-response-text">
                {formattedResponse}
              </div>
              <Divider style={{ margin: '12px 0 8px 0' }} />
              <Space size="small" style={{ width: '100%', justifyContent: 'flex-end', gap: '8px' }}>
                <Button 
                  type="primary"
                  size="middle"
                  className="ai-tooltip-apply-btn"
                  onClick={() => {
                    onApply?.();
                    onClose?.();
                  }}
                >
                  Применить
                </Button>
                <Button 
                  size="middle"
                  className="ai-tooltip-close-btn"
                  onClick={onClose}
                >
                  Закрыть
                </Button>
              </Space>
            </div>
          </div>
        }
        open={visible}
        placement="rightTop"
        rootClassName="ai-price-tooltip"
        onOpenChange={(vis) => {
          if (!vis && onClose) onClose();
        }}
      >
        <span style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }} />
      </Tooltip>
    );
  }
  
  return null;
}