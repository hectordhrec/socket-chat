var socket = io();

var params = new URLSearchParams(window.location.search);

if(!params.has('nombre') || !params.has('sala')){
    window.location = 'index.html';
    throw new Error('El nombre es necesario');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat',usuario,function(resp) {
        //console.log('usuarios conectados', resp);
        renderizarUsuarios(resp);
    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('crearMensaje', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crearMensaje', function(mensaje) {
    renderizarMensajes(mensaje, false);
    scrollBottom();
    //console.log('Servidor:', mensaje);

});

// Escuchar  cambios de usuarios (cuando un ususario sale o entra)
socket.on('listaPersonas', function(personas) {
    //console.log(personas);
    renderizarUsuarios(personas);
});

// Mensajes privados
socket.on('mensajePrivado', function(mensaje) {
    console.log(mensaje);
});