import React from 'react'
import { Nav,Stack } from 'react-bootstrap'

// import Viewquestion from './viewquestion'


const AdminHeader = () => {
    return (
        <>
            <Nav className="justify-content-center">
            <Stack direction="horizontal" gap={3}>
                <Nav.Item className="bg-light border">
                    <Nav.Link href="/admin/add">Add Question</Nav.Link>
                </Nav.Item>
                <div className="vr" />
                <Nav.Item className="bg-light border">
                    <Nav.Link href="/admin/view">View Question</Nav.Link>
                </Nav.Item>
                </Stack>
            </Nav>
        </>
    )
}

export default AdminHeader
