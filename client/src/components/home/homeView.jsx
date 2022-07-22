import React, { useEffect, useContext } from 'react';
import useUser from '../../hooks/useUser';
import Context from '../../context/userContext';
import { Navigate, useLocation } from 'react-router-dom';

const Home = () => {
	const { isLogged } = useUser();
	const { user } = useContext(Context);
	const location = useLocation();

	useEffect(() => {
		console.log(isLogged);
	}, [isLogged]);
	return isLogged ? (
		<div>
			<h1>{isLogged ? `Welcome ${user.name} ${user.surname}` : 'Welcome'}</h1>
		</div>
	) : (
		<Navigate to="/login" replace state={{ from: location }} />
	);
};

export default Home;
