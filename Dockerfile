FROM php:8.0-apache

# Set working directory
WORKDIR /var/www/html

# Bind the public directory from the host to the container's document root
VOLUME ["/var/www/html/public"]

# Open port 80 to allow external connections
EXPOSE 80