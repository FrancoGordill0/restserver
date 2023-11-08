const { Router } = require('express');
const { check } = require('express-validator');

//const { validarCampos } = require('../middlewares/validar-campos');
//const { validarJWT } = require('../middlewares/validar-jwt');
//const { AdminRole, tieneRole } = require('../middlewares/validar-roles');

const { 
        validarCampos, validarJWT, AdminRole, tieneRole 
} = require('../middlewares');

const { esRolValido, emailExiste, existeUsuarioID } = require('../helpers/db-validators');

const { usuariosGet, 
        usuariosPut, 
        usuariosPost, 
        usuariosDelete } = require('../controllers/usuarios');
        

const router = Router();


router.get('/', usuariosGet);


router.put('/:id', [
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(existeUsuarioID),
        check('rol').custom( esRolValido ),
        validarCampos
], usuariosPut); 


router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La password debe contar con 6 caracteres').isLength({min: 6}),
        check('correo', 'El correo no es válido').isEmail(),
        check('correo').custom(emailExiste),
        //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('rol').custom( esRolValido ),
        validarCampos  
], usuariosPost);
        

router.delete('/:id', [
        validarJWT,
        //AdminRole,
        tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(existeUsuarioID),
        validarCampos
],usuariosDelete);


module.exports = router;