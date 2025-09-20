# 🖥️ Развертывание на собственном сервере

Этот документ содержит подробные инструкции по развертыванию проекта "Детектор подозрительных менеджеров" на вашем собственном сервере.

## 📋 Требования к серверу

### Минимальные требования
- **ОС**: Ubuntu 20.04+ / CentOS 7+ / Debian 10+
- **RAM**: 512MB (рекомендуется 1GB+)
- **CPU**: 1 ядро (рекомендуется 2+)
- **Диск**: 1GB свободного места
- **Сеть**: Статический IP адрес

### Рекомендуемые требования
- **ОС**: Ubuntu 22.04 LTS
- **RAM**: 2GB+
- **CPU**: 2+ ядра
- **Диск**: 10GB+ SSD
- **Сеть**: Статический IP + домен

## 🚀 Варианты развертывания

### 1. Nginx + Node.js (Рекомендуется)

#### Установка Nginx
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nginx

# CentOS/RHEL
sudo yum install nginx
# или
sudo dnf install nginx

# Запуск и автозапуск
sudo systemctl start nginx
sudo systemctl enable nginx
```

#### Установка Node.js
```bash
# Установка Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Проверка установки
node --version
npm --version
```

#### Настройка проекта
```bash
# Создание пользователя для приложения
sudo adduser --system --group --home /var/www/detector detector

# Копирование файлов проекта
sudo cp -r /path/to/your/project/* /var/www/detector/
sudo chown -R detector:detector /var/www/detector
```

#### Создание systemd сервиса
```bash
sudo nano /etc/systemd/system/detector.service
```

Содержимое файла:
```ini
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
```

#### Создание Node.js сервера
```bash
sudo nano /var/www/detector/server.js
```

Содержимое файла:
```javascript
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Статические файлы
app.use(express.static(path.join(__dirname)));

// Сжатие
const compression = require('compression');
app.use(compression());

// Безопасность
const helmet = require('helmet');
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'", "https://cdnjs.cloudflare.com"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
}));

// Кэширование
app.use((req, res, next) => {
  if (req.url.match(/\.(css|js|png|jpg|jpeg|gif|ico|svg)$/)) {
    res.setHeader('Cache-Control', 'public, max-age=31536000');
  }
  next();
});

// Главная страница
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Обработка всех остальных маршрутов
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

#### Установка зависимостей
```bash
cd /var/www/detector
sudo -u detector npm init -y
sudo -u detector npm install express compression helmet
```

#### Настройка Nginx
```bash
sudo nano /etc/nginx/sites-available/detector
```

Содержимое файла:
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    
    # Редирект на HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com www.your-domain.com;
    
    # SSL сертификаты
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    
    # SSL настройки
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    
    # Безопасность
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    
    # Сжатие
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
    
    # Кэширование
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
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
```

#### Активация сайта
```bash
# Создание символической ссылки
sudo ln -s /etc/nginx/sites-available/detector /etc/nginx/sites-enabled/

# Удаление дефолтного сайта
sudo rm /etc/nginx/sites-enabled/default

# Проверка конфигурации
sudo nginx -t

# Перезапуск сервисов
sudo systemctl restart nginx
sudo systemctl start detector
sudo systemctl enable detector
```

### 2. Apache + PHP

#### Установка Apache
```bash
# Ubuntu/Debian
sudo apt install apache2

# CentOS/RHEL
sudo yum install httpd
# или
sudo dnf install httpd

# Запуск и автозапуск
sudo systemctl start apache2  # или httpd
sudo systemctl enable apache2  # или httpd
```

#### Настройка виртуального хоста
```bash
sudo nano /etc/apache2/sites-available/detector.conf
```

Содержимое файла:
```apache
<VirtualHost *:80>
    ServerName your-domain.com
    ServerAlias www.your-domain.com
    DocumentRoot /var/www/detector
    
    # Редирект на HTTPS
    RewriteEngine On
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</VirtualHost>

<VirtualHost *:443>
    ServerName your-domain.com
    ServerAlias www.your-domain.com
    DocumentRoot /var/www/detector
    
    # SSL сертификаты
    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/your-domain.com/cert.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/your-domain.com/privkey.pem
    SSLCertificateChainFile /etc/letsencrypt/live/your-domain.com/chain.pem
    
    # Безопасность
    Header always set X-Frame-Options DENY
    Header always set X-Content-Type-Options nosniff
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
    
    # Сжатие
    LoadModule deflate_module modules/mod_deflate.so
    <Location />
        SetOutputFilter DEFLATE
        SetEnvIfNoCase Request_URI \
            \.(?:gif|jpe?g|png)$ no-gzip dont-vary
        SetEnvIfNoCase Request_URI \
            \.(?:exe|t?gz|zip|bz2|sit|rar)$ no-gzip dont-vary
    </Location>
    
    # Кэширование
    <IfModule mod_expires.c>
        ExpiresActive On
        ExpiresByType text/css "access plus 1 year"
        ExpiresByType application/javascript "access plus 1 year"
        ExpiresByType image/png "access plus 1 year"
        ExpiresByType image/jpg "access plus 1 year"
        ExpiresByType image/jpeg "access plus 1 year"
        ExpiresByType image/gif "access plus 1 year"
        ExpiresByType image/svg+xml "access plus 1 year"
    </IfModule>
</VirtualHost>
```

#### Активация сайта
```bash
# Включение модулей
sudo a2enmod rewrite
sudo a2enmod ssl
sudo a2enmod headers
sudo a2enmod deflate
sudo a2enmod expires

# Активация сайта
sudo a2ensite detector.conf

# Перезапуск Apache
sudo systemctl restart apache2
```

### 3. Docker (Простой способ)

#### Создание Dockerfile
```bash
nano Dockerfile
```

Содержимое файла:
```dockerfile
FROM nginx:alpine

# Копирование файлов
COPY . /usr/share/nginx/html/

# Настройка Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Открытие порта
EXPOSE 80

# Запуск Nginx
CMD ["nginx", "-g", "daemon off;"]
```

#### Создание nginx.conf
```bash
nano nginx.conf
```

Содержимое файла:
```nginx
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;
    
    sendfile        on;
    keepalive_timeout  65;
    
    # Сжатие
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
    
    server {
        listen       80;
        server_name  localhost;
        root         /usr/share/nginx/html;
        index        index.html;
        
        # Кэширование
        location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
        
        # SPA поддержка
        location / {
            try_files $uri $uri/ /index.html;
        }
    }
}
```

#### Создание docker-compose.yml
```bash
nano docker-compose.yml
```

Содержимое файла:
```yaml
version: '3.8'

services:
  detector:
    build: .
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./ssl:/etc/nginx/ssl:ro
    restart: unless-stopped
    environment:
      - TZ=Europe/Moscow
```

#### Запуск с Docker
```bash
# Сборка образа
docker build -t detector .

# Запуск контейнера
docker run -d -p 80:80 --name detector-app detector

# Или с docker-compose
docker-compose up -d
```

## 🔒 SSL сертификат (Let's Encrypt)

### Установка Certbot
```bash
# Ubuntu/Debian
sudo apt install certbot python3-certbot-nginx
# или для Apache
sudo apt install certbot python3-certbot-apache

# CentOS/RHEL
sudo yum install certbot python3-certbot-nginx
# или
sudo dnf install certbot python3-certbot-nginx
```

### Получение сертификата
```bash
# Для Nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Для Apache
sudo certbot --apache -d your-domain.com -d www.your-domain.com

# Автоматическое обновление
sudo crontab -e
# Добавьте строку:
# 0 12 * * * /usr/bin/certbot renew --quiet
```

## 🔧 Настройка файрвола

### UFW (Ubuntu)
```bash
# Установка
sudo apt install ufw

# Настройка
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443

# Включение
sudo ufw enable
```

### FirewallD (CentOS/RHEL)
```bash
# Настройка
sudo firewall-cmd --permanent --add-service=ssh
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https

# Перезагрузка
sudo firewall-cmd --reload
```

## 📊 Мониторинг и логи

### Просмотр логов
```bash
# Nginx логи
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Apache логи
sudo tail -f /var/log/apache2/access.log
sudo tail -f /var/log/apache2/error.log

# Systemd логи
sudo journalctl -u detector -f
```

### Мониторинг ресурсов
```bash
# Установка htop
sudo apt install htop

# Мониторинг
htop
```

## 🚀 Автоматическое развертывание

### Скрипт развертывания
```bash
nano deploy.sh
```

Содержимое файла:
```bash
#!/bin/bash

echo "🚀 Начинаем развертывание..."

# Остановка сервисов
sudo systemctl stop detector

# Резервное копирование
sudo cp -r /var/www/detector /var/www/detector.backup.$(date +%Y%m%d_%H%M%S)

# Обновление кода
cd /var/www/detector
sudo git pull origin main

# Установка зависимостей
sudo -u detector npm install

# Перезапуск сервисов
sudo systemctl start detector
sudo systemctl reload nginx

echo "✅ Развертывание завершено!"
```

### Настройка прав
```bash
chmod +x deploy.sh
```

## 🔍 Проверка работоспособности

### Тестирование
```bash
# Проверка статуса сервисов
sudo systemctl status nginx
sudo systemctl status detector

# Проверка портов
sudo netstat -tlnp | grep :80
sudo netstat -tlnp | grep :443
sudo netstat -tlnp | grep :3000

# Тестирование HTTP
curl -I http://your-domain.com
curl -I https://your-domain.com
```

### Нагрузочное тестирование
```bash
# Установка Apache Bench
sudo apt install apache2-utils

# Тестирование
ab -n 1000 -c 10 http://your-domain.com/
```

## 🛠 Устранение неполадок

### Частые проблемы

1. **Сайт не загружается**
   - Проверьте статус сервисов: `sudo systemctl status nginx`
   - Проверьте логи: `sudo journalctl -u nginx -f`

2. **Ошибка 502 Bad Gateway**
   - Проверьте, что Node.js сервер запущен: `sudo systemctl status detector`
   - Проверьте порт 3000: `sudo netstat -tlnp | grep :3000`

3. **SSL ошибки**
   - Проверьте сертификат: `sudo certbot certificates`
   - Обновите сертификат: `sudo certbot renew`

4. **Проблемы с правами**
   - Проверьте владельца файлов: `ls -la /var/www/detector`
   - Исправьте права: `sudo chown -R detector:detector /var/www/detector`

## 📋 Чек-лист развертывания

- [ ] Сервер настроен и обновлен
- [ ] Nginx/Apache установлен и настроен
- [ ] Node.js установлен (если используется)
- [ ] Файлы проекта скопированы
- [ ] SSL сертификат получен
- [ ] Файрвол настроен
- [ ] Сервисы запущены и работают
- [ ] Домен настроен и указывает на сервер
- [ ] Сайт доступен по HTTPS
- [ ] Мониторинг настроен

---

**Удачного развертывания! 🚀**
