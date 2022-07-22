import { response, request } from 'express';
import bcryptjs from 'bcryptjs';
import User from '../models/userModel.js';
import generateJWT from '../helpers/JWTgenerator.js';

const login = async (req = request, res = response) => {
	const { email, password } = req.body;

	try {
		// Verificar si el email existe
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({ msg: 'Usuario o contraseña incorrectas' });
		}

		// Verificar si el usuario está activo
		if (!user.state) {
			return res.status(403).json({ msg: 'El usuario no está activo' });
		}

		// Verificar contraseña
		const validPassword = bcryptjs.compareSync(password, user.password);
		if (!validPassword) {
			return res.status(401).json({ msg: 'Usuario o contraseña incorrectas' });
		}

		// Generar un JWT con el id del usuario
		const token = await generateJWT(user._id);

		// Responder con el token
		res.json({
			user,
			token,
		});
	} catch (err) {
		res.status(500).json({ msg: 'Error al intentar iniciar sesión' });
	}
};

export default login;
