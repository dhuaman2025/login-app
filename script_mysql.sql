CREATE DATABASE IF NOT EXISTS login_app CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
CREATE TABLE IF NOT EXISTS login_app.users (
id INT AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(50) NOT NULL UNIQUE,
email VARCHAR(100) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- (opcional) crear un usuario MySQL para la aplicación
-- REPLACE 'nodeuser' y 'nodepass' por credenciales seguras
CREATE USER IF NOT EXISTS 'nodeuser'@'localhost' IDENTIFIED BY 'nodepass';
GRANT ALL PRIVILEGES ON login_app.* TO 'nodeuser'@'localhost';
FLUSH PRIVILEGES;


USE login_app;

INSERT INTO users (username, email, password) VALUES ('juanperez', 'juanperez@email.com', '$2b$10$EG1cwQ.U9AYlLeZW62Jl8uXQELLLto7HUE7d46c.DYjtTJdIKxBY6');
INSERT INTO users (username, email, password) VALUES ('maria_gomez', 'maria@email.com', '$2b$10$55aOTa6rHYsiDTke/S6O0OHYhGB.gr5nruC6mrtvSKFAfdqwTVgr2');
INSERT INTO users (username, email, password) VALUES ('carlos89', 'carlos@email.com', '$2b$10$QVncFDZif5NhOD1cTSOOvesXtapSaGUvb.Mgj4EEKj0BPWKMDATl.');

| Usuario     | Email                                             | Contraseña |
| ----------- | ------------------------------------------------- | ---------- |
| juanperez   | [juanperez@email.com](mailto:juanperez@email.com) | 123456     |
| maria_gomez | [maria@email.com](mailto:maria@email.com)         | abcdef     |
| carlos89    | [carlos@email.com](mailto:carlos@email.com)       | pass1234   |


-- usuario: pepegonzales  y clave : 123