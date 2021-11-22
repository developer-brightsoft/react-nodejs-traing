import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { validateEmail } from "../extensions/validate.extensions";
import { useDispatch } from "react-redux";
import { register } from "../store/actions/auth.actions";

export default function Register() {
  const dispatch = useDispatch();
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = registerForm;

  const onChangeRegisterForm = (event) =>
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });

  const registerUser = async (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      return toast.warning("Unknown email address");
    }

    if (password.length < 6) {
      return toast.warning("Password is too short");
    }

    dispatch(register(registerForm));
  };

  return (
    <div className="d-flex ">
      <Form className="d-flex form_input" onSubmit={registerUser}>
        <h1 className="form_title">Register</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            value={email}
            onChange={onChangeRegisterForm}
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={onChangeRegisterForm}
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          register
        </Button>
        <Form.Text className="text-muted">
          Have an account ? <Link to="/login">login</Link>
        </Form.Text>
      </Form>
    </div>
  );
}
