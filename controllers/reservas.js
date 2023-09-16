//router: registra POST, GET, DELETE
const reservasRouter = require('express').Router();

//se registra lo que el usuario envie
reservasRouter.post('/', (request, response) => {
    //hago la consulta al json y el me extrae esos datos
    const { nombre, apellido, cedula, direccion, mesa, hora, fecha } = request.body;
    // console.log(request);
    console.log(nombre, apellido, cedula, direccion, mesa, hora, fecha);
});

module.exports = reservasRouter;
