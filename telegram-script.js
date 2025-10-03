// Telegram Mini App JavaScript
class TelegramDetectorApp {
    constructor() {
        this.tg = window.Telegram.WebApp;
        this.init();
    }

    init() {
        // Инициализация Telegram WebApp
        this.tg.ready();
        this.tg.expand();
        
        // Настройка темы
        this.setupTheme();
        
        // Настройка событий
        this.setupEvents();
        
        // Показываем главную кнопку
        this.tg.MainButton.setText('Запустить анализ');
        this.tg.MainButton.hide();
        
        // Показываем кнопку назад
        this.tg.BackButton.show();
        this.tg.BackButton.onClick(() => {
            this.closeModal();
        });
    }

    setupTheme() {
        // Применяем тему Telegram
        document.body.style.backgroundColor = this.tg.themeParams.bg_color || '#ffffff';
        document.body.style.color = this.tg.themeParams.text_color || '#000000';
    }

    setupEvents() {
        const form = document.getElementById('telegram-analysis-form');
        const input = document.getElementById('telegram-channel-input');
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.analyzeChannel(input.value.trim());
        });

        // Обработка изменений в поле ввода
        input.addEventListener('input', (e) => {
            const value = e.target.value.trim();
            if (value) {
                this.tg.MainButton.show();
            } else {
                this.tg.MainButton.hide();
            }
        });

        // Обработка главной кнопки Telegram
        this.tg.MainButton.onClick(() => {
            this.analyzeChannel(input.value.trim());
        });
    }

    analyzeChannel(channelName) {
        if (!channelName) {
            this.tg.showAlert('Пожалуйста, введите @username канала');
            return;
        }

        // Показываем загрузку
        this.showLoading();
        
        // Скрываем главную кнопку
        this.tg.MainButton.hide();

        // Симулируем анализ (в реальном приложении здесь будет API запрос)
        setTimeout(() => {
            this.hideLoading();
            this.showResults(this.generateMockResults(channelName));
        }, 2000);
    }

    showLoading() {
        document.getElementById('telegram-loading').classList.remove('hidden');
        document.querySelector('.telegram-form-container').style.display = 'none';
    }

    hideLoading() {
        document.getElementById('telegram-loading').classList.add('hidden');
        document.querySelector('.telegram-form-container').style.display = 'block';
    }

    generateMockResults(channelName) {
        const riskFactors = [
            'Слишком много рекламы криптовалют',
            'Обещания быстрого обогащения',
            'Отсутствие реальных отзывов',
            'Подозрительные схемы заработка',
            'Требование предоплаты',
            'Скрытие информации о владельце',
            'Использование фейковых скриншотов',
            'Агрессивная реклама в личных сообщениях'
        ];

        const recommendations = [
            'Проверьте историю канала',
            'Изучите отзывы в других источниках',
            'Не переводите деньги без гарантий',
            'Обратитесь к независимым экспертам',
            'Проверьте регистрацию компании',
            'Изучите реальные кейсы клиентов',
            'Остерегайтесь схем "быстрых денег"',
            'Проверьте репутацию в интернете'
        ];

        const memes = [
            '🤡 Клоун',
            '💸 Деньги на ветер',
            '🚨 Внимание!',
            '🤔 Подозрительно',
            '😱 Опасно!',
            '💀 Смерть кошельку',
            '🎭 Маскарад',
            '🔍 Детектив'
        ];

        // Генерируем случайные результаты
        const riskScore = Math.floor(Math.random() * 100);
        const selectedFactors = this.getRandomItems(riskFactors, 3);
        const selectedRecommendations = this.getRandomItems(recommendations, 3);
        const selectedMemes = this.getRandomItems(memes, 3);

        return {
            channelName,
            riskScore,
            factors: selectedFactors,
            recommendations: selectedRecommendations,
            memes: selectedMemes
        };
    }

    getRandomItems(array, count) {
        const shuffled = [...array].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    showResults(results) {
        // Заполняем модальное окно
        document.getElementById('telegram-risk-score').textContent = `${results.riskScore}%`;
        
        // Заполняем факторы риска
        const factorsList = document.getElementById('telegram-factors-list');
        factorsList.innerHTML = '';
        results.factors.forEach(factor => {
            const li = document.createElement('li');
            li.textContent = factor;
            factorsList.appendChild(li);
        });

        // Заполняем рекомендации
        const recommendationsList = document.getElementById('telegram-recommendations-list');
        recommendationsList.innerHTML = '';
        results.recommendations.forEach(rec => {
            const li = document.createElement('li');
            li.textContent = rec;
            recommendationsList.appendChild(li);
        });

        // Заполняем мемы
        const memesContainer = document.getElementById('telegram-memes');
        memesContainer.innerHTML = '';
        results.memes.forEach(meme => {
            const div = document.createElement('div');
            div.className = 'meme-item';
            div.textContent = meme;
            memesContainer.appendChild(div);
        });

        // Показываем модальное окно
        document.getElementById('telegram-modal').classList.remove('hidden');
        
        // Анимируем счетчик риска
        this.animateRiskScore(results.riskScore);
        
        // Показываем кнопку назад
        this.tg.BackButton.show();
    }

    animateRiskScore(targetScore) {
        const scoreElement = document.getElementById('telegram-risk-score');
        let currentScore = 0;
        const increment = targetScore / 50;
        
        const timer = setInterval(() => {
            currentScore += increment;
            if (currentScore >= targetScore) {
                currentScore = targetScore;
                clearInterval(timer);
            }
            scoreElement.textContent = `${Math.floor(currentScore)}%`;
        }, 30);
    }

    closeModal() {
        document.getElementById('telegram-modal').classList.add('hidden');
        this.tg.BackButton.hide();
        this.tg.MainButton.show();
    }

    shareResults() {
        const riskScore = document.getElementById('telegram-risk-score').textContent;
        const channelName = document.getElementById('telegram-channel-input').value;
        
        const shareText = `🔍 Анализ канала ${channelName}\n\nУровень мошенничества: ${riskScore}\n\nПроверено через @Project_leen бота`;
        
        this.tg.sendData(JSON.stringify({
            type: 'share',
            text: shareText,
            channel: channelName,
            riskScore: riskScore
        }));
    }

    openChannel() {
        this.tg.openTelegramLink('https://t.me/Project_leen');
    }
}

// Глобальные функции для кнопок
function closeTelegramModal() {
    window.telegramApp.closeModal();
}

function shareResults() {
    window.telegramApp.shareResults();
}

function openChannel() {
    window.telegramApp.openChannel();
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    window.telegramApp = new TelegramDetectorApp();
});

// Обработка закрытия модального окна по клику вне его
document.addEventListener('click', (e) => {
    const modal = document.getElementById('telegram-modal');
    if (e.target === modal) {
        closeTelegramModal();
    }
});

// Обработка клавиши Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeTelegramModal();
    }
});
