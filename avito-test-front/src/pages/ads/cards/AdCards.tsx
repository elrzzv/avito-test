import type { JSX } from "react";
import AdCard, { type AdCardProps } from './card/AdCard'
import './AdCards.css';

export type AdCardsProps = {
  ads: AdCardProps[];
}

export default function AdCards({ ads }: AdCardsProps): JSX.Element {
  return (
    <div className="ads-content">
      <div className="ads-grid">
        {ads.map((ad) => (
          <AdCard key={ad.id} {...ad} />
        ))}
      </div>
    </div>
  );
}