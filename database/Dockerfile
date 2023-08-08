FROM mysql:latest

# Environment variable to allow empty password
ENV MYSQL_ALLOW_EMPTY_PASSWORD=yes

# Copy the initialization script
COPY init.sql /docker-entrypoint-initdb.d/
