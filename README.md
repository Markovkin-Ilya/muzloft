# Muzloft — платформа бронирования репетиционных комнат

Muzloft — веб-приложение для музыкантов, которое позволяет забронировать комнату в музыкальной базе для репетиций группы. Пользователь может посмотреть расписание и историю своих репетиций, а также подробную информацию о комнатах и наличии в них инструментов.

> **Статус проекта:** на данном этапе разработан только фронтенд. Бэкенд находится в планах.

## Возможности

- Регистрация, вход и восстановление пароля
- Просмотр акций и мероприятий, страница деталей акции
- Список музыкальных баз и страница деталей базы
- Страница комнаты с описанием и списком инструментов
- Пошаговое бронирование репетиции с выбором комнаты, времени и инструментов
- Список и история репетиций в личном кабинете
- Редактирование профиля, выход из аккаунта
- Комментарии и отзывы к базам и мероприятиям

В разработке: централизованная база музыкальных баз по городам.

## Стек

- **Язык и UI:** TypeScript, React 19, SCSS / CSS Modules, clsx
- **Состояние:** Redux Toolkit, React Redux
- **Маршрутизация:** React Router 7
- **Сборка:** Webpack 5 (dev-сервер, отдельные конфиги для dev и prod), SWC / ts-loader, PostCSS
- **Документация компонентов и UI-тесты:** Storybook 10 (с аддонами a11y и docs)
- **Качество кода:** ESLint, Prettier, Stylelint, Husky и lint-staged, Commitizen (Conventional Commits)

## Инструкции по развертыванию

### Требования

- Node.js 20.19+ или 22.12+ (требование Storybook 10)
- npm

### Установка и запуск

```bash
git clone git@github.com:Markovkin-Ilya/muzloft.git
cd muzloft/frontend
npm install
```

Запуск dev-сервера:

```bash
npm start
```

Приложение откроется на `http://localhost:8080`. Порт задается в `webpack/webpack.dev.js`.

Запуск Storybook:

```bash
npm run storybook
```

Storybook откроется на `http://localhost:6006`.

### Production-сборка

```bash
npm run build
```

Результат сборки попадает в папку `frontend/dist`.

### Полезные скрипты

| Команда | Описание |
| --- | --- |
| `npm start` | Запуск dev-сервера Webpack |
| `npm run build` | Production-сборка |
| `npm run storybook` | Запуск Storybook |
| `npm run lint` | Проверка и автоисправление ESLint |
| `npm run stylelint` | Проверка стилей (SCSS / CSS) |
| `npm run format` | Форматирование кода Prettier |
| `npm run check` | Stylelint + ESLint + Prettier |

## Структура проекта

```text
muzloft/
└── frontend/
    ├── public/              # Статические файлы (index.html)
    ├── src/                 # Исходный код (Feature-Sliced Design)
    │   ├── app/             # Инициализация приложения: провайдеры, роутер, store
    │   ├── pages/           # Страницы приложения
    │   ├── widgets/         # Крупные самостоятельные блоки UI (шапка, навигация, список баз, детали комнаты и т.д.)
    │   ├── features/        # Пользовательские сценарии (auth, booking, instrument-selection, profile-edit и т.д.)
    │   ├── entities/        # Бизнес-сущности (room, instrument, repetition, event, comment и т.д.)
    │   ├── services/        # API-слайсы и глобальный store (bases, events, user)
    │   ├── shared/          # Переиспользуемые UI-компоненты и общие модули
    │   ├── assets/          # Шрифты и изображения
    │   ├── utils/           # Константы, типы, вспомогательные функции
    │   └── stories/         # Storybook-истории и фикстуры
    ├── webpack/             # Конфигурации Webpack (common, dev, prod)
    ├── .storybook/          # Конфигурация Storybook
    ├── storybook-static/    # Собранный статический Storybook
    ├── eslint.config.cjs    # Конфигурация ESLint
    ├── postcss.config.js    # Конфигурация PostCSS
    └── tsconfig.json        # Конфигурация TypeScript
```

Проект организован по методологии **Feature-Sliced Design**: код разделен по слоям (`app → pages → widgets → features → entities → shared`), и каждый слой может импортировать только из нижележащих слоев.

## Моя зона ответственности

Проект разработан мной единолично, поэтому я отвечал(а) за весь фронтенд:

- Архитектуру приложения и организацию кода по Feature-Sliced Design
- Реализацию всех страниц и пользовательских сценариев: регистрация, вход, восстановление пароля, бронирование репетиций, личный кабинет, каталог баз и комнат
- Управление состоянием через Redux Toolkit и работу с маршрутизацией через React Router
- Вёрстку и адаптивный дизайн на SCSS и CSS Modules
- Компоненты и истории в Storybook, включая проверку доступности (a11y)
- Настройку сборки Webpack и инструментов качества кода (ESLint, Prettier, Stylelint, Husky, Commitizen)

## Автор

[github.com/Markovkin-Ilya](https://github.com/Markovkin-Ilya)
