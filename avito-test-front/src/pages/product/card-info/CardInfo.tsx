import { type JSX } from 'react';
import ImageDescription from './image-description/ImageDescription';
import ProductDetails from './details/ProductDetails';
import './CardInfo.css';

interface CardInfoProps {
  imageUrl: string;
  type: string;
  brand: string;
  model: string;
  description: string;
}

function CardInfo({imageUrl, type, brand, model, description}: CardInfoProps): JSX.Element{
  return (
    <div className="card-info">
      <div className="card-info-grid">
        <div className="card-info-left">
          <ImageDescription 
            imageUrl={imageUrl} 
            description={description} 
          />
        </div>
        <div className="card-info-right">
          <ProductDetails 
            type={type} 
            brand={brand} 
            model={model} 
          />
        </div>
      </div>
    </div>
  );
};

export default CardInfo;