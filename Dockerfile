# Используем официальный образ Nginx
FROM nginx:alpine

# Устанавливаем рабочую директорию
WORKDIR /usr/share/nginx/html

# Копируем файлы проекта
COPY . .

# Копируем конфигурацию Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Создаем пользователя для безопасности
RUN addgroup -g 1001 -S nodejs && \
    adduser -S detector -u 1001

# Устанавливаем права
RUN chown -R detector:nodejs /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Открываем порт 80
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
