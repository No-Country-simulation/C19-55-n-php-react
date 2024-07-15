const express = require('express');


// Rutas
const usersRouter = require('./Routes/users');
const petsRouter = require('./Routes/pets');
const refugiosRouter = require('./Routes/refugios');


// Configuracion y Middlewares
const app = express();
app.use(express.json());


//Rutas
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/refugios', refugiosRouter);


//Iniciar Servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en ${PORT}`);
});