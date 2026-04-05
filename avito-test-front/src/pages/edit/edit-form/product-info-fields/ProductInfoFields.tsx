import { type JSX } from 'react';
import { Form, Input, Select } from 'antd';

import './ProductInfoFields.css'


function ProductInfoFields(): JSX.Element {

  return (
    <>
      <Form.Item
        label="Категория"
        name="category"
        rules={[{ required: true, message: 'Выберите категорию' }]}
        className="required-field"
      >
        <Select
          className="edit-page-select"
          placeholder="Выберите категорию товара"
          options={[
            { value: 'auto', label: 'Авто' },
            { value: 'real_estate', label: 'Недвижимость' },
            { value: 'electronics', label: 'Электроника' },
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
          allowClear
        />
      </Form.Item>
    </>
  );
}

export default ProductInfoFields;