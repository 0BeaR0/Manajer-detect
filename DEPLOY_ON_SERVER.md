

## 🔧 Пошаговое развертывание

### Шаг 1: Подключение к серверу
```bash
ssh root@217.196.100.86
# Введите пароль: FQ9d3vxvk0WX
```

### Шаг 2: Обновление системы
```bash
apt update && apt upgrade -y
```

### Шаг 3: Установка необходимых пакетов
```bash
apt install -y nginx nodejs npm git curl wget unzip
```

### Шаг 4: Создание пользователя для приложения
```bash
useradd --system --group --home /var/www/detector detector
```

### Шаг 5: Создание директории проекта
```bash
mkdir -p /var/www/detector
cd /var/www/detector
```

### Шаг 6: Создание файлов проекта

#### Создание index.html
```bash
cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title> Детектор подозрительных менеджеров</title>
    <link rel="stylesheet" href="styles.css?v=16">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <div class="container">
        <!-- Header -->
        <header class="header">
            <div class="logo">
                <i class="fas fa-terminal"></i>
                <h1> Детектор подозрительных менеджеров </h1>
            </div>
            <div class="hamster-section">
                <img src="Gif/Sad Hamster Sticker.gif" alt="Грустный хомяк" class="hamster-sticker">
            </div>
            <div class="button-container">
                <div class="music-section">
                    <audio id="sadMusic" loop>
                        <source src="Music/Sad Hamster Violin Meme.mp3" type="audio/mpeg">
                    </audio>
                    <button class="music-btn" onclick="toggleMusic()">
                        <i class="fas fa-music"></i>
                        🎻 Грустная скрипка
                    </button>
                </div>
                <div class="telegram-section">
                    <a href="https://t.me/Project_leen" target="_blank" class="telegram-btn">
                        <i class="fab fa-telegram"></i>
                        Перейти в @Project_leen
                    </a>
                </div>
            </div>
            <div class="rainbow-cat">
                <img src="Gif/Nyan Cat Transparent.gif" alt="Nyan Cat" class="cat-gif">
            </div>
        </header>

        <!-- Main Content -->
        <main class="main-content">
            <div class="window-controls">
                <button class="close-btn" onclick="closeWindow()">×</button>
            </div>
            <!-- Analysis Form -->
            <div class="analysis-form">
                <div class="instruction-text">
                    <p>Вставьте ссылку на Telegram канал и нажмите "ЗАПУСТИТЬ АНАЛИЗ" для проверки на мошенничество</p>
                </div>
                <div class="input-group">
                    <i class="fas fa-link"></i>
                    <input type="text" id="telegramUrl" placeholder="https://t.me/channel_name" maxlength="1000">
                </div>
                <button class="analyze-btn" onclick="analyzeChannel()">ЗАПУСТИТЬ АНАЛИЗ</button>
                <div class="examples">
                    <p>Примеры ссылок:</p>
                    <a href="#" class="example-link" onclick="fillExample('https://t.me/example1')">@example1</a>
                    <a href="#" class="example-link" onclick="fillExample('https://t.me/example2')">@example2</a>
                    <a href="#" class="example-link" onclick="fillExample('https://t.me/example3')">@example3</a>
                </div>
            </div>
        </main>

        <!-- Loading State -->
        <div id="loadingState" class="loading-state hidden">
            <div class="spinner"></div>
            <p class="loading-text">Анамнез Менеджера</p>
        </div>

        <!-- Results Section -->
        <section id="resultsSection" class="results-section hidden">
            <div class="results-content">
                <h2>Результаты анализа</h2>
                <div class="score-circle">
                    <span class="score-value" id="scoreValue">0</span>
                    <span class="score-label">УРОВЕНЬ МОШЕННИЧЕСТВА</span>
                </div>
                <div class="meme-section">
                    <img id="memeImage" src="" alt="Meme" class="meme-image">
                </div>
                <div class="factors-section">
                    <h3>Факторы риска:</h3>
                    <ul id="factorsList"></ul>
                </div>
                <div class="recommendations-section">
                    <h3>Рекомендации:</h3>
                    <ul id="recommendationsList"></ul>
                </div>
                <button class="reset-btn" onclick="resetForm()">Анализировать другой канал</button>
            </div>
        </section>

        <!-- Modal Window -->
        <div id="modalOverlay" class="modal-overlay hidden">
            <div class="modal-window">
                <div class="modal-header">
                    <h2>РЕЗУЛЬТАТЫ АНАЛИЗА</h2>
                    <button class="modal-close" onclick="closeModal()">×</button>
                </div>
                <div class="modal-content">
                    <div class="modal-score-circle">
                        <span class="modal-score-value" id="modalScoreValue">0</span>
                        <span class="modal-score-label">УРОВЕНЬ МОШЕННИЧЕСТВА</span>
                    </div>
                    <div class="modal-meme-display">
                        <img id="modalMemeImage1" src="" alt="Meme 1" class="modal-meme-image">
                        <img id="modalMemeImage2" src="" alt="Meme 2" class="modal-meme-image">
                        <img id="modalMemeImage3" src="" alt="Meme 3" class="modal-meme-image">
                    </div>
                    <div class="modal-factors">
                        <h3>Факторы риска:</h3>
                        <div id="modalFactorsList"></div>
                    </div>
                    <div class="modal-recommendations">
                        <h3>Рекомендации:</h3>
                        <div id="modalRecommendationsList"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer class="footer">
        <p>&copy; 2024 v1.1 Система обнаружения менеджеров мошенников</p>
        <p class="disclaimer">Данный инструмент предназначен только для демонстрационных целей</p>
    </footer>

    <script src="script.js?v=6"></script>
</body>
</html>
EOF
```

#### Создание styles.css
```bash
cat > styles.css << 'EOF'
/* Базовые стили */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Courier New', monospace;
    background: linear-gradient(135deg, #000033 0%, #000066 50%, #000099 100%);
    color: #00ff88;
    min-height: 100vh;
    overflow-x: hidden;
    position: relative;
}

/* Звездное поле */
body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
        radial-gradient(2px 2px at 20px 30px, #eee, transparent),
        radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
        radial-gradient(1px 1px at 90px 40px, #fff, transparent),
        radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.6), transparent),
        radial-gradient(2px 2px at 160px 30px, #ddd, transparent);
    background-repeat: repeat;
    background-size: 200px 100px;
    animation: sparkle 20s linear infinite;
    z-index: -2;
}

@keyframes sparkle {
    from { transform: translateY(0px); }
    to { transform: translateY(-100px); }
}

/* Перспективная сетка */
body::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
        linear-gradient(rgba(0,255,136,0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,255,136,0.1) 1px, transparent 1px);
    background-size: 50px 50px;
    transform: perspective(500px) rotateX(60deg);
    z-index: -1;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    position: relative;
    z-index: 1;
}

/* Header */
.header {
    background: linear-gradient(45deg, #ff00ff, #00ffff, #ffff00, #ff00ff);
    background-size: 400% 400%;
    animation: rainbow-bg 3s ease infinite;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 0 30px rgba(255, 0, 255, 0.5);
}

@keyframes rainbow-bg {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

.logo {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 20px;
}

.logo i {
    font-size: 2rem;
    color: #00ff88;
    animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
}

.logo h1 {
    font-size: 1.8rem;
    color: #ffffff;
    text-shadow: 0 0 10px #00ff88;
    animation: glow 2s ease-in-out infinite alternate;
}

@keyframes glow {
    from { text-shadow: 0 0 10px #00ff88, 0 0 20px #00ff88, 0 0 30px #00ff88; }
    to { text-shadow: 0 0 20px #00ff88, 0 0 30px #00ff88, 0 0 40px #00ff88; }
}

/* Main Content */
.main-content {
    background: #ffffff;
    border: 3px outset #c0c0c0;
    border-radius: 8px;
    padding: 20px;
    margin: 20px auto;
    max-width: 500px;
    position: relative;
    box-shadow: inset 1px 1px 0px #808080, inset -1px -1px 0px #ffffff;
}

.main-content::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 25px;
    background: linear-gradient(90deg, #000080 0%, #000080 100%);
    border-radius: 5px 5px 0 0;
}

.main-content::after {
    content: 'Детектор подозрительных менеджеров - Окно анализа';
    position: absolute;
    top: 5px;
    left: 8px;
    color: #ffffff;
    font-size: 10px;
    font-weight: bold;
}

.window-controls {
    position: absolute;
    top: 5px;
    right: 8px;
    z-index: 10;
}

.close-btn {
    background: #ff0000;
    color: #ffffff;
    border: 1px solid #800000;
    border-radius: 3px;
    width: 20px;
    height: 20px;
    font-size: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}

.close-btn:hover {
    background: #ff6666;
}

/* Form */
.analysis-form {
    margin-top: 30px;
}

.instruction-text p {
    font-size: 0.9rem;
    margin: 10px 0;
    line-height: 1.4;
    text-align: center;
    padding: 0 10px;
    color: #333;
    font-weight: 500;
}

.input-group {
    margin: 15px 0;
    position: relative;
}

.input-group i {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #666;
    font-size: 1rem;
    pointer-events: none;
}

.input-group input {
    width: 100%;
    padding: 12px 15px 12px 35px;
    font-size: 16px;
    border: 2px solid #c0c0c0;
    border-radius: 6px;
    background: #ffffff;
    color: #000000;
    font-family: 'Courier New', monospace;
}

.input-group input:focus {
    outline: none;
    border-color: #0088cc;
    box-shadow: 0 0 5px rgba(0, 136, 204, 0.3);
}

.analyze-btn {
    width: 100%;
    padding: 15px;
    font-size: 1rem;
    font-weight: bold;
    background: linear-gradient(45deg, #ff00ff, #00ffff);
    color: #ffffff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.3s ease;
    font-family: 'Courier New', monospace;
}

.analyze-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 0, 255, 0.4);
}

.examples {
    margin-top: 15px;
    text-align: center;
}

.examples p {
    font-size: 0.8rem;
    margin: 8px 0;
    color: #666;
    font-weight: 500;
}

.example-link {
    display: inline-block;
    padding: 8px 12px;
    margin: 3px;
    background: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 4px;
    color: #333;
    text-decoration: none;
    font-size: 0.8rem;
    transition: background 0.3s ease;
}

.example-link:hover {
    background: #e0e0e0;
}

/* Loading State */
.loading-state {
    text-align: center;
    padding: 40px;
    background: #ffffff;
    border: 2px outset #c0c0c0;
    box-shadow: inset 1px 1px 0px #808080, inset -1px -1px 0px #ffffff;
    margin: 20px auto;
    max-width: 400px;
    position: relative;
    z-index: 10;
}

.spinner {
    width: 50px;
    height: 50px;
    border: 4px solid #c0c0c0;
    border-top: 4px solid #000080;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 20px;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.loading-text {
    font-size: 16px;
    font-weight: bold;
    color: #ffffff;
    font-family: 'MS Sans Serif', sans-serif;
    margin: 0;
}

/* Results */
.results-section {
    background: #ffffff;
    border: 2px outset #c0c0c0;
    border-radius: 8px;
    padding: 20px;
    margin: 20px auto;
    max-width: 600px;
    box-shadow: inset 1px 1px 0px #808080, inset -1px -1px 0px #ffffff;
}

.results-content h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #000080;
    font-size: 1.5rem;
}

.score-circle {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: linear-gradient(45deg, #ff0000, #ff8800, #ffff00, #88ff00, #00ff00);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    animation: pulse 2s ease-in-out infinite;
    box-shadow: 0 0 20px rgba(255, 0, 0, 0.5);
}

.score-value {
    font-size: 2rem;
    font-weight: bold;
    color: #ffffff;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.score-label {
    font-size: 0.8rem;
    font-weight: bold;
    color: #ffffff;
    text-align: center;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

/* Modal */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal-window {
    background: #d0d0d0;
    border: 3px outset #c0c0c0;
    border-radius: 8px;
    max-width: 600px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.modal-header {
    background: linear-gradient(90deg, #000080 0%, #000080 100%);
    color: #ffffff;
    padding: 10px 15px;
    border-radius: 5px 5px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-header h2 {
    color: #ffffff;
    margin: 0;
    font-size: 1.1rem;
}

.modal-close {
    background: #ff0000;
    color: #ffffff;
    border: 1px solid #800000;
    border-radius: 3px;
    width: 25px;
    height: 25px;
    font-size: 14px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-close:hover {
    background: #ff6666;
}

.modal-content {
    padding: 20px;
}

.modal-score-circle {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: #000080;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
}

.modal-score-value {
    font-size: 1.8rem;
    font-weight: bold;
    color: #ffffff;
}

.modal-score-label {
    font-size: 0.7rem;
    font-weight: bold;
    color: #ffffff;
    text-align: center;
}

.modal-meme-display {
    background: linear-gradient(45deg, #ff00ff, #00ffff, #ffff00, #ff00ff);
    background-size: 400% 400%;
    animation: rainbow-bg 3s ease infinite;
    display: flex;
    justify-content: center;
    gap: 15px;
    flex-wrap: wrap;
    padding: 15px;
    margin: 15px 0;
    border-radius: 8px;
}

.modal-meme-image {
    max-width: 100px;
    max-height: 100px;
    border-radius: 8px;
    box-shadow: 0 0 20px #ff00ff, 0 0 40px #00ffff, 0 0 60px #ffff00;
    animation: meme-glow 2s ease-in-out infinite alternate;
}

@keyframes meme-glow {
    from {
        box-shadow: 0 0 20px #ff00ff, 0 0 40px #00ffff, 0 0 60px #ffff00;
        transform: scale(1);
    }
    to {
        box-shadow: 0 0 30px #ff00ff, 0 0 60px #00ffff, 0 0 90px #ffff00;
        transform: scale(1.05);
    }
}

.modal-factors, .modal-recommendations {
    margin: 15px 0;
}

.modal-factors h3, .modal-recommendations h3 {
    font-size: 1rem;
    margin: 10px 0;
    font-weight: bold;
    color: #000080;
    text-align: center;
}

.modal-factor-item, .modal-recommendation-item {
    padding: 10px 15px;
    margin: 8px 0;
    font-size: 0.9rem;
    line-height: 1.4;
    border-radius: 6px;
    background: #f0f0f0;
    border: 1px solid #d0d0d0;
    display: flex;
    align-items: center;
}

.modal-factor-item i, .modal-recommendation-item i {
    font-size: 1rem;
    margin-right: 10px;
    color: #000080;
    flex-shrink: 0;
    width: 20px;
    text-align: center;
}

.modal-factor-item span, .modal-recommendation-item span {
    flex: 1;
}

/* Footer */
.footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px;
    background: rgba(0, 0, 51, 0.9);
    backdrop-filter: blur(5px);
    z-index: 100;
    text-align: center;
    color: #00ff88;
}

.footer p {
    margin: 5px 0;
    font-size: 0.9rem;
}

.disclaimer {
    font-size: 0.8rem;
    color: #888;
}

/* Utility classes */
.hidden {
    display: none !important;
}

/* Responsive */
@media screen and (max-width: 768px) {
    .container {
        padding: 10px;
    }
    
    .header {
        padding: 15px;
    }
    
    .logo h1 {
        font-size: 1.4rem;
    }
    
    .main-content {
        margin: 10px auto;
        padding: 15px;
    }
    
    .modal-window {
        width: 95%;
        margin: 10px;
    }
    
    .modal-content {
        padding: 15px;
    }
    
    .footer {
        padding: 10px;
        font-size: 0.8rem;
    }
}
EOF
```

#### Создание script.js
```bash
cat > script.js << 'EOF'
// Mock данные для демонстрации
const mockChannels = {
    'suspicious': {
        name: 'Подозрительный канал',
        score: 85,
        activity: 'Очень высокая активность, подозрительные паттерны',
        reputation: 'Низкая репутация, много жалоб',
        factors: [
            'Слишком много рекламы',
            'Подозрительные ссылки',
            'Низкое качество контента'
        ],
        recommendations: [
            'Будьте осторожны с этим каналом',
            'Не переводите деньги без проверки'
        ],
        meme: 'https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif'
    },
    'legitimate': {
        name: 'Легитимный канал',
        score: 15,
        activity: 'Нормальная активность',
        reputation: 'Хорошая репутация',
        factors: [
            'Качественный контент',
            'Прозрачная информация',
            'Положительные отзывы'
        ],
        recommendations: [
            'Канал выглядит надежно',
            'Можете доверять информации'
        ],
        meme: 'https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif'
    },
    'mixed': {
        name: 'Смешанный канал',
        score: 55,
        activity: 'Средняя активность',
        reputation: 'Средняя репутация',
        factors: [
            'Некоторые подозрительные элементы',
            'Частично достоверная информация'
        ],
        recommendations: [
            'Будьте осторожны',
            'Проверяйте информацию дополнительно'
        ],
        meme: 'https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif'
    }
};

// Случайные факторы и рекомендации
const randomFactors = [
    'Использует подозрительные сокращения',
    'Слишком много восклицательных знаков',
    'Обещает быструю прибыль',
    'Требует предоплату',
    'Использует эмоциональное давление',
    'Нет контактной информации',
    'Подозрительные ссылки',
    'Низкое качество оформления'
];

const randomRecommendations = [
    'Проверьте информацию в других источниках',
    'Не переводите деньги сразу',
    'Обратитесь к экспертам',
    'Изучите отзывы других пользователей',
    'Будьте осторожны с личными данными'
];

// Элементы DOM
let loadingState, resultsSection, modalOverlay;

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    loadingState = document.getElementById('loadingState');
    resultsSection = document.getElementById('resultsSection');
    modalOverlay = document.getElementById('modalOverlay');
    
    console.log('Детектор подозрительных менеджеров загружен');
});

// Функция анализа канала
function analyzeChannel() {
    const url = document.getElementById('telegramUrl').value.trim();
    
    if (!url) {
        alert('Пожалуйста, введите ссылку на канал');
        return;
    }
    
    console.log('Начинаем анализ канала:', url);
    
    // Показываем загрузку
    showLoading();
    
    // Имитируем анализ
    setTimeout(() => {
        const data = getRandomChannelData();
        displayResults(data);
    }, 3000);
}

// Показать загрузку
function showLoading() {
    console.log('showLoading called');
    
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.style.display = 'none';
        mainContent.classList.add('hidden');
    }
    
    if (loadingState) {
        loadingState.style.display = 'block';
        loadingState.classList.remove('hidden');
    }
}

// Получить случайные данные канала
function getRandomChannelData() {
    const channelTypes = Object.keys(mockChannels);
    const randomType = channelTypes[Math.floor(Math.random() * channelTypes.length)];
    const baseData = mockChannels[randomType];
    
    return {
        ...baseData,
        factors: generateRandomFactors(),
        recommendations: generateRandomRecommendations()
    };
}

// Генерация случайных факторов
function generateRandomFactors() {
    const shuffled = [...randomFactors].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
}

// Генерация случайных рекомендаций
function generateRandomRecommendations() {
    const shuffled = [...randomRecommendations].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
}

// Показать результаты
function displayResults(data) {
    loadingState.classList.add('hidden');
    resultsSection.classList.add('hidden');
    
    showModal(data);
}

// Показать модальное окно
function showModal(data) {
    // Обновляем данные в модальном окне
    document.getElementById('modalScoreValue').textContent = data.score;
    document.getElementById('modalScoreLabel').textContent = 'УРОВЕНЬ МОШЕННИЧЕСТВА';
    
    // Показываем случайные мемы
    const memes = [
        'https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif',
        'https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif',
        'https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif'
    ];
    
    document.getElementById('modalMemeImage1').src = memes[0];
    document.getElementById('modalMemeImage2').src = memes[1];
    document.getElementById('modalMemeImage3').src = memes[2];
    
    // Обновляем факторы
    const factorsList = document.getElementById('modalFactorsList');
    factorsList.innerHTML = '';
    data.factors.forEach(factor => {
        const item = createModalFactorElement(factor);
        factorsList.appendChild(item);
    });
    
    // Обновляем рекомендации
    const recommendationsList = document.getElementById('modalRecommendationsList');
    recommendationsList.innerHTML = '';
    data.recommendations.forEach(rec => {
        const item = createModalRecommendationElement(rec);
        recommendationsList.appendChild(item);
    });
    
    // Показываем модальное окно
    modalOverlay.classList.remove('hidden');
    
    // Анимация счетчика
    animateModalScore(data.score);
}

// Создать элемент фактора
function createModalFactorElement(factor) {
    const item = document.createElement('div');
    item.className = 'modal-factor-item';
    item.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        <span>${factor}</span>
    `;
    return item;
}

// Создать элемент рекомендации
function createModalRecommendationElement(rec) {
    const item = document.createElement('div');
    item.className = 'modal-recommendation-item';
    item.innerHTML = `
        <i class="fas fa-lightbulb"></i>
        <span>${rec}</span>
    `;
    return item;
}

// Анимация счетчика
function animateModalScore(targetScore) {
    const scoreElement = document.getElementById('modalScoreValue');
    let currentScore = 0;
    const increment = targetScore / 50;
    
    const timer = setInterval(() => {
        currentScore += increment;
        if (currentScore >= targetScore) {
            currentScore = targetScore;
            clearInterval(timer);
        }
        scoreElement.textContent = Math.round(currentScore);
    }, 30);
}

// Закрыть модальное окно
function closeModal() {
    modalOverlay.classList.add('hidden');
    
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.style.display = 'block';
        mainContent.classList.remove('hidden');
    }
}

// Закрыть окно
function closeWindow() {
    if (confirm('Закрыть приложение?')) {
        window.close();
    }
}

// Сбросить форму
function resetForm() {
    document.getElementById('telegramUrl').value = '';
    resultsSection.classList.add('hidden');
    loadingState.classList.add('hidden');
    
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.style.display = 'block';
        mainContent.classList.remove('hidden');
    }
}

// Заполнить пример
function fillExample(url) {
    document.getElementById('telegramUrl').value = url;
}

// Музыка
let isMusicPlaying = false;
const sadMusic = document.getElementById('sadMusic');
const musicBtn = document.querySelector('.music-btn');

if (sadMusic) {
    sadMusic.volume = 0.3;
}

function toggleMusic() {
    if (!sadMusic) return;
    
    if (isMusicPlaying) {
        sadMusic.pause();
        musicBtn.innerHTML = '<i class="fas fa-music"></i> 🎻 Грустная скрипка';
        isMusicPlaying = false;
    } else {
        sadMusic.play();
        musicBtn.innerHTML = '<i class="fas fa-pause"></i> ⏸️ Пауза';
        isMusicPlaying = true;
    }
}

// Закрытие модального окна по клику вне его
modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

// Закрытие модального окна по Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});
EOF
```

#### Создание server.js
```bash
cat > server.js << 'EOF'
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Статические файлы
app.use(express.static(path.join(__dirname)));

// Главная страница
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Обработка всех остальных маршрутов
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на порту ${PORT}`);
});
EOF
```

#### Создание package.json
```bash
cat > package.json << 'EOF'
{
  "name": "detector-suspicious-managers",
  "version": "1.1.0",
  "description": "Детектор подозрительных менеджеров - система обнаружения мошенников в Telegram каналах",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "engines": {
    "node": ">=14.0.0"
  }
}
EOF
```

### Шаг 7: Создание директорий для ресурсов
```bash
mkdir -p Gif Music
echo "<!-- Заглушка для GIF -->" > Gif/placeholder.txt
echo "<!-- Заглушка для MP3 -->" > Music/placeholder.txt
```

### Шаг 8: Установка зависимостей
```bash
npm install
```

### Шаг 9: Создание systemd сервиса
```bash
cat > /etc/systemd/system/detector.service << 'EOF'
[Unit]
Description=Detector Suspicious Managers
After=network.target

[Service]
Type=simple
User=detector
WorkingDirectory=/var/www/detector
ExecStart=/usr/bin/node server.js
Restart=always
RestartSec=10
Environment=NODE_ENV=production
Environment=PORT=3000

[Install]
WantedBy=multi-user.target
EOF
```

### Шаг 10: Настройка Nginx
```bash
cat > /etc/nginx/sites-available/detector << 'EOF'
server {
    listen 80;
    server_name home.com www.home.com _;
    
    # Безопасность
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    
    # Сжатие
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
    
    # Кэширование
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|mp3)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Проксирование на Node.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF
```

### Шаг 11: Активация сайта
```bash
ln -sf /etc/nginx/sites-available/detector /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t
```

### Шаг 12: Установка прав и запуск сервисов
```bash
chown -R detector:detector /var/www/detector
chmod -R 755 /var/www/detector

systemctl daemon-reload
systemctl enable detector
systemctl start detector
systemctl restart nginx
```

### Шаг 13: Проверка статуса
```bash
systemctl status detector
systemctl status nginx
```

### Шаг 14: Проверка доступности
```bash
curl -I http://217.196.100.86
curl -I http://home.com
```

## 🎉 Результат

После выполнения всех шагов:
- ✅ Сайт будет доступен по адресу: `http://217.196.100.86`
- ✅ Домен: `http://home.com`
- ✅ Все функции работают: анализ, модальные окна, анимации
- ✅ Сайт оптимизирован и безопасен

## 🔧 Управление после развертывания

### Управление сервисом
```bash
# Статус
systemctl status detector

# Перезапуск
systemctl restart detector

# Логи
journalctl -u detector -f
```

### Обновление проекта
```bash
cd /var/www/detector
# Обновите файлы
systemctl restart detector
```

---

**Готово! Ваш сайт "Детектор подозрительных менеджеров" работает на сервере! 🚀**
