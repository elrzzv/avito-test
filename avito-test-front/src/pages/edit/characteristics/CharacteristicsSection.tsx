import { type JSX } from 'react';
import { Form, Input, Select } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';

import './CharacteristicsSection.css';

function CharacteristicsSection(): JSX.Element {
  return (
    <div className="characteristics-section">
      <h3 className="section-title">Характеристики</h3>

      <Form.Item
        label="Тип"
        name="type"
        rules={[{ required: true, message: 'Выберите тип' }]}
        className="required-field"
      >
        <Select
          className="edit-page-select"
          placeholder="Выберите тип"
          options={[
            { value: 'laptop', label: 'Ноутбук' },
            { value: 'desktop', label: 'Компьютер' },
            { value: 'tablet', label: 'Планшет' },
          ]}
        />
      </Form.Item>

      <Form.Item label="Бренд" name="brand">
        <Input
          className="edit-page-input"
          placeholder="Введите бренд"
          suffix={<CloseCircleFilled className="clear-icon" />}
        />
      </Form.Item>

      <Form.Item label="Модель" name="model">
        <Input
          className="edit-page-input"
          placeholder="Введите модель"
          suffix={<CloseCircleFilled className="clear-icon" />}
        />
      </Form.Item>

      <Form.Item label="Цвет" name="color">
        <Input
          className="edit-page-input"
          placeholder="Введите цвет"
          suffix={<CloseCircleFilled className="clear-icon" />}
        />
      </Form.Item>

      <Form.Item label="Состояние" name="condition">
        <Input
          className="edit-page-input"
          placeholder="Введите состояние"
        />
      </Form.Item>
    </div>
  );
}

export default CharacteristicsSection;