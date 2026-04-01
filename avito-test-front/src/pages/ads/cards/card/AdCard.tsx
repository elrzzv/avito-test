import type { JSX } from "react";
import { Card } from 'antd';
import './AdCard.css';

export type AdCardProps = {
  id: number;
  category: string;
  title: string;
  price: string;
  image?: string;
  needsWork?: boolean;
}

const placeholder_image = '/placeholder-image.png';

export default function AdCard({ id, category, title, price, 
  needsWork, image = placeholder_image }: AdCardProps): JSX.Element {
  return (
    <div className="ad-card-wrapper">
      <Card 
        className="ad-card"
        hoverable
        cover={<img alt={title} src={image} className="ad-image" />}
      >
        <div className="ad-content">
          <h3 className="ad-title">{title}</h3>
          <div className="ad-price">{price}</div>
          {needsWork && (
            <div className="ad-badge">
              <span className="badge-dot"></span>
              <span>Требует доработок</span>
            </div>
          )}
        </div>
      </Card>
      <div className="ad-category">{category}</div>
    </div>
  );
}