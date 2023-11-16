const Role = require('../models/role');
const {Usuario, Categoria, Producto} = require('../models')


const esRolValido = async (rol = '') =>{
    const existeRol = await Role.findOne({rol});
    if (!existeRol) {
        throw new Error (`El rol ${rol} no esta registrado en la BD`);
    }
}

const emailExiste = async (correo = '') =>{
    const existeEmail = await Usuario.findOne({correo});
    if (existeEmail){
        throw new Error (`El correo ${correo} ya esta registrado en la BD`);
    }
}

const existeUsuarioID = async ( id ) =>{
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario){
        throw new Error (`El id ${id} no existe`);
    }
}

const existeCategoria = async ( id ) =>{
    const catExist = await Categoria.findById(id);

    if(!catExist) {
        throw new Error (`La categoria ${id} no existe`)
    }
}

const existeProducto = async ( id ) =>{
    const prodExist = await Producto.findById(id);

    if(!prodExist) {
        throw new Error (`El producto ${id} no existe`)
    }
}

const coleccionesPermitidas = (coleccion = '', colecciones = []) =>{

    const incluida = colecciones.includes(coleccion);

    if( !incluida ){
        throw new Error (`La colección ${coleccion} no esta permitida, ${colecciones}`);
    }

    return true;
}


module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioID,
    existeCategoria,
    existeProducto,
    coleccionesPermitidas
}