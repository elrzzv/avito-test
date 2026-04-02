import { useCallback, useEffect, useState, type JSX } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { Layout } from 'antd';

import AdsPageHeader from './header/AdsPageHeader';
import AdsPageSider from './sider/AdsPageSider';
import AdCards from './cards/AdCards';
import AdsPageFooter from './footer/AdsPageFooter';
import { 
  type TItemsListResponseItem as TItem,
  type ItemSortColumn as TItemSortColumn,
  type SortDirection as TSortDirection
} from "../../types/types"; 
import './AdsPage.css';

const { Sider } = Layout;

function calculateItemsPerPage(){
  let itemsPerRow: number = 0;
  let rowsToShow : number = 0;

  const width = window.innerWidth;
  if (width > 1400) itemsPerRow = 5;
  else if (width > 1100) itemsPerRow = 4;
  else if (width > 800) itemsPerRow = 3;
  else itemsPerRow = 2;

  const height = window.innerHeight;
  if (height > 1200) rowsToShow = 3;
  else if (height > 800) rowsToShow = 2;
  else rowsToShow = 1;

  return [itemsPerRow, rowsToShow];
}

export interface Tsort {
  sortColumn: TItemSortColumn;
  sortDirection: TSortDirection;
}

export default function AdsPage(): JSX.Element {

  const [items, setItems] = useState<TItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [needsRevision, setNeedsRevision] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [sort, setSort] = useState<Tsort>({sortColumn: 'createdAt',sortDirection: 'desc'})

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try{
      const params = new URLSearchParams();
      params.append('limit', '100');
      params.append('q', search);
      params.append('sortColumn', sort.sortColumn);
      params.append('sortDirection', sort.sortDirection);
      if (selectedCategories.length > 0) {
        params.append('categories', selectedCategories.join(','));
      }
      if (needsRevision){
        params.append('needsRevision', 'true')
      }

      const response = await axios.get(`/api/items?${params.toString()}`);
      setItems(response.data.items);
      setTotal(response.data.total);

    } catch (error) {
      console.error('Ошибка при загрузке объявлений:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedCategories, needsRevision, search, sort])

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    setSelectedCategories(prev => 
      checked 
        ? [...prev, category]
        : prev.filter(c => c !== category)
    );
    setPage(1);
  };

  const handleNeedsRevisionChange = (checked: boolean) => {
    setNeedsRevision(checked);
    setPage(1);
  };

  const handleResetFilters = () => {
    setSelectedCategories([]);
    handleNeedsRevisionChange(false);
    setPage(1);
  };

  const handleSearch = (searchText: string) => {
    setSearch(searchText);
  }

  const handleSort = (value: string) => {
    const [sortColumn, sortDirection] = value.split('-');
    setSort({ sortColumn, sortDirection } as Tsort);
  }

  const [page, setPage] = useState<number>(1);

  const [itemsPerRow, rowsToShow] = calculateItemsPerPage();
  const itemsPerPage = itemsPerRow * rowsToShow;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;


  return (
    <>
      <Helmet>
        <title>Мои объявления - Avito</title>
      </Helmet>
      
      <div className="page-container">
        <AdsPageHeader 
          total={total} 
          search={search} onSearch={handleSearch} 
          sort={sort} onSort={handleSort}
        />

        <Layout className="main-layout">
          <Sider width={240} className="sider-wrapper" theme="light">
            <AdsPageSider 
              selectedCategories={selectedCategories}
              needsRevision={needsRevision}
              onCategoryChange={handleCategoryChange}
              onNeedsRevisionChange={handleNeedsRevisionChange}
              onReset={handleResetFilters}
            />
          </Sider>
          
          <Layout className="content-layout">
            <AdCards 
              ads={items.slice(startIndex, endIndex)} loading={loading}
            />

            <AdsPageFooter 
              total={total} itemsPerPage={itemsPerPage}
              page={page} onPageChange={handlePageChange} />
          </Layout>
        </Layout>
      </div>
    </>
  );
}