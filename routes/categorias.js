const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, 
        validarCampos, 
        AdminRole } = require('../middlewares');

const { crearCategoria, 
        obtenerCategorias, 
        borrarCategoria, 
        actualizarCategoria,
        obtenerCategoria } = require('../controllers/categorias');

const { existeCategoria} = require('../helpers/db-validators');


const router = Router();


//obtener todas las categorias - publico
router.get('/', obtenerCategorias)

//obtener categoria por id - publico
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
] , obtenerCategoria)

//crear categoria - privado - cualquier persona con token valido
router.post('/', [ 
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
 ], crearCategoria)


//actualizar - privado - cualquiera con token valido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoria),
    validarCampos  
], actualizarCategoria)


//borrar una categoria - admin
router.delete('/:id', [
    validarJWT,
    AdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
], borrarCategoria )


module.exports = router;