import { request, response } from 'express';
import User from '../models/userModel.js';
import bcryptjs from 'bcryptjs';

const userGet = async (req = request, res = response) => {
	const { id } = req.params;
	const user = await User.findById(id);

	if (!user) {
		return res.status(404).json({ msg: 'El usuario no existe' });
	}

	res.status(200).json({
		user,
	});
};

const usersGet = async (req = request, res = response) => {
	const users = await User.find();
	res.status(200).json({
		users,
	});
};

const userPost = async (req = request, res = response) => {
	const { name, surname, email, password, birthdate } = req.body;
	const user = new User({ name, surname, email, password, birthdate });

	// Verificar si el usuario existe
	const userExist = await User.findOne({ email });
	if (userExist) {
		return res.status(400).json({ msg: 'El usuario ya existe' });
	}
	
	// TODO: Sugerencia Mati -> Encriptar la contraseña en el model
	// Encriptar la contraseña
	const salt = bcryptjs.genSaltSync();
	user.password = bcryptjs.hashSync(password, salt);

	// Guardar en la DB
	try {
		await user.save();
		res.status(201).json({
			user,
		});
	} catch (err) {
		console.log('Error al guardar el usuario', err);
		res.status(500).json({ msg: 'Error al guardar el usuario' });
	}
};

const userPut = async (req = request, res = response) => {
	const { id } = req.params;
	const { _id, password, email, ...resto } = req.body;

	// Validar contra la DB
	if (password) {
		// Encriptar la contraseña
		const salt = bcryptjs.genSaltSync();
		resto.password = bcryptjs.hashSync(password, salt);
	}

	await User.findByIdAndUpdate(id, resto);

	const userUpdated = await User.findById(id);

	res.status(200).json({
		msg: 'Usuario actualizado',
		user: userUpdated,
	});
};

const userDelete = async (req = request, res = response) => {
	const { id } = req.params;

	if (!id) {
		return res.status(400).json({ msg: 'El id es obligatorio' });
	}

	const user = await User.findById(id);

	if (!user) {
		return res.status(404).json({ msg: 'El usuario no existe' });
	}

	if (!user.state) {
		return res
			.status(400)
			.json({ msg: 'El usuario ya se encuentra eliminado' });
	}

	await User.findByIdAndUpdate(id, { state: false });

	res.status(200).json({
		msg: 'Usuario eliminado con exito',
	});
};

export { userPost, userPut, userGet, usersGet, userDelete };
