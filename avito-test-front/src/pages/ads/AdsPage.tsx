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
            <AdCards ads={items} />
            <AdsPageFooter />
          </Layout>
        </Layout>
      </div>
    </>
  );
}