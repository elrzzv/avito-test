import { useCallback, useState, type JSX } from 'react';
import { Form, Button, message } from 'antd';
import { BulbOutlined, LoadingOutlined, RedoOutlined } from '@ant-design/icons';
import type { Item } from '../../../../../entities/item/model';
import { improveDescription } from '../../../../../shared/api/gigachat';
import { AIDescriptionTooltip } from './ai-description-tooltip/AIDescriptionTooltip';
import './AIDescriptionButton.css';

interface AIDescriptionButtonProps {
  formData: Item;
  currentDescription: string;
  onDescriptionChange?: (description: string) => void;
}

export default function AIDescriptionButton({ 
  formData, 
  currentDescription,
  onDescriptionChange 
}: AIDescriptionButtonProps): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [aiDescription, setAiDescription] = useState<string | null>(null);
  const [aiFullResponse, setAiFullResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const form = Form.useFormInstance();

  const hasExistingDescription = currentDescription && currentDescription.trim().length > 0;

  const handleImproveDescription = useCallback(async () => {
    setLoading(true);
    setTooltipVisible(true);
    setError(null);
    setAiDescription(null);
    setAiFullResponse(null);

    try {
      const description = await improveDescription(formData, currentDescription);
      setAiDescription(description);
      setAiFullResponse(description);
      message.success('Новое описание сгенерировано');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Не удалось улучшить описание';
      setError(msg);
      message.error(msg);
    } finally {
      setLoading(false);
    }
  }, [formData, currentDescription]);

  const handleApplyDescription = useCallback(() => {
    if (aiDescription && form) {
      form.setFieldValue('description', aiDescription);
      
      form.setFields([{ name: 'description', value: aiDescription, touched: true }]);
      
      if (onDescriptionChange) {
        onDescriptionChange(aiDescription);
      }
      
      message.success('Описание применено');
      setTooltipVisible(false);
    }
  }, [aiDescription, form, onDescriptionChange]);

  const getButtonText = () => {
    if (loading) return 'Выполняется запрос';
    if (aiDescription) return 'Повторить запрос';
    return hasExistingDescription ? 'Улучшить описание' : 'Придумать описание';
  };

  const getButtonIcon = () => {
    if (loading) return <LoadingOutlined />;
    if (aiDescription) return <RedoOutlined />;
    return <BulbOutlined />;
  };

  return (
    <div className="ai-description-button-container">
      <Button
        type="text"
        className="ai-description-btn"
        icon={getButtonIcon()}
        onClick={handleImproveDescription}
        disabled={loading}
      >
        {getButtonText()}
      </Button>

      <AIDescriptionTooltip
        loading={loading}
        description={aiDescription}
        error={error}
        visible={tooltipVisible}
        aiResponse={aiFullResponse || undefined}
        onClose={() => setTooltipVisible(false)}
        onApply={handleApplyDescription}
        onRetry={handleImproveDescription}
      />
    </div>
  );
}