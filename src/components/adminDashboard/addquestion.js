import React from 'react'
import {Container, Form, Row, Col, Button, Card } from 'react-bootstrap'
import { useNavigate } from "react-router-dom"

import AdminHeader from "./adminheader"

const Addquestion = (e) => {
    const navigate = useNavigate()
    const [img_question, setImg_question] = React.useState();
    const [question, setQuestion] = React.useState();
    const [option1, setOption1] = React.useState();
    const [option2, setOption2] = React.useState();
    const [option3, setOption3] = React.useState();
    const [option4, setOption4] = React.useState();
    const [correct_answer, setCorrect_answer] = React.useState();
    const [category, setCategory] = React.useState();
    const [sub_category, setSub_category] = React.useState();

    const Imagehandler = (e) => {
        setImg_question(e.target.files[0])
    }
    // console.log('img_question', img_question)


    function handleSubmit() {

        let formdata = { img_question, question, option1, option2, option3, option4, correct_answer, category, sub_category }
        console.log('data', formdata)


        fetch("http://127.0.0.1:8000/api/question/", {
            method: "POST",
            headers: {
                // 'Content-Type': 'multipart/form-data',
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formdata),

        }).then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                navigate('/admin/view')
            })
            .catch((error) => {
                console.error('Error:', error);

            });
    }



    let data = new FormData();
    const filehandler = (e) => {
        console.log('object', e.target.files[0])
        data.append('exel_file_upload', e.target.files[0]);

        for (var key of data.entries()) {
            console.log(key[0] + ', ' + key[1]);
        }
    }

    function bulkSubmit() {

        fetch("http://localhost:8000/api/qupload/", {
            method: "POST",
            body: data,

        }).then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                navigate('/admin/view')
            })
            .catch((error) => {
                console.error('Error:', error);

            });
    }

    return (
        <>
            <Container>
                <Row>
                    <Col md={4}></Col>
                    <Col md={{ span: 4, offset: 4 }}>
                        <Card className="text-center">
                            <Card.Body>
                                <AdminHeader />
                            </Card.Body>
                        </Card >
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 6 }}>
                        <Card className="text-center mt-4">
                            <Card.Body>
                                <Card.Header>Uplaod Questions in bluk</Card.Header>
                                <Form>
                                    <Form.Group as={Row} className="mb-3 mt-3" controlId="formFile">
                                        <Form.Label column sm="2">select the excel </Form.Label>
                                        <Col sm="10"><Form.Control name='bulk_question' onChange={filehandler} type="file" /></Col>
                                    </Form.Group>
                                    <Button variant="success" onClick={bulkSubmit}>Uplode bulk Question</Button>
                                </Form>

                                <Form>
                                    <Card.Header className="mt-3 mb-3">Add Question</Card.Header>
                                    <Form.Group as={Row} className="mb-3" controlId="formFile">
                                        <Form.Label column sm="2">Question Image</Form.Label>
                                        <Col sm="10"><Form.Control name='img_question' onChange={Imagehandler} type="file" /></Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3" >
                                        <Form.Label column sm="2">Question</Form.Label>
                                        <Col sm="10"><Form.Control name='question' onChange={(e) => setQuestion(e.target.value)} type="text" placeholder="Enter you question" /></Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3" >
                                        <Form.Label column sm="2">option1</Form.Label>
                                        <Col sm="10"><Form.Control name='option1' onChange={(e) => setOption1(e.target.value)} type="text" placeholder="Enter the option 1" /></Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3" >
                                        <Form.Label column sm="2">option2</Form.Label>
                                        <Col sm="10"><Form.Control name='option2' onChange={(e) => setOption2(e.target.value)} type="text" placeholder="Enter the option 2" /></Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3" >
                                        <Form.Label column sm="2">option3</Form.Label>
                                        <Col sm="10"><Form.Control name='option3' onChange={(e) => setOption3(e.target.value)} type="text" placeholder="Enter the option 3" /></Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3" >
                                        <Form.Label column sm="2">option4</Form.Label>
                                        <Col sm="10"><Form.Control name='option4' onChange={(e) => setOption4(e.target.value)} type="text" placeholder="Enter the option 4" /></Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3" >
                                        <Form.Label column sm="2">correct answer</Form.Label>
                                        <Col sm="10"><Form.Control name='correct_answer' onChange={(e) => setCorrect_answer(e.target.value)} type="text" placeholder="Enter the correct answer" /></Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3" >
                                        <Form.Label column sm="2">category</Form.Label>
                                        <Col sm="10"><Form.Control name='category' onChange={(e) => setCategory(e.target.value)} type="text" placeholder="Enter the category" /></Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3" >
                                        <Form.Label column sm="2">sub category</Form.Label>
                                        <Col sm="10"><Form.Control name='sub_category' onChange={(e) => setSub_category(e.target.value)} type="text" placeholder="Enter the sub category" /></Col>
                                    </Form.Group>
                                    <Button variant="success" onClick={handleSubmit}>Uplode Question</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Addquestion
