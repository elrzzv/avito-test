import type { JSX } from "react";
import { Input, Select } from 'antd';
import { SearchOutlined, UnorderedListOutlined, AppstoreOutlined } from '@ant-design/icons';
import { type Tsort } from "../AdsPage";
import './AdsPageHeader.css';

const { Option } = Select;

interface AdsHeaderProps {
  total: number;
  search: string;
  onSearch: (searchText: string) => void;
  sort: Tsort;
  onSort: (value: string) => void;
}

export default function AdsPageHeader(
  {total, search, onSearch, sort, onSort}: AdsHeaderProps): JSX.Element {

  const adsCountName = (total: number) => {
    if (!total)
      return 'Нет актуальных объявлений';
    if (total >= 11 && total <= 19)
      return `${total} объявлений`;
    if (total%10 === 1)
      return `${total} объявление`;
    if (total%10 in [2, 3, 4])
      return `${total} объявления`;
    if (total%10 in [5, 6, 7, 8, 9])
      return `${total} объявлений`;
    return '';
  }

  const getSelectValue = (sort: Tsort): string => {
    return `${sort.sortColumn}-${sort.sortDirection}`;
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
          value={search}
          onChange={(event) => onSearch(event.target.value)}
        />
        <div className="view-toggle">
          <AppstoreOutlined className="icon active" />
          <UnorderedListOutlined className="icon" />
        </div>
        <Select 
          value={getSelectValue(sort)} 
          className="sort-select"
          onChange={onSort}
        >
          <Option value="createdAt-desc">По новизне (сначала новые)</Option>
          <Option value="createdAt-asc">По новизне (сначала старые)</Option>
          <Option value="price-asc">По цене (возрастание)</Option>
          <Option value="price-desc">По цене (убывание)</Option>
          <Option value="title-asc">По названию (А → Я)</Option>
          <Option value="title-desc">По названию (Я → А)</Option>
        </Select>
      </div>
    </div>
  );
}