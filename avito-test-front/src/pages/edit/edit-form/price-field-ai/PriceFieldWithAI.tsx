import { useCallback, useState, type JSX } from 'react';
import { Form, Input, Button, message } from 'antd';
import { BulbOutlined, LoadingOutlined, RedoOutlined } from '@ant-design/icons';

import type { Item } from '../../../../types/types';
import { getMarketPrice } from '../../../../services/gigachat';
import { AIPriceTooltip } from './ai-price-tooltip/AIPriceTooltip';
import './PriceFieldWithAI.css';

interface PriceFieldWithAIProps {
  formData: Item;
}

function PriceFieldWithAI({ formData }: PriceFieldWithAIProps): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [aiPrice, setAiPrice] = useState<string | null>(null);
  const [aiFullResponse, setAiFullResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = Form.useFormInstance();

  const handleMarketPrice = useCallback(async () => {
    setLoading(true);
    setTooltipVisible(true);
    setError(null);
    setAiPrice(null);
    setAiFullResponse(null);
    
    try {
      const priceFromAI = await getMarketPrice(formData);
      setAiPrice(priceFromAI);
      
      const responseText = `Средняя цена для ${formData.title} с учетом состояния - ${priceFromAI} ₽`;
      setAiFullResponse(responseText);
      
      message.success(`Рыночная цена получена: ${priceFromAI} ₽`);
      
    } catch (err) {
      console.error('Error getting market price:', err);
      const errorMessage = err instanceof Error ? err.message : 'Не удалось получить рыночную стоимость. Попробуйте повторить запрос позже.';
      setError(errorMessage);
      message.error(errorMessage);
      
    } finally {
      setLoading(false);
    }
  }, [formData]);

  const handleApplyPrice = useCallback(() => {
    if (aiPrice && form) {
      form.setFieldValue('price', Number(aiPrice));
      message.success(`Цена ${aiPrice} ₽ применена`);
      setTooltipVisible(false);
    }
  }, [aiPrice, form]);

  const handleRetry = useCallback(() => {
    handleMarketPrice();
  }, [handleMarketPrice]);

  const handleCloseTooltip = () => {
    setTooltipVisible(false);
  };

  const getButtonIcon = () => {
    if (loading) return <LoadingOutlined />;
    if (aiPrice) return <RedoOutlined />;
    return <BulbOutlined />;
  };

  const getButtonText = () => {
    if (loading) return 'Выполняется запрос...';
    if (aiPrice) return 'Повторить запрос';
    return 'Узнать рыночную стоимость';
  };

  const isButtonDisabled = loading;

  return (
    <div className="price-wrapper">
      <Form.Item
        label="Цена"
        name="price"
        rules={[{ required: true, message: 'Введите цену' }]}
        className="price-form-item required-field"
      >
        <Input
          className="edit-page-input"
          placeholder="Введите цену"
          allowClear
        />
      </Form.Item>

      <div className="ai-button-container">
        <Button
          type="text"
          className="ai-price-btn"
          icon={getButtonIcon()}
          onClick={handleMarketPrice}
          disabled={isButtonDisabled}
        >
          {getButtonText()}
        </Button>
        
        <AIPriceTooltip
          loading={loading}
          price={aiPrice}
          error={error}
          visible={tooltipVisible}
          itemTitle={formData.title}
          aiResponse={aiFullResponse || undefined}
          onClose={handleCloseTooltip}
          onApply={handleApplyPrice}
          onRetry={handleRetry}
        />
      </div>
    </div>
  );
}

export default PriceFieldWithAI;