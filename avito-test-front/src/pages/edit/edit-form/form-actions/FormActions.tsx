import { type JSX } from 'react';
import { Button, Space } from 'antd';

import './FormActions.css';
import SubmitButton from './submit-button/SubmitButton';
import type { FormInstance } from 'antd/lib/form';

interface FormActionsProps {
  form: FormInstance
  onCancel: () => void;
  isSaving?: boolean;
}

function FormActions({ form, onCancel, isSaving = false }: FormActionsProps): JSX.Element {

  return (
    <div className="form-actions">
      <Space size="middle">
        <SubmitButton
          form={form} loading={isSaving}
        >
          Сохранить
        </SubmitButton>

        <Button
          size="large"
          className="cancel-btn"
          onClick={onCancel}
        >
          Отменить
        </Button>
      </Space>
    </div>
  );
}

export default FormActions;