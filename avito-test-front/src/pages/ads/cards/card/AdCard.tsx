import type { JSX } from "react";
import { Card } from 'antd';
import { type TItemsListResponseItem as TItem } from "../../../../types/types";
import { formatMoney } from "../../../../utils/money";
import { formatCategory } from "../../../../utils/category";
import './AdCard.css';

export type AdCardProps = {
  ad: TItem;
};

const placeholder_image = '/placeholder-image.png';

export default function AdCard({ ad }: AdCardProps): JSX.Element {
  return (
    <div className="ad-card-wrapper">
      <Card 
        className="ad-card"
        hoverable
        cover={<img alt={ad.title} src={placeholder_image} className="ad-image" />}
      >
        <div className="ad-content">
          <h3 className="ad-title">{ad.title}</h3>
          <div className="ad-price">{formatMoney(ad.price)}</div>
          {ad.needsRevision && (
            <div className="ad-badge">
              <span className="badge-dot"></span>
              <span>Требует доработок</span>
            </div>
          )}
        </div>
      </Card>
      <div className="ad-category">{formatCategory(ad.category)}</div>
    </div>
  );
}