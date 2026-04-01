import { type JSX } from 'react';
import { Image, Typography } from 'antd';
import './ImageDescription.css';

const { Title, Paragraph } = Typography;

interface ImageDescriptionProps {
  imageUrl: string;
  description: string;
}

function ImageDescription({imageUrl, description}: ImageDescriptionProps): JSX.Element{
  return (
    <div className="image-description">
      <div className="image-container">
        <Image
          src={imageUrl}
          alt="Product"
          className="product-image"
          preview={false}
        />
      </div>
      <div className="description-container">
        <Title level={4} className="description-title">
          Описание
        </Title>
        <Paragraph className="description-content">
          {description}
        </Paragraph>
      </div>
    </div>
  );
};

export default ImageDescription;