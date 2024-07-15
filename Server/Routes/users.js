const express = require('express');
const db = require('../Database/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();
// GET /users
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Usuarios');
        res.json(rows);
    } catch (error) {
        console.log(error);
        res.json({ error: error.message });
    }
});

// POST /register
router.post('/register', async (req, res) => {
    try {
        const { nombre, correo, contraseña, direccion, celular, ciudad, pais, rol_id } = req.body;

        // Verificar si el correo ya está registrado
        const [existingUsers] = await db.query('SELECT * FROM Usuarios WHERE correo = ?', [correo]);
        if (existingUsers.length > 0) return res.status(400).send('El correo ya está registrado');

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(contraseña, 10);

        // Insertar el nuevo usuario en la base de datos
        const [result] = await db.query('INSERT INTO Usuarios (nombre, correo, contraseña, direccion, celular, ciudad, pais, rol_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [nombre, correo, hashedPassword, direccion, celular, ciudad, pais, rol_id]);

        res.json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al registrar usuario');
    }
});



// POST /login
router.post('/login', async (req, res) => {
    try {
        const { correo, contraseña } = req.body;

        // Comprobar correo
        const [users] = await db.query('SELECT * FROM Usuarios WHERE correo = ?', [correo]);
        if (users.length === 0) return res.status(400).send('Correo no encontrado');

        const userRecord = users[0];
        
        // Verificar la contraseña
        const passwordValid = await bcrypt.compare(contraseña, userRecord.contraseña);
        if (!passwordValid) return res.status(400).send('Contraseña incorrecta');

        // Crear token
        const token = jwt.sign({ id: userRecord.id_user, rol: userRecord.rol }, 'yourSecretKey', { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al iniciar sesión');
    }
});

module.exports = router;