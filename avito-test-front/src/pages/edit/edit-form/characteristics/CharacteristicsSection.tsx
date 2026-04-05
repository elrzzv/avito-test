import { type JSX } from 'react';
import { Form, Input, Select } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';

import { type Item } from '../../../../types/types';
import { ALL_PARAMS_FIELDS, TRANSLATIONS } from '../../../../types/constants';
import './CharacteristicsSection.css';

interface CharacteristicsSectionProps {
  category: Item['category'];
}

const SELECT_FORMS = {
  auto: {
    transmission: ['automatic', 'manual']
  },
  real_estate: {
    type: ['flat', 'house', 'room']
  },
  electronics: {
    type: ['phone', 'laptop', 'misc'],
    condition: ['new', 'used']
  }
} as const;

function CharacteristicsSection({ category }: CharacteristicsSectionProps): JSX.Element {

  const currentCategory = category as keyof typeof SELECT_FORMS;
  const allParams = ALL_PARAMS_FIELDS[currentCategory];
  const categorySelects = SELECT_FORMS[currentCategory];

  const renderField = (paramName: string, index: number) => {
    const label = TRANSLATIONS[paramName as keyof typeof TRANSLATIONS];
    const isSelectField = categorySelects && paramName in categorySelects;

    if (isSelectField) {
      const selectOptions = categorySelects[paramName as keyof typeof categorySelects];
      const options = (selectOptions as readonly string[]).map((value) => ({
        value,
        label: TRANSLATIONS[value as keyof typeof TRANSLATIONS]
      }));

      return (
        <Form.Item key={index} label={label} name={['params', paramName]}>
          <Select
            className="edit-page-select"
            placeholder={`Выберите ${label.toLowerCase()}`}
            options={options}
          />
        </Form.Item>
      );
    }

    return (
      <Form.Item key={index} label={label} name={['params', paramName]}>
        <Input
          className="edit-page-input"
          placeholder={`Введите ${label.toLowerCase()}`}
          suffix={<CloseCircleFilled className="clear-icon" />}
        />
      </Form.Item>
    );
  };

  return (
    <div className="characteristics-section">
      <h3 className="section-title">Характеристики</h3>
      {allParams.map((paramName, index) => renderField(paramName, index))}
    </div>
  );
}

export default CharacteristicsSection;