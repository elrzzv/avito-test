import { type JSX } from 'react';
import { Typography, Alert } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { type Item } from '../../../../types/types';
import { ALL_PARAMS_FIELDS, TRANSLATIONS } from '../../../../types/constants';
import './ProductDetails.css';

const { Title, Text } = Typography;

interface ProductDetailsProps {
  category: Item['category'];
  params: Item['params'];
}

function ProductDetails({ category, params }: ProductDetailsProps): JSX.Element {
  const getFieldNames = (category: Item['category']): readonly string[] => {
    return ALL_PARAMS_FIELDS[category];
  }

  const blankParams = getFieldNames(category)
    .filter((field) => !(field in params));

  const formatParam = (name: string) => {
    return TRANSLATIONS[name as keyof typeof TRANSLATIONS] ?? 'unknown';
  }

  const formatParamValue = (value: string) => {
    return TRANSLATIONS[value as keyof typeof TRANSLATIONS] ?? String(value);
  }

  return (
    <div className="product-details">
      {(blankParams.length > 0) && (
        <Alert
          title={<span style={{ fontWeight: 620 }}>Требуются доработки</span>}
          description={
            <div className="warning-description">
              У объявления не заполнены поля:
              <ul className="warning-list">
                {
                  blankParams.map((p, i) =>
                    <li key={i}>{formatParam(p)}</li>
                  )
                }
              </ul>
            </div>
          }
          type="warning"
          icon={<ExclamationCircleFilled />}
          showIcon
          className="warning-alert"
        />
      )}
      <div className="characteristics-section">
        <Title level={4} className="characteristics-title">
          Характеристики
        </Title>

        <div className="characteristics-list">
          {
            Object.keys(params).map((p, i) =>
              <div key={i} className="characteristic-item">
                <Text className="characteristic-label">
                  {formatParam(p)}
                </Text>
                <Text className="characteristic-value">
                  {formatParamValue(params[p as keyof typeof params])}
                </Text>
              </div>
            )
          }
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;