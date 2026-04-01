import type { JSX } from "react";
import { Helmet } from "react-helmet-async";
import './AdsPage.css';
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

export default function AdsPage(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>Мои объявления - Avito</title>
      </Helmet>
      
      <Layout className="layout-root">
        <Header className="layout-header">
          Header
        </Header>
        
        <Layout>
          <Sider width="25%" className="layout-sider">
            Sider Bar
          </Sider>
          
          <Layout>
            <Content className="layout-content">
              Content
            </Content>
            <Footer className="layout-footer">
              Footer
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}