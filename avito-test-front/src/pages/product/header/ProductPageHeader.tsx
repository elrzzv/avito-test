import { type JSX } from 'react';
import { Button, Typography } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import './ProductPageHeader.css';

const { Title, Text } = Typography;

interface ProductPageHeaderProps {
  productName: string;
  price: number;
  publishDate: string;
  editDate: string;
  onEdit: () => void;
}

function ProductPageHeader({ productName, price,
  publishDate, editDate, onEdit }: ProductPageHeaderProps): JSX.Element {

  const formattedPrice = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0
  }).format(price);

  return (
    <div className="product-header">
      <div className="header-left">
        <Title level={3} className="product-title">
          {productName}
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
        <div className="price-value">{formattedPrice}</div>
        <div className="date-item">
          <Text className="date-label">Опубликовано:</Text>
          <Text className="date-text">{publishDate}</Text>
        </div>
        <div className="date-item">
          <Text className="date-label">Отредактировано:</Text>
          <Text className="date-text">{editDate}</Text>
        </div>
      </div>
    </div>
  );
};

export default ProductPageHeader;