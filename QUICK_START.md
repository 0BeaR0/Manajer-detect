# ⚡ Быстрый старт на сервере

## 🚀 Варианты развертывания

### 1. Автоматическое развертывание (Рекомендуется)

```bash
# Скачайте проект на сервер
git clone https://github.com/yourusername/detector-suspicious-managers.git
cd detector-suspicious-managers

# Запустите автоматический скрипт
sudo ./deploy.sh
```

### 2. Docker развертывание

```bash
# Скачайте проект на сервер
git clone https://github.com/yourusername/detector-suspicious-managers.git
cd detector-suspicious-managers

# Запустите Docker развертывание
./docker-deploy.sh
```

### 3. Ручное развертывание

```bash
# 1. Установите Nginx и Node.js
sudo apt update
sudo apt install nginx nodejs npm

# 2. Скопируйте файлы
sudo cp -r . /var/www/detector
sudo chown -R www-data:www-data /var/www/detector

# 3. Настройте Nginx
sudo nano /etc/nginx/sites-available/detector
# Скопируйте содержимое из SERVER_DEPLOY.md

# 4. Активируйте сайт
sudo ln -s /etc/nginx/sites-available/detector /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
```

## 🔧 После развертывания

### Проверка работоспособности
```bash
# Проверьте статус сервисов
sudo systemctl status nginx
sudo systemctl status detector  # если используете Node.js

# Проверьте логи
sudo journalctl -u detector -f
sudo tail -f /var/log/nginx/access.log
```

### Настройка SSL (Let's Encrypt)
```bash
# Установите Certbot
sudo apt install certbot python3-certbot-nginx

# Получите сертификат
sudo certbot --nginx -d your-domain.com

# Автоматическое обновление
sudo crontab -e
# Добавьте: 0 12 * * * /usr/bin/certbot renew --quiet
```

## 📱 Доступ к сайту

После развертывания сайт будет доступен по адресу:
- **HTTP**: `http://your-server-ip`
- **HTTPS**: `https://your-domain.com` (после настройки SSL)

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

### Docker контейнеры
```bash
# Статус
docker-compose ps

# Запуск
docker-compose up -d

# Остановка
docker-compose down

# Логи
docker-compose logs -f

# Перезапуск
docker-compose restart
```

## 🔍 Устранение неполадок

### Сайт не загружается
1. Проверьте статус сервисов
2. Проверьте логи на ошибки
3. Убедитесь, что порт 80 открыт в файрволе

### Ошибка 502 Bad Gateway
1. Проверьте, что Node.js сервис запущен
2. Проверьте порт 3000: `sudo netstat -tlnp | grep :3000`

### Проблемы с правами доступа
```bash
sudo chown -R www-data:www-data /var/www/detector
sudo chmod -R 755 /var/www/detector
```

## 📊 Мониторинг

### Проверка ресурсов
```bash
# Использование CPU и памяти
htop

# Использование диска
df -h

# Сетевые соединения
sudo netstat -tlnp
```

### Логи
```bash
# Nginx логи
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Systemd логи
sudo journalctl -u detector -f
```

## 🔄 Обновление

### Автоматическое обновление
```bash
cd /var/www/detector
sudo git pull origin main
sudo systemctl restart detector
```

### Docker обновление
```bash
docker-compose pull
docker-compose up -d
```

---

**Готово! Ваш сайт работает на сервере! 🎉**
