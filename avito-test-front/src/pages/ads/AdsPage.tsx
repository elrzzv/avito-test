import type { JSX } from "react";
import { Helmet } from "react-helmet-async";
import { Layout } from 'antd';
import AdsPageHeader from './header/AdsPageHeader';
import AdsPageSider from './sider/AdsPageSider';
import AdCards from './cards/AdCards';
import AdsPageFooter from './footer/AdsPageFooter';
import './AdsPage.css';

const { Sider } = Layout;

const sampleAds = [
  {
    id: 1,
    category: 'Электроника',
    title: 'Наушники',
    price: '2990 ₽',
    image: 'https://via.placeholder.com/200x150?text=Image',
    needsWork: false,
  },
  {
    id: 2,
    category: 'Авто',
    title: 'Volkswagen Polo',
    price: '1 100 000 ₽',
    image: 'https://via.placeholder.com/200x150?text=Image',
    needsWork: true,
  },
];

export default function AdsPage(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>Мои объявления - Avito</title>
      </Helmet>
      
      <div className="page-container">
        <AdsPageHeader />

        <Layout className="main-layout">
          <Sider width={240} className="sider-wrapper" theme="light">
            <AdsPageSider />
          </Sider>
          
          <Layout className="content-layout">
            <AdCards ads={sampleAds} />
            <AdsPageFooter />
          </Layout>
        </Layout>
      </div>
    </>
  );
}