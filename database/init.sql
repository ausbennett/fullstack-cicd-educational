CREATE DATABASE volleyball;

USE volleyball;

CREATE TABLE IF NOT EXISTS teams (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    score INT NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL
);

INSERT INTO teams (id, name, score, createdAt, updatedAt) VALUES
(1, 'Empire Spikes Back', 10, '2023-07-30 21:28:21', '2023-07-30 21:28:21'),
(2, 'Sets on the Beach', 5, '2023-07-30 21:28:27', '2023-07-30 21:28:27'),
(3, 'Kiss My Ace', 7, '2023-07-30 21:28:43', '2023-07-30 21:28:43'),
(4, 'Austins Team', 0, '2023-08-07 22:02:15', '2023-08-07 22:02:15');
