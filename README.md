# Avito Test Project

Учебный проект для стажировки в Avito.

## Технологии

- **Frontend**: React 19, Ant Design, React Router, Vite
- **Backend**: Fastify, Express (GigaChat proxy)

## Запуск

### Backend

```bash
cd server
npm install
```

Создайте файл `.env` в папке `server`:

```
PORT=8080
GIGACHAT_CLIENT_ID=your_client_id
GIGACHAT_CLIENT_SECRET=your_client_secret
GIGACHAT_SCOPE=GIGACHAT_API_PERS
```

Для получения credentials зарегистрируйтесь на [SberDevices](https://developers.sber.ru/studio/registration):

1. Создайте приложение в личном кабинете разработчика
2. Скопируйте Client ID и Client Secret

Запуск сервера:

```bash
cd server
npm i
npm start
```

Сервер запустится на http://localhost:8080

### Frontend

```bash
cd avito-test-front
npm install
npm run dev
```

## Архитектура сервера по работе с API GigaChat

- `/items` — API объявлений (Fastify)
- `/market-price`, `/improve-description` — AI-функции через GigaChat (Express proxy)

## Реализованные улучшения

1. В API `/items` добавлено поле `id` для навигации к карточке товара
2. Добавлена сортировка по цене (`sortColumn=price`)
3. Интеграция с GigaChat: определение рыночной цены и улучшение описания товара