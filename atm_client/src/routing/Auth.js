import React,{ useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../components/context/AuthContext';
import Loading from '../components/share/Loading';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';


export default function Auth({authRoute}) {

    const {
		authState: { authLoading, isAuthenticated }
	} = useContext(AuthContext)

	let body

    if (authLoading)
		body = (
			<Loading/>
		)
	else if (isAuthenticated) return <Redirect to='/' />
	else
		body = (
			<>
				{authRoute === 'login' && <Login/>}
				{authRoute === 'register' && <Register/>}
			</>
		)
    return (
        <div>
            {body}
        </div>
    )
}
