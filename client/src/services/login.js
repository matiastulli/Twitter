import axios from 'axios';

const ENDPOINT = 'http://localhost:5000/api/auth';

export default async function loginService({ email, password }) {
	try {
		const response = await axios.post(ENDPOINT, { email, password });
		return response;
	} catch (error) {
		return { error };
	}
}
