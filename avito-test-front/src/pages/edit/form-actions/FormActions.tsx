import { type JSX } from 'react';
import { Button, Space } from 'antd';

import './FormActions.css';

interface FormActionsProps {
  onSave: () => void;
  onCancel: () => void;
  isSaving?: boolean;
}

function FormActions({ onSave, onCancel, isSaving = false }: FormActionsProps): JSX.Element {
  return (
    <div className="form-actions">
      <Space size="middle">
        <Button
          type="primary"
          size="large"
          className="save-btn"
          loading={isSaving}
          onClick={onSave}
        >
          Сохранить
        </Button>
        <Button size="large" className="cancel-btn" onClick={onCancel}>
          Отменить
        </Button>
      </Space>
    </div>
  );
}

export default FormActions;