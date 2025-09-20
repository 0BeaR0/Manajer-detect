#!/bin/bash

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🐳 Развертывание с помощью Docker...${NC}"

# Проверка установки Docker
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker не установлен. Установите Docker и попробуйте снова.${NC}"
    echo -e "${YELLOW}Установка Docker:${NC}"
    echo -e "curl -fsSL https://get.docker.com -o get-docker.sh"
    echo -e "sudo sh get-docker.sh"
    exit 1
fi

# Проверка установки Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose не установлен. Установите Docker Compose и попробуйте снова.${NC}"
    echo -e "${YELLOW}Установка Docker Compose:${NC}"
    echo -e "sudo curl -L \"https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-\$(uname -s)-\$(uname -m)\" -o /usr/local/bin/docker-compose"
    echo -e "sudo chmod +x /usr/local/bin/docker-compose"
    exit 1
fi

# Создание директории для логов
echo -e "${YELLOW}📁 Создание директории для логов...${NC}"
mkdir -p logs

# Остановка существующих контейнеров
echo -e "${YELLOW}🛑 Остановка существующих контейнеров...${NC}"
docker-compose down

# Сборка образа
echo -e "${YELLOW}🔨 Сборка Docker образа...${NC}"
docker-compose build

# Запуск контейнеров
echo -e "${YELLOW}🚀 Запуск контейнеров...${NC}"
docker-compose up -d

# Проверка статуса
echo -e "${YELLOW}🔍 Проверка статуса контейнеров...${NC}"
docker-compose ps

# Получение IP адреса
SERVER_IP=$(curl -s ifconfig.me 2>/dev/null || echo "localhost")

echo -e "${GREEN}🎉 Развертывание завершено!${NC}"
echo -e "${BLUE}📱 Сайт доступен по адресу: http://$SERVER_IP${NC}"
echo -e "${BLUE}📱 Локально: http://localhost${NC}"
echo ""
echo -e "${YELLOW}📋 Полезные команды:${NC}"
echo -e "  Статус контейнеров: ${BLUE}docker-compose ps${NC}"
echo -e "  Логи: ${BLUE}docker-compose logs -f${NC}"
echo -e "  Остановка: ${BLUE}docker-compose down${NC}"
echo -e "  Перезапуск: ${BLUE}docker-compose restart${NC}"
echo -e "  Обновление: ${BLUE}docker-compose pull && docker-compose up -d${NC}"
