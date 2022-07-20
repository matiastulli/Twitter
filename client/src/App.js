import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Login from './components/login/login';
import axios from 'axios';
import React, { useState } from 'react';
import Register from './components/register/register';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home/home';

function App() {
	axios.defaults.baseURL = 'http://localhost:5000/api';

	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const [isLogged, setIsLogged] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const login = async (email, password) => {
		const { data } = await axios.post('/auth', { email, password });

		setUser(data.user);
		setToken(data.token);
		localStorage.setItem('token', data.token);
		console.log(user, token);
	};

	const logout = () => {
		setUser(null);
		setToken(null);
		localStorage.removeItem('token');
		setIsLogged(false);
	};

	const register = async (name, surname, email, password) => {
		const { data } = await axios.post('/user/register', {
			name,
			surname,
			email,
			password,
		});
		setUser(data.user);
		console.log(data.user);
	};

	return (
		<div className="App">
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route path="/login" element={<Login login={login} />} />
				<Route path="/register" element={<Register register={register} />} />
			</Routes>
		</div>
	);
}

export default App;
