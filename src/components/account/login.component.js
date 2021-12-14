import React, { useState } from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import { Link, useNavigate } from "react-router-dom"
import jwt_decode from 'jwt-decode'


const SignIn = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    function Login() {

        let data = { username, password }

        fetch("http://192.168.0.103:8000/api/login/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
            .then(data => {
                console.log('Token',data)
                localStorage.setItem('Token', JSON.stringify(data))
                localStorage.setItem('user-info', JSON.stringify(jwt_decode(data.access)))
                navigate('/app')
            })
            .catch(() => {
                setErrorMessage("Invalid username or password!")
                navigate('/')

            })
    }
    return (
        <div className='col-sm-6 offset-sm-3 mt-3'>
            <Card border="light" style={{ width: '30rem' }}>
                <Card.Header className="text-center mb-3">Login Page</Card.Header>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)} />
                        <Form.Text className="text-danger">{errorMessage}</Form.Text>

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                        <Form.Text className="text-danger">{errorMessage}</Form.Text>
                    </Form.Group>

                    <Button variant="primary" onClick={Login}>sign in</Button>
                    <p className="text-muted">Need account! <Link to={"/sign-up"}>Sign Up?</Link></p>
                </Form>
            </Card>
        </div>
    )
}

export default SignIn