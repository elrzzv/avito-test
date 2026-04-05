import type { JSX } from 'react';
import { Button, Space, Typography } from 'antd';
import { useNavigate } from 'react-router';
import { ArrowLeftOutlined, AppstoreOutlined } from '@ant-design/icons';

import { PATHS } from '../../app/router';
import './ErrorPage.css';

const { Title, Text } = Typography;

export default function ErrorPage(): JSX.Element {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoToAds = () => {
    navigate(PATHS.Ads);
  };

  return (
    <div className="error-container">
      <div className="error-content">
        <div className="error-icon-wrapper">
          <div className="error-icon">⚠️</div>
        </div>

        <Title level={2} className="error-title">
          Товар не найден
        </Title>

        <Text className="error-description">
          К сожалению, товар, который вы ищете, не существует или был удалён
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
}