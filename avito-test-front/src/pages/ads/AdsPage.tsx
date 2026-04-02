import { useEffect, useState, type JSX } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { Layout } from 'antd';

import AdsPageHeader from './header/AdsPageHeader';
import AdsPageSider from './sider/AdsPageSider';
import AdCards from './cards/AdCards';
import AdsPageFooter from './footer/AdsPageFooter';
import { type TItemsListResponseItem as TItem } from "../../types/types"; 
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

export default function AdsPage(): JSX.Element {

  const [items, setItems] = useState<TItem[]>([]);
  const [total, setTotal] = useState<number>(0);

  const loadProducts = async () => {
    const response = await axios.get('/api/items?limit=100');
    setItems(response.data.items);
    setTotal(response.data.total);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  const [page, setPage] = useState<number>(1);

  const [itemsPerRow, rowsToShow] = calculateItemsPerPage();
  const itemsPerPage = itemsPerRow * rowsToShow;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  console.log(total)

  return (
    <>
      <Helmet>
        <title>Мои объявления - Avito</title>
      </Helmet>
      
      <div className="page-container">
        <AdsPageHeader total={total}/>

        <Layout className="main-layout">
          <Sider width={240} className="sider-wrapper" theme="light">
            <AdsPageSider />
          </Sider>
          
          <Layout className="content-layout">
            <AdCards ads={items.slice(startIndex, endIndex)} />
            <AdsPageFooter total={total} itemsPerPage={itemsPerPage}
              page={page} setPage={setPage} />
          </Layout>
        </Layout>
      </div>
    </>
  );
}