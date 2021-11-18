import React, {useState, useContext} from 'react'
import { useHistory, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';
import {Form, Button} from 'react-bootstrap';
import '../../App.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
    const { login } = useContext(AuthContext)
    const history = useHistory()

    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    })

    const {email, password} = loginForm;

    const onChangeLoginForm = event => {
        setLoginForm({
            ...loginForm, [event.target.name]: event.target.value
        })
    }

    const loginUser = async event => {
        event.preventDefault()

        if(!email){
            return toast.warning('Unknown email address')
        }

        if(!password){
            return toast.warning('Password is too short')
        }

        try{
            const loginData = await login(loginForm)
            if(loginData.user){
                toast.success(loginData.message)
            }else{
                toast.error(loginData.message)
            }
        }catch(err){
            toast.error(err.message)
        }
    }
    return (
        <div className="d-flex ">
            <Form className='d-flex form_input' onSubmit={loginUser}>
                <h1 className="form_title">Login</h1>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name='email' value={email} onChange={onChangeLoginForm} placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' value={password} onChange={onChangeLoginForm} placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    login
                </Button>
                <Form.Text className="text-muted">
                    Don't have an account ? <Link to='/register'>register</Link>
                </Form.Text>
                <ToastContainer />
            </Form>
        </div>
    )
}
