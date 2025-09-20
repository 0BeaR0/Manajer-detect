# 🚀 Инструкции для развертывания на сервере 217.196.100.86

## 📋 Данные сервера
- **IP-адрес**: 217.196.100.86
- **Домен**: home.com
- **Пользователь**: anton.bobylenkoff@gmail.com
- **Пароль сервера**: FQ9d3vxvk0WX
- **Пароль пользователя**: 4Ys3A11QYj2X

## 🔧 Подготовка сервера

### 1. Подключение к серверу
```bash
ssh anton.bobylenkoff@gmail.com@217.196.100.86
# Введите пароль: 4Ys3A11QYj2X
```

### 2. Обновление системы
```bash
sudo apt update && sudo apt upgrade -y
```

### 3. Установка необходимых пакетов
```bash
sudo apt install -y nginx nodejs npm git curl wget unzip
```

## 📁 Загрузка проекта

### Вариант 1: Через Git (если репозиторий публичный)
```bash
cd /tmp
git clone https://github.com/yourusername/detector-suspicious-managers.git
cd detector-suspicious-managers
```

### Вариант 2: Загрузка архива
```bash
# Создайте архив на локальной машине:
# tar -czf detector-project.tar.gz --exclude='.git' --exclude='node_modules' .

# Загрузите на сервер через SCP:
# scp detector-project.tar.gz anton.bobylenkoff@gmail.com@217.196.100.86:/tmp/

# На сервере распакуйте:
cd /tmp
tar -xzf detector-project.tar.gz
cd detector-suspicious-managers
```

### Вариант 3: Создание файлов вручную
```bash
# Создайте директорию проекта
sudo mkdir -p /var/www/detector
cd /var/www/detector

# Создайте файлы проекта (скопируйте содержимое из локальных файлов)
```

## 🚀 Автоматическое развертывание

### 1. Сделайте скрипт исполняемым
```bash
chmod +x deploy.sh
```

### 2. Запустите развертывание
```bash
sudo ./deploy.sh
```

## 🐳 Docker развертывание (альтернатива)

### 1. Установка Docker
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
```

### 2. Установка Docker Compose
```bash
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 3. Запуск с Docker
```bash
chmod +x docker-deploy.sh
./docker-deploy.sh
```

## 🌐 Настройка домена

### 1. Настройка DNS
Убедитесь, что домен `home.com` указывает на IP `217.196.100.86`

### 2. Обновление конфигурации Nginx
```bash
sudo nano /etc/nginx/sites-available/detector
```

Замените `_` на `home.com`:
```nginx
server {
    listen 80;
    server_name home.com www.home.com;
    # ... остальная конфигурация
}
```

### 3. Перезапуск Nginx
```bash
sudo nginx -t
sudo systemctl restart nginx
```

## 🔒 Настройка SSL сертификата

### 1. Установка Certbot
```bash
sudo apt install certbot python3-certbot-nginx
```

### 2. Получение сертификата
```bash
sudo certbot --nginx -d home.com -d www.home.com
```

### 3. Автоматическое обновление
```bash
sudo crontab -e
# Добавьте строку:
# 0 12 * * * /usr/bin/certbot renew --quiet
```

## 🔍 Проверка развертывания

### 1. Проверка статуса сервисов
```bash
sudo systemctl status nginx
sudo systemctl status detector  # если используете Node.js
```

### 2. Проверка портов
```bash
sudo netstat -tlnp | grep :80
sudo netstat -tlnp | grep :443
sudo netstat -tlnp | grep :3000  # если используете Node.js
```

### 3. Проверка логов
```bash
sudo journalctl -u detector -f  # логи приложения
sudo tail -f /var/log/nginx/access.log  # логи Nginx
sudo tail -f /var/log/nginx/error.log  # ошибки Nginx
```

### 4. Тестирование сайта
```bash
curl -I http://217.196.100.86
curl -I http://home.com
curl -I https://home.com  # после настройки SSL
```

## 🛠 Управление сервисом

### Node.js сервис
```bash
# Статус
sudo systemctl status detector

# Запуск
sudo systemctl start detector

# Остановка
sudo systemctl stop detector

# Перезапуск
sudo systemctl restart detector

# Логи
sudo journalctl -u detector -f
```

### Nginx
```bash
# Перезапуск
sudo systemctl restart nginx

# Перезагрузка конфигурации
sudo nginx -s reload

# Проверка конфигурации
sudo nginx -t
```

## 🔄 Обновление проекта

### 1. Остановка сервиса
```bash
sudo systemctl stop detector
```

### 2. Обновление файлов
```bash
cd /var/www/detector
sudo git pull origin main  # если используете Git
# или загрузите новые файлы
```

### 3. Перезапуск сервиса
```bash
sudo systemctl start detector
```

## 🚨 Устранение неполадок

### Сайт не загружается
1. Проверьте статус сервисов: `sudo systemctl status nginx detector`
2. Проверьте логи: `sudo journalctl -u detector -f`
3. Проверьте файрвол: `sudo ufw status`

### Ошибка 502 Bad Gateway
1. Проверьте, что Node.js сервис запущен: `sudo systemctl status detector`
2. Проверьте порт 3000: `sudo netstat -tlnp | grep :3000`
3. Проверьте логи: `sudo journalctl -u detector -f`

### Проблемы с правами доступа
```bash
sudo chown -R www-data:www-data /var/www/detector
sudo chmod -R 755 /var/www/detector
```

## 📊 Мониторинг

### Проверка ресурсов
```bash
htop  # использование CPU и памяти
df -h  # использование диска
free -h  # использование памяти
```

### Проверка сетевых соединений
```bash
sudo netstat -tlnp  # открытые порты
sudo ss -tlnp  # альтернатива netstat
```

## 🎯 Ожидаемый результат

После успешного развертывания:
- Сайт будет доступен по адресу: `http://home.com`
- HTTPS версия: `https://home.com` (после настройки SSL)
- Все функции будут работать: анализ, модальные окна, анимации
- Сайт будет оптимизирован и безопасен

---

**Удачного развертывания! 🚀**
