import { type JSX } from 'react';
import { Form, Input } from 'antd';
import { useWatch } from 'antd/es/form/Form';

import AIDescriptionButton from './ai-button/AIDescriptionButton';
import type { Item } from '../../../../types/types';
import './DescriptionSection.css';

const { TextArea } = Input;

interface DescriptionSectionProps {
  formData: Item;
}

function DescriptionSection({ formData }: DescriptionSectionProps): JSX.Element {
  const form = Form.useFormInstance();
  const currentDescription = useWatch('description', form) || '';

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

      <AIDescriptionButton
        formData={formData}
        currentDescription={currentDescription}
      />
    </div>
  );
}

export default DescriptionSection;