const { response } = require("express");
const { Producto } = require('../models')


//obtenerProductos - paginado - total - populate
const obtenerProductos = async (req, res = response) =>{

    const {limite = 5, desde = 0} = req.query
    const query = {estado: true};

    
    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('usuario', 'nombre')
    ]);
    
    res.json({
        total,
        productos
    });
}

//obtenerProducto - populate {objeto de la categoria}
const obtenerProducto = async (req, res = response) =>{

    const { id } = req.params;
    const producto = await Producto.findById(id)
                            .populate('usuario', 'nombre')
                            .populate('categoria', 'nombre');

    res.json(producto);

}


const crearProducto = async (req, res = response) => {

    const {estado, usuario, ...body} = req.body;

    const productoDB = await Producto.findOne({ nombre: body.nombre });

    if( productoDB ) {
        return res.status(400).json({
            msg: `EL procuto ${ productoDB.nombre }, ya existe`
        });
    }

    //Data para almacenar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const producto = new Producto (data);

    //Guardar en db
    await producto.save();

    res.status(201).json(producto);

}

//actualizarProducto
const actualizarProducto = async (req, res = response) => {
    
    const { id } = req.params;

    const { estado, usuario, ...data } = req.body;


    if(data.nombre){
        data.nombre = data.nombre.toUpperCase();
    }

    data.usuario = req.usuario._id;

    const productoDB = await Producto.findByIdAndUpdate( id, data, {new: true} );
    
    res.json(productoDB);
}

//borrarProducto - estado: false
const borrarProducto = async (req, res = response) =>{

    const { id } = req.params;

    const productoDB = await Producto.findByIdAndUpdate(id, {estado: false}, {new: true});

    res.json({
        productoDB
    });
}


module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}