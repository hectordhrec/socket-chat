const { io } = require('../server');
const {Usuarios} = require('../classes/usuario');
const usuarios = new Usuarios();
const {crearMensaje} = require('../utilidades/utilidades');


io.on('connection', (client) => {


    client.on('entrarChat',(data,callback)=>{
        if(!data.nombre || !data.sala){
            return callback({
                err: true,
                message: 'El nombre/sala es necesario'
            });
        }
        client.join(data.sala);
        usuarios.agregarPersona(client.id, data.nombre, data.sala);
        client.broadcast.to(data.sala).emit('listaPersonas',usuarios.getPersonasPorSala(data.sala));
        client.broadcast.to(data.sala).emit('crearMensaje',crearMensaje('Administrador',`${data.nombre} se unió al chat`));
        callback(usuarios.getPersonasPorSala(data.sala));
    });

    client.on('crearMensaje',(data, callback)=>{
        let persona = usuarios.getPersona(client.id);
        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje',mensaje);
        callback(mensaje);
    });

    client.on('disconnect', ()=>{
        let personaBorrada = usuarios.borrarPersona(client.id);
        client.broadcast.to(personaBorrada.sala).emit('crearMensaje',crearMensaje('Administrador',`${personaBorrada.nombre} abandonó el chat`));
        client.broadcast.to(personaBorrada.sala).emit('listaPersonas',usuarios.getPersonasPorSala(personaBorrada.sala));
    });

    // Mensajes privados
    client.on('mensajePrivado', (data) => {
        let persona = usuarios.getPersona(client.id);
        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(data.para).emit('mensajePrivado',mensaje);
    });

});