# Frontend "Muzloft"

Фронтенд веб-приложения для бронирования репетиционных комнат в музыкальных базах. Музыкант выбирает базу и комнату, указывает время и инструменты, оформляет бронь и смотрит расписание своих репетиций.

Стек: TypeScript, React 19, Redux Toolkit, React Router 7, SCSS и CSS Modules, Webpack 5, Storybook 10

Структура:
- public/ — публичные файлы, шаблон `index.html`
- src/ — исходные файлы, организованы по Feature-Sliced Design
- src/app/ — инициализация приложения: провайдеры, роутер, компонент `App`
- src/pages/ — страницы приложения, каждая собирает виджеты и фичи
- src/widgets/ — крупные самостоятельные блоки интерфейса (`BaseDetails`, `BookingFlow`, `RoomDetails`, `CommentList` и др.)
- src/features/ — пользовательские сценарии (`auth`, `booking`, `instrument-selection`, `profile-edit` и др.)
- src/entities/ — сущности предметной области: `base`, `room`, `instrument`, `repetition`, `event`, `comment`
- src/services/ — Redux store и слайсы (`user`, `bases`, `events`) с асинхронными действиями
- src/shared/ — переиспользуемые UI-компоненты (`Button`, `Input`, `Modal`, `Menu`, `Preloader`, `ExpandableText`)
- src/utils/ — API-клиент, типы, работа с cookie и токенами
- src/assets/ — шрифты и изображения
- src/stories/ — Storybook-истории и фикстуры
- webpack/ — конфигурации Webpack: `common`, `dev`, `prod`
- .storybook/ — конфигурация Storybook
- storybook-static/ — собранный статический Storybook
- dist/ — результат production-сборки


## Установка и запуск
Требования: Node.js 20.19+ или 22.12+ (требование Storybook 10) и npm. В проекте нет `yarn.lock`, поэтому используйте npm.

```
npm install
npm run start
```

Приложение откроется на `http://localhost:8080` (порт задаётся в `webpack/webpack.dev.js`).

Адрес API читается из переменной `API_URL` (файл `src/utils/api.ts`).

## Сборка

```
npm run build
```

Результат попадает в папку `dist/`.

## Storybook

```
npm run storybook
```

Storybook откроется на `http://localhost:6006`. Статическая сборка создаётся командой `npm run build-storybook` и попадает в `storybook-static/`.

## Скрипты качества кода

| Команда | Описание |
| --- | --- |
| `npm run lint` | ESLint с автоисправлением |
| `npm run stylelint` / `npm run stylelint:fix` | Проверка и исправление SCSS/CSS |
| `npm run format` | Форматирование Prettier |
| `npm run check` | Stylelint, ESLint и Prettier по очереди |
| `npm run commit` | Коммит по Conventional Commits через Commitizen |

## Данные и типы данных

Типы описаны в `src/utils/types.ts`.

Пользователь

```ts
type TUser = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  repetitions: TRepetition[]; // забронированные репетиции
};
```

Репетиция

```ts
type TRepetition = {
  _id: string;
  base: string; // название базы
  address: string; // адрес базы
  room: string; // название комнаты
  slot: TSlot; // забронированный слот
  instruments: TBookedInstrument[]; // инструменты из общего доступа базы
  payment: "online" | "card" | "cash"; // способ оплаты
};
```

Слот

```ts
type TSlot = {
  _id: string;
  date: Date; // дата и время начала
  period: string; // продолжительность
  price: number; // стоимость
};
```

Инструмент

```ts
type TInstrument = {
  _id: string;
  title: string; // название инструмента
  category: string; // категория инструмента
  image: string; // картинка инструмента
  slots?: TSlot[]; // занятые слоты (для инструментов общего доступа)
  price?: number; // цена за один слот (для инструментов общего доступа)
};

type TBookedInstrument = TInstrument & {
  slot: TSlot; // слот бронирования инструмента
};
```

База

```ts
type TBase = {
  _id: string;
  title: string;
  description: string;
  image: string;
  address: string;
  rating: number; // средний рейтинг
  workingHours?: TWorkingHours; // по умолчанию 10:00–22:00
  phone: string;
  ownerid: string;
  rooms: TRoom[];
  instruments: TInstrument[]; // инструменты в общем доступе
  comments: TComment[];
};

type TWorkingHours = { from: number; to: number } | "24h";
```

Комната

```ts
type TRoom = {
  _id: string;
  title: string;
  description: string;
  image: string[];
  slots: TSlot[]; // забронированные слоты
  instruments: TInstrument[];
  basePrice: number; // цена часа по умолчанию
  tariffs?: TTariff[]; // применяется первый подходящий тариф
};

type TTariff = {
  price: number; // цена одного часа
  weekdays?: number[]; // дни недели (0 — воскресенье), по умолчанию все
  fromHour?: number; // с какого часа (включительно)
  toHour?: number; // до какого часа (не включительно)
};
```

Отзыв

```ts
type TComment = {
  _id: string;
  artistid: string; // ID музыканта
  author?: { login: string; avatar?: string };
  room: string; // название комнаты
  scores: number; // оценка
  date: string; // YYYY-MM-DD
  comment: string;
};
```

Мероприятие (акция)

```ts
type TEvent = {
  _id?: string;
  title: string;
  subtitle?: string;
  text: string;
  description: string;
  image: string[];
  basesid?: string[]; // ID баз, участвующих в акции
};
```

Заказ и черновик бронирования

```ts
type TOrder = {
  _id: string;
  userId: string;
  baseid: string;
  roomid: string;
  slot: TSlot;
  instrumentsId: string[]; // инструменты из общего доступа
  payment: "online" | "card" | "cash";
};

// Черновик хранится в слайсе bases, пока пользователь проходит бронирование
type TOrderDraft = {
  baseid: string;
  roomid: string | null;
  slot: { date: string; period: TSlot["period"] } | null;
  instrumentsId: string[];
  payment: TOrder["payment"] | null;
};
```

## API

Все запросы описаны в `src/utils/api.ts`. Базовый адрес берется из `API_URL`.

| Метод | Эндпоинт | Функция | Назначение |
| --- | --- | --- | --- |
| POST | `/auth/register` | `registerUserApi` | регистрация |
| POST | `/auth/login` | `loginUserApi` | вход |
| POST | `/auth/logout` | `logoutApi` | выход |
| POST | `/auth/token` | `refreshToken` | обновление токенов |
| GET | `/auth/user` | `getUserApi` | данные текущего пользователя |
| PATCH | `/auth/user` | `updateUserApi` | редактирование профиля |
| POST | `/password-reset` | `forgotPasswordApi` | запрос кода восстановления |
| POST | `/password-reset/verify` | `verifyResetCodeApi` | проверка кода |
| POST | `/password-reset/reset` | `resetPasswordApi` | установка нового пароля |
| GET | `/bases` | `getBasesApi` | список баз |
| GET | `/bases/:id` | `getBaseByIdApi` | детали базы |
| GET | `/events` | `getEventsApi` | список акций |
| GET | `/events/:id` | `getEventByIdApi` | детали акции |

Запрос бронирования `createOrderApi` пока заглушка: запроса на сервер не выполняется.

Токены хранятся так: accessToken — в cookie, refreshToken — в `localStorage` (если выбрано «Запомнить меня») или в `sessionStorage` (`src/utils/tokenStorage.ts`). Функция `fetchWithRefresh` при ошибке `jwt expired` обновляет токен и повторяет запрос.

## Архитектура приложения

Проект построен по методологии [Feature-Sliced Design](https://feature-sliced.design/). Зависимости идут только сверху вниз: `app` → `pages` → `widgets` → `features` → `entities` → `shared`. Слой `services` содержит Redux-стор и бизнес-логику, слой `utils` — типы, API-клиент и хелперы.

| Слой | Назначение | Примеры |
| --- | --- | --- |
| `app` | инициализация, провайдеры, роутинг | `App.tsx`, `ProtectedRoute.tsx`, `AppProviders.tsx` |
| `pages` | страницы маршрутов | `BasesPage`, `EventsPage`, `ProfilePage`, `BookingPage` |
| `widgets` | крупные самостоятельные блоки | `BaseList`, `BaseDetails`, `BookingFlow`, `CommentList` |
| `features` | пользовательские сценарии | `AuthForm`, `ProfileEdit`, `RepetitionSelector`, `Logout` |
| `entities` | бизнес-сущности и их карточки | `baseCard`, `eventCard`, `roomDetails`, `repetition`, `comment` |
| `shared` | переиспользуемые UI-элементы | `Button`, `Input`, `Modal`, `Menu`, `Preloader` |
| `services` | Redux-слайсы и thunk-действия | `user`, `bases`, `events` |
| `utils` | типы, API, хранилище токенов | `types.ts`, `api.ts`, `tokenStorage.ts` |

Компоненты в `shared`, `entities`, `features` и `widgets` разделены на контейнер (логика, подключение к стору) и `ui`-часть (только отображение).

### Стор

Стор собирается через `combineSlices` в `src/services/store.ts` из трех слайсов:

- `user` — текущий пользователь, статус авторизации, репетиции (`checkUserAuth`, `loginUser`, `registerUser`, `logout`, `bookRepetition`, `addRepetition`);
- `bases` — список баз, детали базы, выбранная комната, отзывы и черновик бронирования `orderDraft`;
- `events` — список и детали акций.

Запросы выполняются асинхронными thunk-действиями из `actions.ts` каждого слайса. Слайс `user` хранит ошибку проверки авторизации.

### Авторизация и защищенные маршруты

- При монтировании `App` вызывается `checkUserAuth`, который запрашивает `/auth/user` по сохраненным токенам.
- `ProtectedRoute` до завершения проверки показывает `Preloader`. Неавторизованного пользователя перенаправляет на `/login` с сохранением адреса в `state.from`. Авторизованного, который открыл страницу входа или регистрации, перенаправляет на `from` или `/bases`.
- При ошибке проверки показывается сообщение с кнопкой повтора.

### Маршрутизация и модальные окна

Маршруты описаны в `src/app/App.tsx`:

- Без шапки и навигации: `/login`, `/register`, `/newpassword`, `/profile/logout`.
- Основные страницы: `/bases`, `/events`, `/profile` (защищенный), `/repetitions` (защищенный).
- Детали открываются модальными окнами поверх текущей страницы. Для этого при переходе передается `location.state.background`:
  - `/bases/:baseId`, `/bases/:baseId/:roomId`, `/bases/:baseId/instruments`, `/bases/:baseId/:roomId/instruments`, `/bases/:baseId/comments`;
  - `/bases/:baseId/book` и `/bases/:baseId/:roomId/book` (защищенные);
  - `/events/:eventId`, `/repetitions/:repetitionId`.

### Процесс бронирования

`BookingFlow` строит список шагов через `getBookingSteps` (`model/steps.ts`):

1. Выбор комнаты (только если комната не передана в URL).
2. Выбор слота (`SlotPicker`).
3. Выбор инструментов (только если у базы есть инструменты в общем доступе).
4. Оплата (`online`, `card`, `cash`).
5. Подтверждение.
6. Успешное бронирование.

Промежуточные данные хранятся в `orderDraft` слайса `bases` (`startOrderDraft`, `setOrderDraftRoom`, `setOrderDraftSlot`, `toggleOrderInstrument`, `setOrderDraftPayment`, `clearOrderDraft`). При отправке вызывается `bookRepetition`, который использует `createOrderApi`, а затем `addRepetition` добавляет репетицию в `user.repetitions`.

### Взаимодействие компонентов

1. `BaseList` при монтировании диспатчит `fetchBases` и `fetchBaseDetails`. Карточка базы (`baseCard`) передает клик в маршрут `/bases/:baseId`.
2. `BookingPage` диспатчит `fetchBaseDetails` и открывает `BookingFlow` с нужными `initialRoomId`.
3. `RoomDetailsWidget` вызывает `selectRoom`, после чего обновляется выбранная комната в `bases`.
4. `EventsPage` диспатчит `fetchEvents`, а при открытии акции — `fetchEventDetails`.
5. `RepetitionSelector` и `InstrumentSelection` читают репетиции через `selectRepetitions`.
6. `Logout` диспатчит `logout`, который очищает токены и состояние пользователя.

## Известные ограничения

- **Заказы.** `createOrderApi` — заглушка: она ждет 600 мс и возвращает случайный номер, запрос на сервер не выполняется.
- **Бэкенд.** Серверная часть в разработке, поэтому данные баз, акций и пользователей пока не загружаются без нее.
- **Тесты.** Модульных и интеграционных тестов нет. Качество проверяется линтерами и Storybook.

## Моя зона ответственности

Я один разрабатывал весь фронтенд: архитектуру FSD, Redux-стор и слайсы, роутинг с модальными окнами, авторизацию с обновлением токенов, сценарий бронирования, UI-компоненты и страницы, Storybook, настройку Webpack и инструментов качества кода.