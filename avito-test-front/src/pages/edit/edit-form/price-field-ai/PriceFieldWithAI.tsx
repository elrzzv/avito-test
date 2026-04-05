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

export default function PriceFieldWithAI({ formData }: PriceFieldWithAIProps): JSX.Element {
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
      const price = await getMarketPrice(formData);
      setAiPrice(price);
      setAiFullResponse(`Средняя цена для ${formData.title} с учетом состояния - ${price} ₽`);
      message.success(`Рыночная цена получена: ${price} ₽`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Не удалось получить цену';
      setError(msg);
      message.error(msg);
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

  const getButtonIcon = () => {
    if (loading) return <LoadingOutlined />;
    if (aiPrice) return <RedoOutlined />;
    return <BulbOutlined />;
  };

  return (
    <div className="price-field-wrapper">
      <Form.Item
        label="Цена"
        name="price"
        rules={[{ required: true, message: 'Введите цену' }]}
        className="price-form-item"
      >
        <Input type="number" placeholder="0" />
      </Form.Item>

      <div className="ai-button-container">
        <Button
          type="text"
          className="ai-price-btn"
          icon={getButtonIcon()}
          onClick={handleMarketPrice}
          disabled={loading}
        >
          {loading ? 'Загрузка...' : aiPrice ? 'Повторить запрос' : 'Узнать рыночную стоимость'}
        </Button>

        <AIPriceTooltip
          loading={loading}
          price={aiPrice}
          error={error}
          visible={tooltipVisible}
          itemTitle={formData.title}
          aiResponse={aiFullResponse || undefined}
          onClose={() => setTooltipVisible(false)}
          onApply={handleApplyPrice}
          onRetry={handleMarketPrice}
        />
      </div>
    </div>
  );
}