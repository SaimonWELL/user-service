const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const axios = require('axios');

const app = express();
const port = 3001;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'user_db',
    password: 'mysecretpassword',
    port: 5432,
});

app.use(bodyParser.json());

// Создание пользователя
app.post('/users', async (req, res) => {
    const { name, email } = req.body;
    const client = await pool.connect();
    try {
        const result = await client.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email]);
        const user = result.rows[0];

        // Отправка события в сервис истории
        await axios.post('http://localhost:3000/events', {
            event: 'USER_CREATED',
            userId: user.id,
            timestamp: new Date(),
        });

        res.status(201).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        client.release();
    }
});

// Изменение пользователя
app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const client = await pool.connect();
    try {
        const result = await client.query('UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *', [name, email, id]);
        const user = result.rows[0];

        // Отправка события в сервис истории
        await axios.post('http://localhost:3000/events', {
            event: 'USER_UPDATED',
            userId: user.id,
            timestamp: new Date(),
        });

        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        client.release();
    }
});

// Получение списка пользователей
app.get('/users', async (req, res) => {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM users');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        client.release();
    }
});

app.listen(port, () => {
    console.log(`User service running on port ${port}`);
});
