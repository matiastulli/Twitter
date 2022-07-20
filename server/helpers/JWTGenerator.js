import jsonwebtoken from 'jsonwebtoken';

// Generate a JWT token for the user with the given uid
const generateJWT = (uid = '') => {
	return new Promise((resolve, reject) => {
		const payload = { uid };

		jsonwebtoken.sign(
			payload,
			process.env.JWT_SECRET,
			{
				expiresIn: '4h',
			},
			(err, token) => {
				if (err) {
					console.log('Error al generar el JWT', err);
					// eslint-disable-next-line prefer-promise-reject-errors
					Error('Error al generar el JWT');
				} else {
					resolve(token);
				}
			}
		);
	});
};

export default generateJWT;
