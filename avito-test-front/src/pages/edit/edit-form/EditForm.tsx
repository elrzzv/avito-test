import { type JSX } from 'react';
import { Form } from 'antd';
import { type EditPageProps } from '../EditPage';
import ProductInfoFields from '../product-info-fields/ProductInfoFields';
import PriceFieldWithAI from '../price-field-ai/PriceFieldWithAI';
import CharacteristicsSection from '../characteristics/CharacteristicsSection';
import DescriptionSection from '../description/DescriptionSection';
import FormActions from '../form-actions/FormActions';
import './EditForm.css';

interface EditFormProps {
  initialValues?: EditPageProps['initialValues'];
}

function EditForm({ initialValues }: EditFormProps): JSX.Element {
  const [form] = Form.useForm();

  const handleSave = () => {
    form.validateFields().then(values => {
      console.log('Saved:', values);
      // здесь будет логика сохранения
    });
  };

  const handleCancel = () => {
    form.resetFields();
    // здесь будет логика отмены/навигации
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      className="edit-page-form"
    >
      <div className="forms-wrapper">
        <div className="forms-column">
          <ProductInfoFields />
          <PriceFieldWithAI />
          <CharacteristicsSection />
        </div>
      </div>

      <DescriptionSection />
      <FormActions onSave={handleSave} onCancel={handleCancel} />
    </Form>
  );
}

export default EditForm;