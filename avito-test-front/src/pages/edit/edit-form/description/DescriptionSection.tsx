import { type JSX } from 'react';
import { Form, Input, Button } from 'antd';
import { BulbOutlined } from '@ant-design/icons';

import './DescriptionSection.css';

const { TextArea } = Input;


function DescriptionSection(): JSX.Element {
  const handleImproveDescription = () => {
    console.log('Улучшение описания...');
    // здесь будет AI запрос
  };

  return (
    <div className="description-section">
      <h3 className="section-title">Описание</h3>

      <Form.Item name="description">
        <TextArea
          className="edit-page-textarea"
          rows={6}
          placeholder="Опишите ваш товар максимально подробно..."
          showCount
          maxLength={1000}
        />
      </Form.Item>

      <Button
        type="text"
        icon={<BulbOutlined />}
        className="generate-description-btn"
        onClick={handleImproveDescription}
      >
        Улучшить описание
      </Button>
    </div>
  );
}

export default DescriptionSection;