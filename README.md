<div align="center">

# 🎤 Академия свиста

**Лендинг офлайн-мастер-класса по свисту двумя пальцами**

*Пальцы во рту — шум на всю страну!* 🌏

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Chakra UI](https://img.shields.io/badge/Chakra_UI-2-319795?style=for-the-badge&logo=chakra-ui&logoColor=white)](https://chakra-ui.com/)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](#-лицензия)

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-открыть_сайт-e53e3e?style=for-the-badge)](https://Gaz1x.github.io/whistiling-landing-page)

<img src="src/components/images/circleLogo.png" alt="Логотип Академии свиста" width="180">

</div>

---

## 📖 О проекте

**«Академия свиста»** — одностраничный сайт офлайн-мастер-класса по свисту двумя пальцами во Владивостоке (ДВФУ). Сайт рассказывает о мастер-классе, собирает записи участников через модальную форму и, что самое интересное, содержит **интерактивные мини-игры**, связанные со свистом.

<details>
<summary><b>Место проведения:</b> кампус ДВФУ, Владивосток 📍</summary>

Адрес, телефон и e-mail указаны в подвале сайта (блоке <code>Footer</code>).
</details>

---

## ✨ Возможности

| Блок | Описание |
|------|----------|
| 🦸 **Герой** (`WriteBlock`) | Главный экран с оффером, статистикой и кнопкой «Записаться». Ведёт в модальное окно регистрации → оплаты с промокодом |
| 📋 **О мастер-классе** (`AboutBlock`) | 5 карточек с ключевыми фактами: офлайн-формат, 2 часа, сертификат, наставник, возврат денег |
| 🎮 **Испытай себя** (`InteractiveComponents`) | Два интерактива — **кликер** «хлопай по щеке 100 раз» и **замер уровня звука** свиста с микрофона |
| 💬 **Отзывы** (`CommentsBlock`) | Горизонтальная карусель из 7 отзывов с аватарами и рейтингом |
| 📞 **Подвал** (`Footer`) | Контакты, логотип, ссылки на соцсети |

### 🎮 Интерактивные фишки

- **Кликер** — кликайте по лицу 100 раз, чтобы разблокировать промокод `WHISTLER30` (−30%), автоматически копируется в буфер обмена. В процессе лицо «изнашивается» (8 состояний картинки)
- **Децибел-метр** — сила свиста измеряется через **Web Audio API** (`getUserMedia` + `AnalyserNode`). Уровень оценивается от «Тишина» до «Легенда», лучший результат запоминается

---

## 🛠 Технологии

| Технология | Зачем |
|------------|-------|
| [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) | UI и типизация, сборка через Create React App |
| [Chakra UI v2](https://chakra-ui.com/) + Emotion | Компонентная библиотека и стилизация |
| [Framer Motion](https://www.framer.com/motion/) | Плавные анимации и микровзаимодействия |
| [AOS](https://michalsnik.github.io/aos/) | Анимация блоков при прокрутке |
| [Lucide](https://lucide.dev/) | Иконки |
| [Web Audio API](https://developer.mozilla.org/ru/docs/Web/API/Web_Audio_API) | Доступ к микрофону и анализ громкости свиста |

---

## 🚀 Быстрый старт

```bash
# 1. Клонировать репозиторий
git clone https://github.com/Gaz1x/whistiling-landing-page.git
cd whistiling-landing-page

# 2. Установить зависимости
npm install

# 3. Запустить в dev-режиме → http://localhost:3000
npm start
```

> ⚠️ Блок с децибел-метром требует доступ к микрофону — разрешите доступ в браузере и откройте сайт по **HTTPS** или `localhost`.

---

## 📜 Скрипты

| Команда | Описание |
|---------|----------|
| `npm start` | Dev-сервер с hot-reload на `localhost:3000` |
| `npm run build` | Продакшен-сборка в папку `/build` |
| `npm test` | Запуск тестов (Jest + React Testing Library) |
| `npm run eject` | Необратимый вывод конфигурации CRA ⚠️ |

---

## 📦 Деплой на GitHub Pages

Проект разворачивается вручную на ветку `gh-pages`:

```bash
# 1. Собрать продакшен-версию
npm run build

# 2. Скопировать содержимое папки /build в корень ветки gh-pages
git checkout gh-pages
# ...скопировать файлы из build/ в корень репозитория...

# 3. Закоммитить и запушить
git add .
git commit -m "chore: deploy build"
git push origin gh-pages
```

<details>
<summary>Важные моменты</summary>

- Ссылка на прод (`homepage` в `package.json`): `https://Gaz1x.github.io/whistiling-landing-page`
- Файлы сборки хранятся **только** в отдельной ветке `gh-pages`, в `main` они не попадают
- После деплоя GitHub Pages обновляется в течение ~1 минуты

</details>

---

## 🗂 Структура проекта

```
whistling-landing-page/
├── public/                  # Статика: index.html, favicon, манифест
├── src/
│   ├── components/          # Переиспользуемые: Navbar, Footer, UI
│   ├── WriteBlock/          # Герой + модалки записи и оплаты
│   ├── AboutBlock/          # Блок «О мастер-классе»
│   ├── InteractiveComponents/  # Кликер и децибел-метр
│   ├── CommentsBlock/       # Карусель отзывов
│   ├── App.tsx              # Сборка всех блоков + AOS
│   └── index.tsx            # Точка входа
├── package.json
└── tsconfig.json
```

---

## 🧩 Архитектура

Каждый блок — отдельная папка со своими компонентами и папкой `images/`:

- **WriteBlock** — `HeroContent`, `HeroImage`, `StatsCard` + два модальных окна (регистрация с валидацией → оплата с промокодом)
- **InteractiveComponents** — `Clicker` (состояние прогресса 0/25/50/75/100) и `SoundMeter` (AudioContext + AnalyserNode)
- **CommentsBlock** — данные отзывов вынесены в `commentsData.tsx`

---

## 📄 Лицензия

Распространяется по лицензии [MIT](LICENSE).

---

<div align="center">

**Сделано с ❤️ и двумя пальцами во рту**

[![GitHub](https://img.shields.io/badge/GitHub-Gaz1x-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Gaz1x)

</div>
