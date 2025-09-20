// DOM Elements
const telegramUrlInput = document.getElementById('telegramUrl');
const analyzeBtn = document.getElementById('analyzeBtn');
const loadingState = document.getElementById('loadingState');
const resultsSection = document.getElementById('resultsSection');
const analyzeAnotherBtn = document.getElementById('analyzeAnotherBtn');

// Debug: Check if elements are found
console.log('Elements found:');
console.log('telegramUrlInput:', telegramUrlInput);
console.log('analyzeBtn:', analyzeBtn);
console.log('loadingState:', loadingState);
console.log('resultsSection:', resultsSection);

// Results elements
const riskScore = document.getElementById('riskScore');
const createdDate = document.getElementById('createdDate');
const activity = document.getElementById('activity');
const reputation = document.getElementById('reputation');
const riskFactors = document.getElementById('riskFactors');
const recommendations = document.getElementById('recommendations');
const memeImage = document.getElementById('memeImage');

// Event Listeners
analyzeBtn.addEventListener('click', function() {
    console.log('Analyze button clicked');
    analyzeChannel();
});
analyzeAnotherBtn.addEventListener('click', resetForm);
telegramUrlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        analyzeChannel();
    }
});

// Mock data for demonstration with memes
const mockChannels = {
    'legitimate': {
        name: 'Честный Бизнес Канал',
        createdDate: '15 марта 2020',
        activity: 'Как у пчелы',
        reputation: 'Белее снега',
        riskScore: 15,
        memes: [
            'https://i.imgflip.com/2/1bij.jpg', // "Это нормально" мем
            'https://i.imgflip.com/2/1bgw.jpg', // "Все хорошо" мем
            'https://i.imgflip.com/2/1bhf.jpg', // "Все в порядке" мем
            'https://i.imgflip.com/2/1bht.jpg', // "Все отлично" мем
            'https://i.imgflip.com/2/1bi5.jpg', // "Все супер" мем
            'https://i.imgflip.com/2/1bi6.jpg', // "Все круто" мем
            'https://i.imgflip.com/2/1bi7.jpg', // "Все замечательно" мем
            'https://i.imgflip.com/2/1bi8.jpg', // "Все прекрасно" мем
            'https://i.imgflip.com/2/1bi9.jpg'  // "Все идеально" мем
        ],
        factors: [
            { icon: 'fas fa-check-circle', text: '✓ Постит каждый день, как часы' },
            { icon: 'fas fa-check-circle', text: '✓ Команда не прячется за анонимками' },
            { icon: 'fas fa-check-circle', text: '✓ Отвечает на вопросы, а не банит' }
        ],
        recommendations: [
            { icon: 'fas fa-thumbs-up', text: 'VERDICT: Этот канал не мошенник!' },
            { icon: 'fas fa-eye', text: 'TIP: Можно доверять, но следи за глазами' }
        ]
    },
    'suspicious': {
        name: 'Подозрительный Инвест Канал',
        createdDate: '2 января 2024',
        activity: 'Как у улитки',
        reputation: 'Серый кардинал',
        riskScore: 75,
        memes: [
            'https://i.imgflip.com/2/1bi8.jpg', // "Подозрительно" мем
            'https://i.imgflip.com/2/1bi9.jpg', // "Что-то не так" мем
            'https://i.imgflip.com/2/1bia.jpg', // "Странно" мем
            'https://i.imgflip.com/2/1bib.jpg', // "Настороженно" мем
            'https://i.imgflip.com/2/1bic.jpg', // "Внимательно" мем
            'https://i.imgflip.com/2/1bid.jpg', // "Осторожно" мем
            'https://i.imgflip.com/2/1bie.jpg', // "Будьте бдительны" мем
            'https://i.imgflip.com/2/1bif.jpg', // "Сомнительно" мем
            'https://i.imgflip.com/2/1big.jpg'  // "Подозрительно" мем
        ],
        factors: [
            { icon: 'fas fa-exclamation-triangle', text: '⚠ Сулит золотые горы за копейки' },
            { icon: 'fas fa-exclamation-triangle', text: '⚠ Лицензии? А что это такое?' },
            { icon: 'fas fa-exclamation-triangle', text: '⚠ "Быстро решай, а то опоздаешь!"' },
            { icon: 'fas fa-exclamation-triangle', text: '⚠ Отчеты пишет на салфетке' }
        ],
        recommendations: [
            { icon: 'fas fa-shield-alt', text: 'ALERT: Пахнет жареным!' },
            { icon: 'fas fa-search', text: 'ACTION: Гугли все, что можешь' },
            { icon: 'fas fa-ban', text: 'ADVICE: Не неси последние деньги' }
        ]
    },
    'high-risk': {
        name: 'Крипто-Развод Канал',
        createdDate: '10 декабря 2023',
        activity: 'Как у белки на кофеине',
        reputation: 'Чернее ночи',
        riskScore: 95,
        memes: [
            'https://i.imgflip.com/2/1bid.jpg', // "ПАНИКА" мем
            'https://i.imgflip.com/2/1bie.jpg', // "БЕГИТЕ" мем
            'https://i.imgflip.com/2/1bif.jpg', // "ОПАСНО" мем
            'https://i.imgflip.com/2/1big.jpg', // "МОШЕННИК" мем
            'https://i.imgflip.com/2/1bih.jpg', // "РАЗВОД" мем
            'https://i.imgflip.com/2/1bii.jpg', // "ВНИМАНИЕ" мем
            'https://i.imgflip.com/2/1bij.jpg', // "СТОП" мем
            'https://i.imgflip.com/2/1bik.jpg', // "ОСТАНОВИТЕСЬ" мем
            'https://i.imgflip.com/2/1bil.jpg'  // "НЕ ДЕЛАЙТЕ ЭТОГО" мем
        ],
        factors: [
            { icon: 'fas fa-times-circle', text: '✗ Люди кричат "ВЕРНИТЕ ДЕНЬГИ!"' },
            { icon: 'fas fa-times-circle', text: '✗ Результаты только в мечтах' },
            { icon: 'fas fa-times-circle', text: '✗ Спамит как телевизор в 90-х' },
            { icon: 'fas fa-times-circle', text: '✗ Банит всех, кто задает вопросы' },
            { icon: 'fas fa-times-circle', text: '✗ Выплаты? А что это?' }
        ],
        recommendations: [
            { icon: 'fas fa-exclamation-triangle', text: 'PANIC: БЕГИТЕ ОТСЮДА!' },
            { icon: 'fas fa-ban', text: 'BLOCK: НЕ ДАВАЙТЕ ИМ НИ КОПЕЙКИ!' },
            { icon: 'fas fa-flag', text: 'REPORT: Звоните в полицию!' }
        ]
    }
};

// Main analysis function
async function analyzeChannel() {
    console.log('analyzeChannel called');
    const url = telegramUrlInput.value.trim();
    
    if (!url) {
        showError('ВВЕДИТЕ ССЫЛКУ НА TELEGRAM КАНАЛ');
        return;
    }
    
    if (!isValidTelegramUrl(url)) {
        showError('НЕКОРРЕКТНАЯ ССЫЛКУ НА TELEGRAM КАНАЛ');
        return;
    }
    
    // Show loading state first
    console.log('Calling showLoading');
    showLoading();
    
    // Add small delay to ensure loading state is visible
    await new Promise(resolve => setTimeout(resolve, 100));
    
    try {
        // Simulate API call delay (3.2 seconds to complete all steps)
        await new Promise(resolve => setTimeout(resolve, 3200));
        
        // Get random mock data for demonstration
        const channelData = getRandomChannelData();
        
        // Display results in modal after loading is complete
        displayResults(channelData);
        
    } catch (error) {
        showError('ОШИБКА АНАЛИЗА КАНАЛА. ПОВТОРИТЕ ПОПЫТКУ.');
        console.error('Analysis error:', error);
    }
}

// Validate Telegram URL
function isValidTelegramUrl(url) {
    const telegramPatterns = [
        /^https?:\/\/(t\.me|telegram\.me)\/[\w@]+$/,
        /^@[\w]+$/,
        /^[\w]+$/
    ];
    
    return telegramPatterns.some(pattern => pattern.test(url));
}

// Show loading state with simple spinner
function showLoading() {
    console.log('showLoading called');
    
    // Hide main content window
    const mainContent = document.querySelector('.main-content');
    console.log('mainContent element:', mainContent);
    
    if (mainContent) {
        console.log('Before adding hidden class:', mainContent.classList);
        mainContent.style.display = 'none';
        mainContent.classList.add('hidden');
        console.log('After adding hidden class:', mainContent.classList);
        console.log('Main content hidden');
    } else {
        console.error('Main content element not found!');
    }
    
    // Show loading state
    if (loadingState) {
        loadingState.style.display = 'block';
        loadingState.classList.remove('hidden');
        console.log('Loading state shown');
    } else {
        console.error('Loading state element not found!');
    }
    
    if (resultsSection) {
        resultsSection.classList.add('hidden');
    }
}

// Generate random funny factors and recommendations
function generateRandomFactors() {
    const funnyFactors = [
        { icon: 'fas fa-check-circle', text: '✓ Постит каждый день, как часы' },
        { icon: 'fas fa-check-circle', text: '✓ Команда не прячется за анонимками' },
        { icon: 'fas fa-check-circle', text: '✓ Отвечает на вопросы, а не банит' },
        { icon: 'fas fa-exclamation-triangle', text: '⚠ Сулит золотые горы за копейки' },
        { icon: 'fas fa-exclamation-triangle', text: '⚠ Лицензии? А что это такое?' },
        { icon: 'fas fa-exclamation-triangle', text: '⚠ "Быстро решай, а то опоздаешь!"' },
        { icon: 'fas fa-times-circle', text: '✗ "100% гарантия прибыли" - красный флаг!' },
        { icon: 'fas fa-times-circle', text: '✗ Админ пишет только заглавными буквами' },
        { icon: 'fas fa-times-circle', text: '✗ "Секретные стратегии" за 100 рублей' },
        { icon: 'fas fa-question-circle', text: '? Канал создан вчера, а уже 50к подписчиков' },
        { icon: 'fas fa-question-circle', text: '? Все комментарии от ботов с аватарами котиков' },
        { icon: 'fas fa-question-circle', text: '? "Инсайдерская информация" из интернета' },
        { icon: 'fas fa-smile', text: '😄 Постит мемы про криптовалюты' },
        { icon: 'fas fa-smile', text: '😄 "Только для избранных" - но ссылка везде' },
        { icon: 'fas fa-smile', text: '😄 Говорит "хайп" в каждом посте' },
        { icon: 'fas fa-eye', text: '👁️ "Следи за обновлениями" - но обновлений нет' },
        { icon: 'fas fa-eye', text: '👁️ Фото профиля - скриншот с телефона' },
        { icon: 'fas fa-eye', text: '👁️ "Эксклюзивный контент" - копипаста с других каналов' }
    ];
    
    // Return 3 random factors
    const shuffled = funnyFactors.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
}

function generateRandomRecommendations() {
    const funnyRecommendations = [
        { icon: 'fas fa-thumbs-up', text: 'VERDICT: Этот канал не мошенник!' },
        { icon: 'fas fa-eye', text: 'TIP: Можно доверять, но следи за глазами' },
        { icon: 'fas fa-thumbs-down', text: 'VERDICT: Бегите, пока не поздно!' },
        { icon: 'fas fa-exclamation-triangle', text: 'WARNING: Подозрительно, но не критично' },
        { icon: 'fas fa-question-circle', text: 'QUESTION: А что говорит ваша интуиция?' },
        { icon: 'fas fa-smile', text: 'JOKE: Даже если мошенник, то веселый!' },
        { icon: 'fas fa-heart', text: 'LOVE: Канал с душой, но без лицензии' },
        { icon: 'fas fa-star', text: 'STAR: Звезда мошенничества в Telegram' },
        { icon: 'fas fa-rocket', text: 'ROCKET: Летит в космос или в пропасть?' },
        { icon: 'fas fa-gem', text: 'GEM: Алмаз или стекляшка?' },
        { icon: 'fas fa-crown', text: 'CROWN: Король или шут?' },
        { icon: 'fas fa-magic', text: 'MAGIC: Магия или иллюзия?' },
        { icon: 'fas fa-fire', text: 'FIRE: Горит ярко или просто дымит?' },
        { icon: 'fas fa-rainbow', text: 'RAINBOW: Радуга после дождя или мираж?' },
        { icon: 'fas fa-ghost', text: 'GHOST: Призрак или просто тень?' },
        { icon: 'fas fa-dragon', text: 'DRAGON: Дракон или ящерица?' },
        { icon: 'fas fa-unicorn', text: 'UNICORN: Единорог или просто лошадь с рогом?' },
        { icon: 'fas fa-alien', text: 'ALIEN: Инопланетянин или просто странный?' }
    ];
    
    // Return 2 random recommendations
    const shuffled = funnyRecommendations.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
}

// Get random channel data for demonstration
function getRandomChannelData() {
    const channelTypes = Object.keys(mockChannels);
    const randomType = channelTypes[Math.floor(Math.random() * channelTypes.length)];
    const baseData = mockChannels[randomType];
    
    // Generate random factors and recommendations
    const randomFactors = generateRandomFactors();
    const randomRecommendations = generateRandomRecommendations();
    
    return {
        ...baseData,
        factors: randomFactors,
        recommendations: randomRecommendations
    };
}

// Display analysis results
function displayResults(data) {
    loadingState.classList.add('hidden');
    resultsSection.classList.add('hidden');
    
    // Show modal window after loading is complete
    showModal(data);
}

// Animate risk score
function animateScore(targetScore) {
    let currentScore = 0;
    const increment = targetScore / 50;
    
    const scoreInterval = setInterval(() => {
        currentScore += increment;
        if (currentScore >= targetScore) {
            currentScore = targetScore;
            clearInterval(scoreInterval);
        }
        
        riskScore.textContent = Math.round(currentScore) + '%';
        
        // Update score circle color based on risk level - Retro Style
        const scoreCircle = document.querySelector('.score-circle');
        if (currentScore < 30) {
            scoreCircle.style.background = '#000080';
            scoreCircle.style.boxShadow = '0 0 20px #00ff00, inset 0 0 20px rgba(0, 255, 0, 0.3)';
        } else if (currentScore < 70) {
            scoreCircle.style.background = '#800080';
            scoreCircle.style.boxShadow = '0 0 20px #ffff00, inset 0 0 20px rgba(255, 255, 0, 0.3)';
        } else {
            scoreCircle.style.background = '#800000';
            scoreCircle.style.boxShadow = '0 0 20px #ff0000, inset 0 0 20px rgba(255, 0, 0, 0.3)';
        }
    }, 30);
}

// Create risk factor element
function createFactorElement(factor) {
    const element = document.createElement('div');
    element.className = 'factor-item';
    element.innerHTML = `
        <i class="${factor.icon}"></i>
        <span>${factor.text}</span>
    `;
    return element;
}

// Create recommendation element
function createRecommendationElement(rec) {
    const element = document.createElement('div');
    element.className = 'recommendation-item';
    element.innerHTML = `
        <i class="${rec.icon}"></i>
        <span>${rec.text}</span>
    `;
    return element;
}

// Show error message - Retro Style
function showError(message) {
    // Create error notification
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-notification';
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #c0c0c0;
        color: #000000;
        padding: 15px 20px;
        border: 2px outset #c0c0c0;
        box-shadow: 1px 1px 0px #ffffff, -1px -1px 0px #808080;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        font-family: 'Courier New', monospace;
        font-weight: bold;
    `;
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-circle" style="color: #ff0000; text-shadow: 0 0 5px #ff0000;"></i>
        ERROR: ${message}
    `;
    
    document.body.appendChild(errorDiv);
    
    // Remove after 5 seconds
    setTimeout(() => {
        errorDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(errorDiv);
        }, 300);
    }, 5000);
}

// Reset form
function resetForm() {
    telegramUrlInput.value = '';
    loadingState.classList.add('hidden');
    resultsSection.classList.add('hidden');
    memeImage.style.display = 'none';
    memeImage.src = '';
    
    // Hide modal memes
    const modalMemeImage1 = document.getElementById('modalMemeImage1');
    const modalMemeImage2 = document.getElementById('modalMemeImage2');
    const modalMemeImage3 = document.getElementById('modalMemeImage3');
    
    if (modalMemeImage1) modalMemeImage1.style.display = 'none';
    if (modalMemeImage2) modalMemeImage2.style.display = 'none';
    if (modalMemeImage3) modalMemeImage3.style.display = 'none';
    
    // Show main content window again
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.style.display = 'block';
        mainContent.classList.remove('hidden');
    }
    
    telegramUrlInput.focus();
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    telegramUrlInput.focus();
    
    // Add some example URLs for better UX
    const examples = document.querySelectorAll('.example-link');
    examples.forEach(example => {
        example.addEventListener('click', () => {
            telegramUrlInput.value = example.textContent;
            telegramUrlInput.focus();
        });
    });
});

// Add input validation styling
telegramUrlInput.addEventListener('input', () => {
    const isValid = isValidTelegramUrl(telegramUrlInput.value);
    const inputGroup = telegramUrlInput.closest('.input-group');
    
    if (telegramUrlInput.value && !isValid) {
        inputGroup.style.borderColor = '#e53e3e';
    } else {
        inputGroup.style.borderColor = '#e2e8f0';
    }
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to analyze
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        analyzeChannel();
    }
    
    // Escape to reset
    if (e.key === 'Escape') {
        resetForm();
    }
});

// Window control functions
function closeWindow() {
    if (confirm('Вы уверены, что хотите закрыть окно?')) {
        window.close();
    }
}

// Music control functions
let isMusicPlaying = false;
const sadMusic = document.getElementById('sadMusic');
const musicBtn = document.querySelector('.music-btn');

// Set music volume to 30%
sadMusic.volume = 0.3;

function toggleMusic() {
    if (isMusicPlaying) {
        sadMusic.pause();
        musicBtn.classList.remove('playing');
        musicBtn.innerHTML = '<i class="fas fa-music"></i> 🎻 Грустная скрипка';
        isMusicPlaying = false;
    } else {
        sadMusic.play().catch(e => {
            console.log('Автовоспроизведение заблокировано браузером:', e);
            alert('Нажмите на кнопку еще раз для воспроизведения музыки');
        });
        musicBtn.classList.add('playing');
        musicBtn.innerHTML = '<i class="fas fa-pause"></i> 🎻 Остановить музыку';
        isMusicPlaying = true;
    }
}

// Music will only play when user clicks the music button

// Modal window functions
function showModal(data) {
    const modalOverlay = document.getElementById('modalOverlay');
    const modalRiskScore = document.getElementById('modalRiskScore');
    const modalCreatedDate = document.getElementById('modalCreatedDate');
    const modalActivity = document.getElementById('modalActivity');
    const modalReputation = document.getElementById('modalReputation');
    const modalRiskFactors = document.getElementById('modalRiskFactors');
    const modalRecommendations = document.getElementById('modalRecommendations');
    
    // Update modal content
    modalRiskScore.textContent = data.riskScore + '%';
    modalCreatedDate.textContent = data.createdDate;
    modalActivity.textContent = data.activity;
    modalReputation.textContent = data.reputation;
    
        // Display 3 random memes
        const modalMemeImage1 = document.getElementById('modalMemeImage1');
        const modalMemeImage2 = document.getElementById('modalMemeImage2');
        const modalMemeImage3 = document.getElementById('modalMemeImage3');
        
        // Get 3 random memes
        const shuffledMemes = [...data.memes].sort(() => 0.5 - Math.random());
        const selectedMemes = shuffledMemes.slice(0, 3);
        
        modalMemeImage1.src = selectedMemes[0];
        modalMemeImage1.style.display = 'block';
        modalMemeImage2.src = selectedMemes[1];
        modalMemeImage2.style.display = 'block';
        modalMemeImage3.src = selectedMemes[2];
        modalMemeImage3.style.display = 'block';
    
    // Update risk factors
    modalRiskFactors.innerHTML = '';
    data.factors.forEach(factor => {
        const factorElement = createModalFactorElement(factor);
        modalRiskFactors.appendChild(factorElement);
    });
    
    // Update recommendations
    modalRecommendations.innerHTML = '';
    data.recommendations.forEach(rec => {
        const recElement = createModalRecommendationElement(rec);
        modalRecommendations.appendChild(recElement);
    });
    
    // Show modal
    modalOverlay.classList.remove('hidden');
    
    // Animate score
    animateModalScore(data.riskScore);
}

function closeModal() {
    const modalOverlay = document.getElementById('modalOverlay');
    modalOverlay.classList.add('hidden');
    
    // Show main content window again
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.style.display = 'block';
        mainContent.classList.remove('hidden');
    }
}

function createModalFactorElement(factor) {
    const element = document.createElement('div');
    element.className = 'modal-factor-item';
    element.innerHTML = `
        <i class="${factor.icon}"></i>
        <span>${factor.text}</span>
    `;
    return element;
}

function createModalRecommendationElement(rec) {
    const element = document.createElement('div');
    element.className = 'modal-recommendation-item';
    element.innerHTML = `
        <i class="${rec.icon}"></i>
        <span>${rec.text}</span>
    `;
    return element;
}

function animateModalScore(targetScore) {
    const modalScoreElement = document.getElementById('modalRiskScore');
    let currentScore = 0;
    const increment = targetScore / 50;
    
    const scoreInterval = setInterval(() => {
        currentScore += increment;
        if (currentScore >= targetScore) {
            currentScore = targetScore;
            clearInterval(scoreInterval);
        }
        
        modalScoreElement.textContent = Math.round(currentScore) + '%';
        
        // Update score circle color based on risk level
        const scoreCircle = document.querySelector('.modal-score-circle');
        if (currentScore < 30) {
            scoreCircle.style.background = '#000080';
            scoreCircle.style.boxShadow = '0 0 20px #00ff00, inset 0 0 20px rgba(0, 255, 0, 0.3)';
        } else if (currentScore < 70) {
            scoreCircle.style.background = '#800080';
            scoreCircle.style.boxShadow = '0 0 20px #ffff00, inset 0 0 20px rgba(255, 255, 0, 0.3)';
        } else {
            scoreCircle.style.background = '#800000';
            scoreCircle.style.boxShadow = '0 0 20px #ff0000, inset 0 0 20px rgba(255, 0, 0, 0.3)';
        }
    }, 30);
}

// Modal event listeners
document.addEventListener('DOMContentLoaded', () => {
    const modalAnalyzeAnotherBtn = document.getElementById('modalAnalyzeAnotherBtn');
    const modalOverlay = document.getElementById('modalOverlay');
    
    modalAnalyzeAnotherBtn.addEventListener('click', () => {
        closeModal();
        resetForm();
    });
    
    // Close modal when clicking outside
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modalOverlay.classList.contains('hidden')) {
            closeModal();
        }
    });
});

