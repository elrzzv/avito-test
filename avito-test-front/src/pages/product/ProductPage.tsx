import { useCallback, useEffect, useState, type JSX } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import ProductPageHeader from './header/ProductPageHeader';
import CardInfo from './card-info/CardInfo';
import { type Item } from '../../types/types';
import './ProductPage.css';

function ProductPage():JSX.Element{
  const {id} = useParams();
  const [productData, setProductData] = useState<Item>();

  const loadProducts = useCallback(async() => {
    const response = await axios.get(`/api/items/${id}`);
    setProductData(response.data);
  }, [id]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleEdit = () => {
    console.log('Редактировать товар');
    // здесь будет логика редактирования
  };

  return (
    <div className="product-page">
      {
        productData ? (<>
          <ProductPageHeader
            title={productData.title}
            price={productData.price}
            createdAt={productData.createdAt}
            updatedAt={productData.updatedAt}
            onEdit={handleEdit}
          />
          
          <CardInfo
            category={productData.category}
            params={productData.params}
            description={productData.description}
          />          
        </>): (
          <div>Loading or error </div>
        )
      }
    </div>
  );
};

export default ProductPage;