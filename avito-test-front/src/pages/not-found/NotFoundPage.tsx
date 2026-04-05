import { type JSX } from 'react';
import { Button, Space, Typography } from 'antd';
import { useNavigate } from 'react-router';
import { ArrowLeftOutlined, AppstoreOutlined } from '@ant-design/icons';

import { PATHS } from '../../app/router';
import './NotFoundPage.css';

const { Title, Text } = Typography;

function NotFoundPage(): JSX.Element {

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoToAds = () => {
    navigate(PATHS.Ads);
  };

  return (
    <div className="not-found-container">
      <div className="not-found-content">

        <div className="error-code">
          <span className="digit digit-1">4</span>
          <span className="digit digit-2">0</span>
          <span className="digit digit-3">4</span>
        </div>

        <Title level={2} className="error-title">
          Страница не найдена
        </Title>

        <Text className="error-description">
          Извините, страница, которую вы ищете, не существует или была перемещена
        </Text>

        <Space size="middle" className="action-buttons">
          <Button
            type="default"
            icon={<ArrowLeftOutlined />}
            onClick={handleGoBack}
            className="back-button"
          >
            Назад
          </Button>
          <Button
            type="primary"
            icon={<AppstoreOutlined />}
            onClick={handleGoToAds}
            className="ads-button"
          >
            К моим объявлениям
          </Button>
        </Space>
      </div>

      <div className="decor-blob blob-1"></div>
      <div className="decor-blob blob-2"></div>
      <div className="decor-blob blob-3"></div>
      <div className="decor-blob blob-4"></div>
    </div>
  );
};

export default NotFoundPage;