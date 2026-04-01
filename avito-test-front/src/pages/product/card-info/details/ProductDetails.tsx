import { type JSX } from 'react';
import { Typography, Alert } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import './ProductDetails.css';

const { Title, Text } = Typography;

interface ProductDetailsProps {
  type: string;
  brand: string;
  model: string;
}

function ProductDetails({type, brand, model}: ProductDetailsProps): JSX.Element{

  const isIncomplete = true;

  return (
    <div className="product-details">
      {isIncomplete && (
        <Alert
          message={<span style={{ fontWeight: 620 }}>Требуются доработки</span>}
          description={
            <div className="warning-description">
              У объявления не заполнены поля:
              <ul className="warning-list">
                <li>Цвет</li>
                <li>Состояние</li>
              </ul>
            </div>
          }
          type="warning"
          icon={<ExclamationCircleFilled />}
          showIcon
          className="warning-alert"
        />
      )}
      <div className="characteristics-section">
        <Title level={4} className="characteristics-title">
          Характеристики
        </Title>
        <div className="characteristics-list">
          <div className="characteristic-item">
            <Text className="characteristic-label">Тип</Text>
            <Text className="characteristic-value">{type || '—'}</Text>
          </div>
          <div className="characteristic-item">
            <Text className="characteristic-label">Бренд</Text>
            <Text className="characteristic-value">{brand || '—'}</Text>
          </div>
          <div className="characteristic-item">
            <Text className="characteristic-label">Модель</Text>
            <Text className="characteristic-value">{model || '—'}</Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;