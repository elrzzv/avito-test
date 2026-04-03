import { type JSX } from 'react';
import ImageDescription from './image-description/ImageDescription';
import ProductDetails from './details/ProductDetails';
import { type Item } from '../../../types/types';
import './CardInfo.css';

interface CardInfoProps {
  imageUrl?: string;
  category: Item['category'];
  params: Item['params'];
  description?: string;
}

function CardInfo({imageUrl, category, params, description}: CardInfoProps): JSX.Element{
  return (
    <div className="card-info">
      <div className="card-info-grid">
        <div className="card-info-left">
          <ImageDescription 
            imageUrl={imageUrl ?? '/placeholder-image.png'} 
            description={description ?? ''}
          />
        </div>
        <div className="card-info-right">
          <ProductDetails category={category} params={params} />
        </div>
      </div>
    </div>
  );
};

export default CardInfo;