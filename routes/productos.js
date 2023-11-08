const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, 
        validarCampos, 
        AdminRole } = require('../middlewares');

const { crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto } = require('../controllers/productos');

const { existeProducto, existeCategoria } = require('../helpers/db-validators');


const router = Router();


//obtener todas las productos - publico
router.get('/', obtenerProductos)

//obtener producto por id - publico
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
] , obtenerProducto)

//crear producto - privado - cualquier persona con token valido
router.post('/', [ 
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un ID válido').isMongoId(),
    check('categoria').custom(existeCategoria),
    validarCampos
 ], crearProducto)


//actualizar - privado - cualquiera con token valido
router.put('/:id', [
    validarJWT,
    //check('categoria', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
], actualizarProducto)


//borrar una producto - admin
router.delete('/:id', [
    validarJWT,
    AdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
], borrarProducto )


module.exports = router;