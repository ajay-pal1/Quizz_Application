import React from "react";
import { Card, Form, Button } from 'react-bootstrap'
import { Link, useNavigate } from "react-router-dom"




function SignUp() {
    const navigate = useNavigate()

    const [username, setUsername] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword1] = React.useState('')
    const [error, setError]=React.useState({
        username:'',
        email:'',
        password:''
    })

    function Register() {
        let item = { username, email, password }
        console.log("item", item)

        fetch("http://192.168.0.103:8000/api/registration/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
        }).then(response => response.json())
            .then(data => {
                if (data.username === item.username) {
                    console.log('Success:', data);
                    navigate('/')
                }
                else {
                    console.log('fail:', data)
                    navigate('/sign-up')
                    setError({
                        ...error,
                        username:data.username,
                        email:data.email,
                        password:data.password,
                    })


                }
            })
    }
    return (
        <div className='col-sm-6 offset-sm-3 mt-3'>
            <Card border="light" style={{ width: '30rem' }}>
                <Card.Header className="text-center">Registration Page</Card.Header>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>User name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <Form.Text className="text-danger">{error.username}</Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Form.Text className="text-danger">{error.email}</Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword1">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword1(e.target.value)} />
                        <Form.Text className="text-danger">{error.password}</Form.Text>
                    </Form.Group>

                    <Button variant="primary" onClick={Register} >Submit</Button>
                    <p className="text-muted">Already have account! <Link to={"/"}>Sign In?</Link></p>
                </Form>
            </Card>
        </div>
    )
}

export default SignUp
