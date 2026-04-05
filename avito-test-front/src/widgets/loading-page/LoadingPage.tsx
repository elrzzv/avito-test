import type { JSX } from "react";

export default function LoadingPage(): JSX.Element {
  return (
    <div className="loading-container">
      <img src="/loading.webp" alt="Загрузка" className="loading-image" />
      <div className="loading-text">Ожидайте, страница загружается...</div>
    </div>
  );
}