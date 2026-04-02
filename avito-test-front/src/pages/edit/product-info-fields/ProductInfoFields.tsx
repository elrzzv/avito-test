import { type JSX } from 'react';
import { Form, Input, Select } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';
import './ProductInfoFields.css'

function ProductInfoFields(): JSX.Element {
  return (
    <>
      <Form.Item label="Категория" name="category">
        <Select
          className="edit-page-select"
          placeholder="Выберите категорию"
          options={[
            { value: 'electronics', label: 'Электроника' },
            { value: 'clothing', label: 'Одежда' },
            { value: 'furniture', label: 'Мебель' },
          ]}
        />
      </Form.Item>

      <Form.Item
        label="Название"
        name="title"
        rules={[{ required: true, message: 'Введите название' }]}
        className="required-field"
      >
        <Input
          className="edit-page-input"
          placeholder="Введите название товара"
          suffix={<CloseCircleFilled className="clear-icon" />}
        />
      </Form.Item>
    </>
  );
}

export default ProductInfoFields;