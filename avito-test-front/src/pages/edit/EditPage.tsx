import { useCallback, useEffect, useState, type JSX } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';

import EditForm from './edit-form/EditForm';
import type { Item } from '../../types/types';
import { DEFAULT_PARAMS_VALUES } from '../../types/constants';
import axios from 'axios';
import LoadingPage from '../../components/loading-page/LoadingPage';
import ErrorPage from '../../components/error/ErrorPage';
import './EditPage.css';



function EditPage(): JSX.Element {
  const navigate = useNavigate();

  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Item | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get(`/api/items/${id}`);
        const data = response.data;
        setFormData(data);
        sessionStorage.setItem(`form-data-${id}`, JSON.stringify(data));
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const savedData = sessionStorage.getItem(`form-data-${id}`);
    if (savedData) {
      setFormData(JSON.parse(savedData));
      setIsLoading(false)
    } else {
      loadData();
    }

  }, [id]);

  const getDefaultParamsForCategory = (category: Item['category']) => {
    return DEFAULT_PARAMS_VALUES[category];
  }

  const updateField = useCallback(<K extends keyof Item>(field: K, value: Item[K]) => {
    setFormData(prev => {
      if (!prev) return null;

      let updated: Item;

      if (field === 'category') {
        const newCategory = value as Item['category'];
        const defaultParams = getDefaultParamsForCategory(newCategory);
        updated = {
          ...prev,
          category: newCategory,
          params: defaultParams as Item['params']
        } as Item
      } else {
        updated = { ...prev, [field]: value } as Item;
      }

      sessionStorage.setItem(`form-data-${id}`, JSON.stringify(updated));
      return updated;
    });
  }, [id]);

  const cancelChanges = useCallback(() => {
    setFormData(null);
    sessionStorage.removeItem(`form-data-${id}`);
    navigate(`/ads/${id}`)
  }, [id, navigate]);

  const saveData = useCallback(() => {
    const putData = async () => {
      try {
        setIsLoading(true)
        await axios.put(`/api/items/${id}`, formData);
        setFormData(formData);
        sessionStorage.setItem(`form-data-${id}`, JSON.stringify(formData));
      } catch (error) {
        console.error('Ошибка отправки данных:', error);
      } finally {
        setIsLoading(false)
      }
    }

    putData();
    setFormData(null);
    sessionStorage.removeItem(`form-data-${id}`);
    navigate(`/ads/${id}`)
  }, [id, navigate, formData]);

  if (isLoading) {
    return <LoadingPage />
  }

  if (!formData) {
    return <ErrorPage />
  }

  return (
    <ConfigProvider locale={ruRU}>
      <div className="edit-page-container">
        <div className="edit-page-card">
          <h1 className="edit-page-title">Редактирование объявления</h1>
          <EditForm
            formData={formData} onUpdate={updateField}
            onCancel={cancelChanges} onSave={saveData}
            isSaving={isLoading}
          />
        </div>
      </div>
    </ConfigProvider >
  );
}

export default EditPage;