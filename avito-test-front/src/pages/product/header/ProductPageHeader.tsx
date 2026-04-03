import { type JSX } from 'react';
import { Button, Typography } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import { formatMoney } from '../../../utils/money';
import './ProductPageHeader.css';
import { formatDate } from '../../../utils/formatDate';

const { Title, Text } = Typography;

interface ProductPageHeaderProps {
  title: string;
  price: number | null;
  createdAt: string;
  updatedAt: string;
  onEdit: () => void;
}

function ProductPageHeader({ title, price,
  createdAt, updatedAt, onEdit }: ProductPageHeaderProps): JSX.Element {
    
  return (
    <div className="product-header">
      <div className="header-left">
        <Title level={3} className="product-title">
          {title}
        </Title>
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={onEdit}
          className="edit-button"
        >
          Редактировать
        </Button>
      </div>
      <div className="header-right">
        <div className="price-value">{formatMoney(price)}</div>
        <div className="date-item">
          <Text className="date-label">Опубликовано:</Text>
          <Text className="date-text">{formatDate(createdAt)}</Text>
        </div>
        {
          createdAt !== updatedAt ?
            <div className="date-item">
              <Text className="date-label">Отредактировано:</Text>
              <Text className="date-text">{formatDate(updatedAt)}</Text>
            </div>
          : null
        }
      </div>
    </div>
  );
};

export default ProductPageHeader;