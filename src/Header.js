import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { useNavigate } from "react-router-dom"



function Header() {
    let user = JSON.parse(localStorage.getItem('user-info'))
    let navigate = useNavigate()

    function logout() {
        localStorage.clear()
        navigate('/')
    }

    return (
        <Navbar bg="light" variant="light">
            <Navbar.Brand href="">Quizz Game</Navbar.Brand>
            {
                user ?
                    <>
                        {user.is_staff === true ?
                            <Nav className="me-auto">
                                <Nav.Link href="/admin/view">Admin Dashboard</Nav.Link>
                            </Nav>
                            
                            : <Nav className="me-auto">
                                <Nav.Link href="/home">User Dashboard</Nav.Link>
                            </Nav>
                        }
                    </>
                    :
                    <>
                        <Nav.Link href="/">Login</Nav.Link>
                    </>
            }
            {
                user ?
                    <>
                        Signed in as:
                        <NavDropdown title={user.username}>
                            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </>

                    : null
            }
        </Navbar>

    )
}
export default Header
