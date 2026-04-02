import type { JSX } from "react";
import AdCard from './card/AdCard'
import { type TItemsListResponseItem as TItem } from "../../../types/types";
import './AdCards.css';

export type AdCardsProps = {
  ads: TItem[];
}

export default function AdCards({ ads }: AdCardsProps): JSX.Element {
  
  return (
    <div className="ads-content">
      <div className="ads-grid">
        {ads.map((ad) => (
          <AdCard key={ad.id} ad={ad} />
        ))}
      </div>
    </div>
  );
}