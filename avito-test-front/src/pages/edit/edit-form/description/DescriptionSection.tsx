import { type JSX } from 'react';
import { Form, Input } from 'antd';
import { useWatch } from 'antd/es/form/Form';

import AIDescriptionButton from './ai-button/AIDescriptionButton';
import type { Item } from '../../../../entities/item/model';
import './DescriptionSection.css';

const { TextArea } = Input;

interface DescriptionSectionProps {
  formData: Item;
  onDescriptionChange?: (description: string) => void;
}

function DescriptionSection({ formData, onDescriptionChange }: DescriptionSectionProps): JSX.Element {
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
        onDescriptionChange={onDescriptionChange}
      />
    </div>
  );
}

export default DescriptionSection;