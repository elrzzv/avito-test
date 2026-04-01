import type { JSX } from "react";
import { Input, Select } from 'antd';
import { SearchOutlined, UnorderedListOutlined, AppstoreOutlined } from '@ant-design/icons';
import './AdsPageHeader.css';

const { Option } = Select;

export default function AdsPageHeader(): JSX.Element {
  return (
    <div className="page-header">
      <div className="title-section">
        <h1 className="main-title">Мои объявления</h1>
        <span className="ads-count">42 объявления</span>
      </div>
      
      <div className="search-section">
        <Input 
          placeholder="Найти объявление..." 
          prefix={<SearchOutlined />}
          className="search-input"
        />
        <div className="view-toggle">
          <AppstoreOutlined className="icon active" />
          <UnorderedListOutlined className="icon" />
        </div>
        <Select defaultValue="newest" className="sort-select">
          <Option value="newest">По новизне (сначала новые)</Option>
          <Option value="oldest">По новизне (сначала старые)</Option>
          <Option value="price-asc">По цене (возрастание)</Option>
          <Option value="price-desc">По цене (убывание)</Option>
        </Select>
      </div>
    </div>
  );
}