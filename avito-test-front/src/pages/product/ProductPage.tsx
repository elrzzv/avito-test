import { useCallback, useEffect, useState, type JSX } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import ProductPageHeader from './header/ProductPageHeader';
import CardInfo from './card-info/CardInfo';
import { type Item } from '../../types/types';
import './ProductPage.css';
import ErrorPage from './error/ErrorPage';

function ProductPage(): JSX.Element {
  const { id } = useParams();
  const [productData, setProductData] = useState<Item>();
  const [isLoading, setIsLoading] = useState(true);

  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/items/${id}`);
      setProductData(response.data);
    } catch (error) {
      console.error('Ошибка загрузки:', error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleEdit = () => {
    console.log('Редактировать товар');
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <img src="/loading.webp" alt="Загрузка" className="loading-image" />
        <div className="loading-text">Ожидайте, страница загружается...</div>
      </div>
    );
  }

  return (
    <div className="product-page">
      {productData ? (
        <>
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
        </>
      ) : (
        <ErrorPage />
      )}
    </div>
  );
}

export default ProductPage;