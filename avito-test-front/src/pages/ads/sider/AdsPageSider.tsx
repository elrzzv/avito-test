import type { JSX } from "react";
import { Switch } from 'antd';
import './AdsPageSider.css';

export default function AdsPageSider(): JSX.Element {
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
            <label className="checkbox-label">
              <input type="checkbox" />
              <span>Авто</span>
            </label>
            <label className="checkbox-label">
              <input type="checkbox" />
              <span>Электроника</span>
            </label>
            <label className="checkbox-label">
              <input type="checkbox" />
              <span>Недвижимость</span>
            </label>
          </div>
        </div>

        <div className="divider"></div>

        <div className="filter-group">
          <label className="switch-label">
            <span>Только требующие доработок</span>
            <Switch size="small" />
          </label>
        </div>
      </div>

      <button className="reset-filters-btn">Сбросить фильтры</button>
    </div>
  );
}