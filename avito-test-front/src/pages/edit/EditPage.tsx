import { type JSX } from 'react';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import EditForm from './edit-form/EditForm';
import './EditPage.css';

export interface EditPageProps {
  initialValues?: {
    category: string;
    title: string;
    price: string;
    type: string;
    brand: string;
    model: string;
    color: string;
    condition: string;
    description: string;
  };
}

function EditPage({ initialValues }: EditPageProps): JSX.Element {
  return (
    <ConfigProvider locale={ruRU}>
      <div className="edit-page-container">
        <div className="edit-page-card">
          <h1 className="edit-page-title">Редактирование объявления</h1>
          <EditForm initialValues={initialValues} />
        </div>
      </div>
    </ConfigProvider>
  );
}

export default EditPage;