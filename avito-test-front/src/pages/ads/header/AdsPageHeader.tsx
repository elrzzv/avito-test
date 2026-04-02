import type { JSX } from "react";
import { Input, Select } from 'antd';
import { SearchOutlined, UnorderedListOutlined, AppstoreOutlined } from '@ant-design/icons';
import './AdsPageHeader.css';

const { Option } = Select;

interface AdsHeaderProps {
  total: number;
}

export default function AdsPageHeader({total}: AdsHeaderProps): JSX.Element {

  const adsCountName = (total: number) => {
    if (!total)
      return 'Нет актуальных объявлений';
    if (total in [11, 12, 13, 14, 15, 16, 17, 18, 19])
      return `${total} объявлений`;
    if (total%10 === 1)
      return `${total} объявление`;
    if (total%10 in [2, 3, 4])
      return `${total} объявления`;
    if (total%10 in [5, 6, 7, 8, 9])
      return `${total} объявлений`;
    return '';
  }

  return (
    <div className="page-header">
      <div className="title-section">
        <h1 className="main-title">Мои объявления</h1>
        <span className="ads-count">
          {adsCountName(total)}
        </span>
      </div>
      
      <div className="search-section">
        <Input 
          placeholder="Найти объявление..." 
          suffix={<SearchOutlined />}
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