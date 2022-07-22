import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Login from './components/login/loginView';
import axios from 'axios';
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { UserContextProvider } from './context/userContext';
import Home from './components/home/homeView';
import Navbar from './components/navbar/navbarView';
import Register from './components/register/registerView';

function App() {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const [isLogged, setIsLogged] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	// const login = async (email, password) => {
	// 	const { data } = await axios.post('/auth', { email, password });

	// 	setUser(data.user);
	// 	setToken(data.token);
	// 	localStorage.setItem('token', data.token);
	// 	console.log(user, token);
	// };

	// const logout = () => {
	// 	setUser(null);
	// 	setToken(null);
	// 	localStorage.removeItem('token');
	// 	setIsLogged(false);
	// };

	// const register = async (name, surname, email, password) => {
	// 	const { data } = await axios.post('/user/register', {
	// 		name,
	// 		surname,
	// 		email,
	// 		password,
	// 	});
	// 	setUser(data.user);
	// 	console.log(data.user);
	// };

	return (
		<UserContextProvider>
			<div className="App">
				<Navbar isLogged={isLogged} user={user} />
				<Routes>
					<Route path="/home" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Routes>
			</div>
		</UserContextProvider>
	);
}

export default App;
