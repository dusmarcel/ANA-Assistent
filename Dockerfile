FROM composer:2 AS composer

FROM php:8.2-apache

# Copy Composer binary
COPY --from=composer /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Tools required for Composer dist/source installs
RUN apt-get update \
    && apt-get install -y --no-install-recommends unzip git libzip-dev \
    && docker-php-ext-install zip \
    && rm -rf /var/lib/apt/lists/*

# Install PHP dependencies
COPY composer.json composer.lock ./
RUN composer install --no-dev --prefer-dist --no-interaction --optimize-autoloader

# Copy application files
COPY . ./

# Ensure the web server can write generated files
RUN chown -R www-data:www-data /var/www/html

EXPOSE 80
