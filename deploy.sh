#!/bin/bash

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Начинаем развертывание Детектора подозрительных менеджеров...${NC}"

# Проверка прав root
if [ "$EUID" -ne 0 ]; then
    echo -e "${RED}❌ Запустите скрипт с правами root (sudo)${NC}"
    exit 1
fi

# Переменные
APP_NAME="detector"
APP_DIR="/var/www/$APP_NAME"
SERVICE_FILE="/etc/systemd/system/$APP_NAME.service"
NGINX_SITE="/etc/nginx/sites-available/$APP_NAME"

echo -e "${YELLOW}📋 Проверка системы...${NC}"

# Обновление системы
echo -e "${YELLOW}🔄 Обновление системы...${NC}"
apt update && apt upgrade -y

# Установка необходимых пакетов
echo -e "${YELLOW}📦 Установка пакетов...${NC}"
apt install -y nginx nodejs npm git curl wget unzip

# Создание пользователя
echo -e "${YELLOW}👤 Создание пользователя...${NC}"
if ! id "$APP_NAME" &>/dev/null; then
    useradd --system --group --home $APP_DIR $APP_NAME
    echo -e "${GREEN}✅ Пользователь $APP_NAME создан${NC}"
else
    echo -e "${YELLOW}⚠️  Пользователь $APP_NAME уже существует${NC}"
fi

# Создание директории приложения
echo -e "${YELLOW}📁 Создание директории приложения...${NC}"
mkdir -p $APP_DIR
chown -R $APP_NAME:$APP_NAME $APP_DIR

# Копирование файлов (предполагается, что скрипт запущен из папки проекта)
echo -e "${YELLOW}📋 Копирование файлов...${NC}"
cp -r . $APP_DIR/
chown -R $APP_NAME:$APP_NAME $APP_DIR

# Установка зависимостей Node.js
echo -e "${YELLOW}📦 Установка зависимостей Node.js...${NC}"
cd $APP_DIR
sudo -u $APP_NAME npm init -y
sudo -u $APP_NAME npm install express compression helmet

# Создание systemd сервиса
echo -e "${YELLOW}⚙️  Создание systemd сервиса...${NC}"
cat > $SERVICE_FILE << EOF
[Unit]
Description=Detector Suspicious Managers
After=network.target

[Service]
Type=simple
User=$APP_NAME
WorkingDirectory=$APP_DIR
ExecStart=/usr/bin/node server.js
Restart=always
RestartSec=10
Environment=NODE_ENV=production
Environment=PORT=3000

[Install]
WantedBy=multi-user.target
EOF

# Настройка Nginx
echo -e "${YELLOW}🌐 Настройка Nginx...${NC}"
cat > $NGINX_SITE << EOF
server {
    listen 80;
    server_name _;
    
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
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Активация сайта
echo -e "${YELLOW}🔗 Активация сайта...${NC}"
ln -sf $NGINX_SITE /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Проверка конфигурации Nginx
echo -e "${YELLOW}🔍 Проверка конфигурации Nginx...${NC}"
if nginx -t; then
    echo -e "${GREEN}✅ Конфигурация Nginx корректна${NC}"
else
    echo -e "${RED}❌ Ошибка в конфигурации Nginx${NC}"
    exit 1
fi

# Перезапуск сервисов
echo -e "${YELLOW}🔄 Перезапуск сервисов...${NC}"
systemctl daemon-reload
systemctl enable $APP_NAME
systemctl start $APP_NAME
systemctl restart nginx

# Проверка статуса
echo -e "${YELLOW}🔍 Проверка статуса сервисов...${NC}"
if systemctl is-active --quiet $APP_NAME; then
    echo -e "${GREEN}✅ Сервис $APP_NAME запущен${NC}"
else
    echo -e "${RED}❌ Ошибка запуска сервиса $APP_NAME${NC}"
    systemctl status $APP_NAME
fi

if systemctl is-active --quiet nginx; then
    echo -e "${GREEN}✅ Nginx запущен${NC}"
else
    echo -e "${RED}❌ Ошибка запуска Nginx${NC}"
    systemctl status nginx
fi

# Получение IP адреса
SERVER_IP=$(curl -s ifconfig.me)

echo -e "${GREEN}🎉 Развертывание завершено!${NC}"
echo -e "${BLUE}📱 Сайт доступен по адресу: http://$SERVER_IP${NC}"
echo -e "${BLUE}📱 Локально: http://localhost${NC}"
echo ""
echo -e "${YELLOW}📋 Полезные команды:${NC}"
echo -e "  Статус сервиса: ${BLUE}sudo systemctl status $APP_NAME${NC}"
echo -e "  Логи сервиса: ${BLUE}sudo journalctl -u $APP_NAME -f${NC}"
echo -e "  Перезапуск: ${BLUE}sudo systemctl restart $APP_NAME${NC}"
echo -e "  Логи Nginx: ${BLUE}sudo tail -f /var/log/nginx/access.log${NC}"
echo ""
echo -e "${YELLOW}🔒 Для настройки SSL сертификата:${NC}"
echo -e "  ${BLUE}sudo apt install certbot python3-certbot-nginx${NC}"
echo -e "  ${BLUE}sudo certbot --nginx -d your-domain.com${NC}"
