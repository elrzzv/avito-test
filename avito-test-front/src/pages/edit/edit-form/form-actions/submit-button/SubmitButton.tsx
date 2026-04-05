import React, { useEffect, useState } from 'react';
import type { FormInstance } from 'antd';
import { Button, Form } from 'antd';

import './SubmitButton.css'

interface SubmitButtonProps {
  form: FormInstance;
  loading?: boolean;
  children: React.ReactNode;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ form, loading = false, children }) => {

  const [submittable, setSubmittable] = useState(false);

  //отслеживаем все изменения формы
  const values = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  return (
    <Button
      type="primary"
      htmlType="submit"
      loading={loading}
      disabled={!submittable}
    >
      {children}
    </Button>
  );
};

export default SubmitButton;