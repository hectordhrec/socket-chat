
class Usuarios{
    constructor(){
        this.personas = [];
    }

    agregarPersona(id, nombre, sala){
        let persona = {id, nombre, sala};
        this.personas.push(persona);
        return this.personas;
    }

    getPersona(id){
        let persona = this.personas.filter(persona=> persona.id===id)[0];
        return persona;
        // lo mismo
        // let persona = this.personas.filter(persona=>{
        //     return persona.id=id
        // })[0];
        // si no encuentra una persona retorna undefine o null
    }

    getPersonas(){
        return this.personas;
    }

    getPersonasPorSala(sala){
        let personasEnSala = this.personas.filter(persona=>{
            return persona.sala===sala;
        });
        return personasEnSala;
    }

    borrarPersona(id){
        let personaBorrada = this.getPersona(id);
        // filter devuelve un nuevo arreglo con los elementos que cumplen la condición
        this.personas = this.personas.filter( personas => {
            return personas.id!==id;
        });
        return personaBorrada;
    }
}

module.exports = {
    Usuarios
}