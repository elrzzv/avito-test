import { type JSX } from 'react';
import { Form, Input, Button } from 'antd';
import { CloseCircleFilled, BulbOutlined } from '@ant-design/icons';
import './PriceFieldWithAI.css';

function PriceFieldWithAI(): JSX.Element {
  const handleMarketPrice = () => {
    console.log('Получение рыночной стоимости...');
    // здесь будет запрос к AI/API
  };

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
          suffix={<CloseCircleFilled className="clear-icon" />}
        />
      </Form.Item>

      <Button
        type="text"
        className="ai-price-btn"
        icon={<BulbOutlined />}
        onClick={handleMarketPrice}
      >
        Узнать рыночную стоимость
      </Button>
    </div>
  );
}

export default PriceFieldWithAI;