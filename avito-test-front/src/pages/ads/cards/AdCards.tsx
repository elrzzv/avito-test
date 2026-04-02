import { type JSX } from "react";
import AdCard from './card/AdCard'
import { type TItemsListResponseItem as TItem } from "../../../types/types";
import './AdCards.css';

export type AdCardsProps = {
  ads: TItem[];
  loading: boolean
}

export default function AdCards({ ads, loading }: AdCardsProps): JSX.Element {
  return (
    <div className="ads-content">
      {
        !loading ? (
          <div className="ads-grid">
            {ads.map((ad) => (
              <AdCard key={ad.id} ad={ad} />
            ))}
          </div>
        ):( 
          <div className="skeleton-grid">
            {[...Array(ads.length)].map((_, i) => (
              <div key={i} className="skeleton-card" />
            ))}
          </div>
        )
      }

    </div>
  );
}