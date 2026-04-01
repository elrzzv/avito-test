import type { JSX } from "react";
import { Card } from 'antd';
import './AdCard.css';

export type AdCardProps = {
  id: number;
  category: string;
  title: string;
  price: string;
  image: string;
  needsWork?: boolean;
}

export default function AdCard({ id, category, title, price, image, needsWork }: AdCardProps): JSX.Element {
  return (
    <Card 
      className="ad-card"
      hoverable
      cover={<img alt={title} src={image} className="ad-image" />}
    >
      <div className="ad-category">{category}</div>
      <h3 className="ad-title">{title}</h3>
      <div className="ad-price">{price}</div>
      {needsWork && (
        <div className="ad-badge">Требует доработок</div>
      )}
    </Card>
  );
}