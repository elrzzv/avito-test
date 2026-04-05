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
  isSaving: boolean;
}

function EditForm({ formData, onUpdate, onCancel, onSave, isSaving }: EditFormProps): JSX.Element {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      ...formData,
      params: formData.params,
    });
  }, [formData, form]);

  const handleValuesChange = (changedValues: Partial<Item>) => {
    Object.entries(changedValues).forEach(([field, value]) => {
      if (field === 'params') {
        Object.entries(value as object).forEach(([paramField, paramValue]) => {
          onUpdate('params', { ...formData.params, [paramField]: paramValue });
        });
      } else {
        onUpdate(field as keyof Item, value);
      }
    });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={formData}
      className="edit-page-form"
      onValuesChange={handleValuesChange}
      onFinish={onSave}
    >
      <div className="forms-wrapper">
        <div className="forms-column">
          <ProductInfoFields />
          <PriceFieldWithAI formData={formData} />
          <CharacteristicsSection category={formData.category} />
        </div>
      </div>

      <DescriptionSection />
      <FormActions
        form={form}
        onCancel={onCancel}
        isSaving={isSaving}
      />
    </Form>
  );
}

export default EditForm;