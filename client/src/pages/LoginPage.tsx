import React from 'react'
import { LoginForm, LoginFormInputs } from '../components/LoginForm'
import { useAuth } from '../utils/AuthProvider';

export const LoginPage = () => {
	const auth = useAuth();
	
	const handleLogin = async (loginCredentials: LoginFormInputs) => {
		const credentials = {
			username: loginCredentials.username,
			//password: loginCredentials.password
		}
		auth.loginAction(credentials);
	}

	return (
		<LoginForm handleLogin={handleLogin} />
	);
}
