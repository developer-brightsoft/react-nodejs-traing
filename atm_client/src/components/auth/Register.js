import React, {useState, useContext} from 'react'
import { useHistory, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';
import {Form, Button} from 'react-bootstrap';
import '../../App.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
    const { register } = useContext(AuthContext)
    const history = useHistory()

    const [registerForm, setRegisterForm] = useState({
        email: '',
        password: ''
    })

    const {email, password} = registerForm;

    const onChangeRegisterForm = event => 
        setRegisterForm({
            ...registerForm, [event.target.name]: event.target.value
        })

    function validateEmail() {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    
    }
    const registerUser = async event => {
        event.preventDefault()

        if(!validateEmail(email)){
            return toast.warning('Unknown email address')
        }

        if(password.length < 6){
            return toast.warning('Password is too short')
        }

        try {
            const registerData = await register(registerForm)
            if(registerData.user){
                toast.success(registerData.message)      
            }  
        } catch(err){
            toast.error('Email already exists !')
        }
    }
    
    return (
        <div className="d-flex ">
            <Form className='d-flex form_input' onSubmit={registerUser  }>
                <h1 className="form_title">Register</h1>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name='email' value={email} onChange={onChangeRegisterForm} type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' value={password} onChange={onChangeRegisterForm} placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    register
                </Button>
                <Form.Text className="text-muted">
                    Have an account ? <Link to='/login'>login</Link>
                </Form.Text>
                <ToastContainer />
            </Form>
        </div>
    )
}
