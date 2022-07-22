import { Router } from 'express';
import {
	userPost,
	userPut,
	usersGet,
	userGet,
	userDelete,
} from '../controllers/userControllers.js';
import validateFields from '../middlewares/validate-fields.js';
import { check } from 'express-validator';

const userRouter = Router();

// Obtener todos los usuarios
userRouter.get('/', usersGet);
// Obtener un usuario
userRouter.get('/:id', userGet);

userRouter.post(
	'/register',
	[
		check('name', 'El nombre es obligatorio').not().isEmpty(),
		check('surname', 'El apellido es obligatorio').not().isEmpty(),
		check('email', 'El email es obligatorio').not().isEmpty(),
		check('email', 'No es un email valido').isEmail(),
		check('password', 'La contraseña es obligatoria').not().isEmpty(),
		check(
			'password',
			'La contraseña debe tener al menos 6 caracteres'
		).isLength({ min: 6 }),
		validateFields,
	],
	userPost
);

// Actualizar un usuario
userRouter.put(
	'/update/:id',
	[
		check('id', 'El id es obligatorio').not().isEmpty(),
		check('id', 'No es un id valido').isMongoId(),
		check('role', 'No es un rol valido').isIn(['USER_ROLE', 'ADMIN_ROLE']),
	],
	userPut
);

// Eliminar un usuario
userRouter.delete(
	'/delete/:id',
	[
		check('id', 'El id es obligatorio').not().isEmpty(),
		check('id', 'No es un id valido').isMongoId(),
		validateFields,
	],
	userDelete
);

export default userRouter;
