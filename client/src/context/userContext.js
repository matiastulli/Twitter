import React, { useState, createContext } from 'react';

const Context = createContext({});

// eslint-disable-next-line react/prop-types
export function UserContextProvider({ children }) {
	const [jwt, setJWT] = useState(null);
	const [user, setUser] = useState(null);
	return (
		<Context.Provider value={{ jwt, setJWT, user, setUser }}>
			{children}
		</Context.Provider>
	);
}

export default Context;
