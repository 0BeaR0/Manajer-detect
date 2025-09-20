# 🕵️ Детектор подозрительных менеджеров

> Система обнаружения менеджеров мошенников v1.1

Веб-приложение для анализа Telegram каналов на предмет мошеннической деятельности с юмористическим подходом и ретро-стилистикой.

## ✨ Особенности

- 🔍 **Анализ Telegram каналов** - определение уровня риска мошенничества
- 🎨 **Ретро/Vaporwave дизайн** - стиль Windows 95 с неоновыми эффектами
- 📱 **Полностью адаптивный** - работает на всех устройствах
- 🎭 **Юмористические результаты** - смешные мемы и комментарии
- 🎵 **Интерактивные элементы** - музыка, анимации, GIF
- 🌈 **Nyan Cat анимация** - летающий кот с радужным следом
- 🎪 **Модальные окна** - красивое отображение результатов

## 🚀 Быстрый старт

### Локальный запуск

```bash
# Клонируйте репозиторий
git clone https://github.com/yourusername/detector-suspicious-managers.git

# Перейдите в папку проекта
cd detector-suspicious-managers

# Запустите локальный сервер
npm start
# или
python3 -m http.server 3000

# Откройте в браузере
open http://localhost:3000
```

### Деплой на Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/detector-suspicious-managers)

1. Нажмите кнопку выше
2. Подключите ваш GitHub аккаунт
3. Выберите репозиторий
4. Нажмите "Deploy"

### Деплой на Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/detector-suspicious-managers)

1. Нажмите кнопку выше
2. Подключите ваш GitHub аккаунт
3. Выберите репозиторий
4. Нажмите "Deploy site"

### Деплой на GitHub Pages

1. Перейдите в Settings вашего репозитория
2. Найдите раздел "Pages"
3. Выберите источник "Deploy from a branch"
4. Выберите ветку "main" и папку "/ (root)"
5. Нажмите "Save"

### Деплой на собственный сервер

#### Автоматическое развертывание
```bash
# Скачайте проект на сервер
git clone https://github.com/yourusername/detector-suspicious-managers.git
cd detector-suspicious-managers

# Запустите автоматический скрипт
sudo ./deploy.sh
```

#### Docker развертывание
```bash
# Скачайте проект на сервер
git clone https://github.com/yourusername/detector-suspicious-managers.git
cd detector-suspicious-managers

# Запустите Docker развертывание
./docker-deploy.sh
```

#### Ручное развертывание
Следуйте подробным инструкциям в [SERVER_DEPLOY.md](SERVER_DEPLOY.md)

## 🛠 Технологии

- **HTML5** - семантическая разметка
- **CSS3** - современные стили с анимациями
- **JavaScript (ES6+)** - интерактивность
- **Font Awesome** - иконки
- **Responsive Design** - адаптивность
- **CSS Grid & Flexbox** - современная верстка

## 📁 Структура проекта

```
detector-suspicious-managers/
├── index.html              # Главная страница
├── styles.css              # Стили и анимации
├── script.js               # JavaScript логика
├── package.json            # Конфигурация проекта
├── .gitignore              # Игнорируемые файлы
├── vercel.json             # Конфигурация Vercel
├── netlify.toml            # Конфигурация Netlify
├── README.md               # Документация
├── Gif/                    # GIF анимации
│   ├── Nyan Cat Transparent.gif
│   └── Sad Hamster Sticker.gif
└── Music/                  # Аудио файлы
    └── Sad Hamster Violin Meme.mp3
```

## 🎮 Использование

1. **Введите ссылку** на Telegram канал в поле ввода
2. **Нажмите "ЗАПУСТИТЬ АНАЛИЗ"** для начала проверки
3. **Дождитесь загрузки** - появится анимация "Анамнез Менеджера"
4. **Получите результат** в модальном окне с:
   - Процентом мошенничества
   - Случайными мемами
   - Факторами риска
   - Рекомендациями

## 🎨 Особенности дизайна

### Ретро-стилистика
- Цветовая схема: темно-синий, неоновый зеленый, розовый, голубой
- Шрифты: Courier New, MS Sans Serif
- Элементы: Windows 95-стиль окна, объемные кнопки
- Эффекты: неоновое свечение, звездное поле, перспективная сетка

### Адаптивность
- **≤360px**: Очень маленькие экраны
- **≤480px**: Мобильные устройства
- **481px-768px**: Планшеты в портрете
- **769px-1024px**: Планшеты в ландшафте
- **≥1025px**: Десктопы

### Анимации
- Nyan Cat летает по экрану
- Плачущий хомяк в хедере
- Неоновые эффекты
- Пульсирующие кнопки
- Анимированная загрузка

## 🔧 Настройка

### Изменение мемов
Замените файлы в папке `Gif/` на свои:
- `Nyan Cat Transparent.gif` - летающий кот
- `Sad Hamster Sticker.gif` - грустный хомяк

### Изменение музыки
Замените файл `Music/Sad Hamster Violin Meme.mp3` на свой.

### Настройка анализа
Отредактируйте массив `mockChannels` в `script.js` для изменения логики анализа.

## 📱 Поддерживаемые браузеры

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для новой функции (`git checkout -b feature/AmazingFeature`)
3. Зафиксируйте изменения (`git commit -m 'Add some AmazingFeature'`)
4. Отправьте в ветку (`git push origin feature/AmazingFeature`)
5. Откройте Pull Request

## 📄 Лицензия

Распространяется под лицензией MIT. См. `LICENSE` для получения дополнительной информации.

## 👥 Авторы

- **Project Leen** - *Идея и разработка* - [@Project_leen](https://t.me/Project_leen)

## 🙏 Благодарности

- Font Awesome за иконки
- Giphy за GIF анимации
- Сообщество разработчиков за вдохновение

## 📞 Контакты

- Telegram: [@Project_leen](https://t.me/Project_leen)
- GitHub: [yourusername](https://github.com/yourusername)

---

⭐ Если проект вам понравился, поставьте звездочку!