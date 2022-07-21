import { useContext, useCallback } from 'react';
import Context from '../context/userContext';
import loginService from '../services/login';

export default function useUser() {
	const { jwt, setJWT, setUser } = useContext(Context);

	const login = useCallback(
		({ email, password }) => {
			loginService({ email, password })
				.then(response => {
					setJWT(response.data.token);
					setUser(response.data.user);
				})
				.catch(error => {
					console.log(error);
				});
		},
		[setJWT]
	);

	const logout = useCallback(() => {
		setJWT(null);
	}, [setJWT]);

	return {
		isLogged: Boolean(jwt),
		login,
		logout,
	};
}
