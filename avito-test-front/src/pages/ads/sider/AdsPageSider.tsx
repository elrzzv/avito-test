import type { JSX } from "react";
import { Switch } from 'antd';
import { formatCategory } from "../../../utils/category";
import './AdsPageSider.css';

interface AdsPageSiderProps {
  selectedCategories: string[];
  needsRevision: boolean;
  onCategoryChange: (category: string, checked: boolean) => void;
  onNeedsRevisionChange: (checked: boolean) => void;
  onReset: () => void;
}

export default function AdsPageSider(
  { 
    selectedCategories, needsRevision, onCategoryChange, onNeedsRevisionChange, onReset
  }: AdsPageSiderProps): JSX.Element {

  const categories = ['auto', 'electronics', 'real_estate' ];

  return (
    <div className="filters-sidebar">
      <div className="filters-main-card">
        <h3 className="filters-title">Фильтры</h3>
        
        <div className="filter-group">

          <div className="filter-header">
            <span>Категория</span>
            <span className="arrow">⌃</span>
          </div>

          <div className="filter-options">
            {categories.map((c, i) => 
              <label key={i} className="checkbox-label">
                <input 
                  type="checkbox"
                  value={c}
                  checked={selectedCategories.includes(c)}
                  onChange={(event) => onCategoryChange(c, event.target.checked)}
                />
                <span>{formatCategory(c)}</span>
              </label>
            )}
          </div>

        </div>

        <div className="divider"></div>

        <div className="filter-group">
          <label className="switch-label">
            <span>Только требующие доработок</span>
            <Switch 
              size="small"
              checked={needsRevision}
              onChange={onNeedsRevisionChange}
            />
          </label>
        </div>
      </div>

      <button 
        className="reset-filters-btn"
        onClick={onReset}
      >
        Сбросить фильтры
      </button>
    </div>
  );
}