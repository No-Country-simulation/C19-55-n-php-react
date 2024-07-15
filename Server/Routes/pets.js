const express = require('express');
const db = require('../Database/db');

const router = express.Router();

// GET /pets
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Mascotas');
        res.json(rows);
    } catch (error) {
        console.log(error);
        res.json({ error: error.message });
    }
});

// POST /pets
router.post('/register_pet', async (req, res) => {
    try {
        const { nombre, especie, raza, edad, refugio_id } = req.body;

        // Insertar la nueva mascota en la base de datos
        const [result] = await db.query('INSERT INTO Mascotas (nombre, especie, raza, edad, refugio_id) VALUES (?, ?, ?, ?, ?)', [nombre, especie, raza, edad, refugio_id]);

        res.json({ message: 'Mascota registrada exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al registrar mascota');
    }
});


module.exports = router;