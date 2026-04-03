import { useCallback, useEffect, useState, type JSX } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import ProductPageHeader from './header/ProductPageHeader';
import CardInfo from './card-info/CardInfo';
import { type Item } from '../../types/types';
import './ProductPage.css';
import ErrorPage from '../../components/error/ErrorPage';
import LoadingPage from '../../components/loading-page/LoadingPage';

function ProductPage(): JSX.Element {
  const { id } = useParams();
  const [productData, setProductData] = useState<Item>();
  const [isLoading, setIsLoading] = useState(false);

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

  if (isLoading) {
    return (
      <LoadingPage />
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