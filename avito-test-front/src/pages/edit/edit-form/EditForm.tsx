import { useEffect, type JSX } from 'react';
import { Form } from 'antd';
import ProductInfoFields from './product-info-fields/ProductInfoFields';
import PriceFieldWithAI from './price-field-ai/PriceFieldWithAI';
import CharacteristicsSection from './characteristics/CharacteristicsSection';
import DescriptionSection from './description/DescriptionSection';
import FormActions from './form-actions/FormActions';
import './EditForm.css';
import type { Item } from '../../../types/types';

interface EditFormProps {
  formData: Item;
  onUpdate: <K extends keyof Item>(field: K, value: Item[K]) => void;
  onCancel: () => void;
  onSave: () => void;
}

function EditForm({ formData, onUpdate, onCancel, onSave }: EditFormProps): JSX.Element {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(formData);
  }, [formData, form]);

  const handleValuesChange = (changedValues: Partial<Item>) => {
    Object.entries(changedValues).forEach(([field, value]) => {
      onUpdate(field as keyof Item, value as Item[keyof Item]);
    });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={formData}
      className="edit-page-form"
      onValuesChange={handleValuesChange}
    >
      <div className="forms-wrapper">
        <div className="forms-column">
          <ProductInfoFields />
          <PriceFieldWithAI />
          <CharacteristicsSection category={formData.category} />
        </div>
      </div>

      <DescriptionSection />
      <FormActions onSave={onSave} onCancel={onCancel} />
    </Form>
  );
}

export default EditForm;