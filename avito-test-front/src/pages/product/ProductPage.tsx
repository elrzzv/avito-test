import { type JSX } from 'react';
import ProductPageHeader from './header/ProductPageHeader';
import CardInfo from './card-info/CardInfo';
import './ProductPage.css';

interface ProductData {
  name: string;
  price: number;
  publishDate: string;
  editDate: string;
  imageUrl: string;
  type: string;
  brand: string;
  model: string;
  description: string;
}

function ProductPage():JSX.Element{

  const productData: ProductData = {
    name: 'MacBook Pro 16”',
    price: 64000,
    publishDate: '10 марта 22:39',
    editDate: '10 марта 23:12',
    imageUrl: '/placeholder-image.png',
    type: 'Ноутбук',
    brand: 'Apple',
    model: 'M1 Pro',
    description: 'Продаю свой MacBook Pro 16" (2021) на чипе M1 Pro. Состояние отличное, работал бережно. Мощности хватает на всё: от сложного монтажа до кода, при этом ноутбук почти не греется.'
  };

  const handleEdit = () => {
    console.log('Редактировать товар');
    // здесь будет логика редактирования
  };

  return (
    <div className="product-page">
      <ProductPageHeader
        productName={productData.name}
        price={productData.price}
        publishDate={productData.publishDate}
        editDate={productData.editDate}
        onEdit={handleEdit}
      />
      <CardInfo
        imageUrl={productData.imageUrl}
        type={productData.type}
        brand={productData.brand}
        model={productData.model}
        description={productData.description}
      />
    </div>
  );
};

export default ProductPage;