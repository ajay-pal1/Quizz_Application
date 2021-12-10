import React from 'react'
import { Card, Pagination, ListGroup, Button, Container, Col, Row, Modal, Form, Dropdown } from 'react-bootstrap'

import AdminHeader from "./adminheader"


class Viewquestion extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            url: 'http://127.0.0.1:8000/api/question/',
            DataisLoaded: false,
            results: [],
            next: null,
            previous: null,
            show: false,
            category: [],
            sub_category: [],
            category_value: '',
            sub_category_value: ''
        }
        ////////////////////////////////////// For function//////////////////////////////////////////////

        this.Pagination_prevhandler = this.Pagination_prevhandler.bind(this)
        this.Pagination_nexthandler = this.Pagination_nexthandler.bind(this)
        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.filterhandle = this.filterhandle.bind(this)

    }
    ////////////////////////////////////// For view//////////////////////////////////////////////
    componentDidMount = () => {
        fetch(this.state.url)
            .then(response => response.json())
            .then(data => {
                console.log('data', data)
                this.setState({
                    DataisLoaded: true,
                    results: data.results,
                    next: data.next,
                    previous: data.previous,
                    page: null,
                    pre_active:false,
                    next_active:false,
                })
            })
    }
    ////////////////////////////////////// For filters//////////////////////////////////////////////
    filterhandle() {
        fetch(`http://127.0.0.1:8000/api/question/?category=${this.state.category_value}&sub_category=${this.state.sub_category_value}`)
            .then(response => response.json())
            .then(data => {
                console.log('filter_data', data)
                this.setState({
                    results: data.results,
                    show: false
                })
            })
    }

    Categoryhandler = () => {
        fetch(`http://127.0.0.1:8000/api/question/category/`)
            .then(response => response.json())
            .then(data => {
                console.log('category_data', data)
                this.setState({
                    category: data.category
                })
            })
    }

    Subcategoryhandler = () => {
        fetch(`http://127.0.0.1:8000/api/question/category/${this.state.category_value}/subcategory`)
            .then(response => response.json())
            .then(data => {
                console.log('sub category_data', data)
                this.setState({
                    sub_category: data.sub_category
                })
            })
    }

    handleShow() {
        this.setState({
            show: true
        })
        this.Categoryhandler()
    }
    handleClose() {
        this.setState({
            show: false
        })
    }
    ////////////////////////////////////// For Delete///////////////////////////////////////////////
    delete(item) {
        const currentresults = this.state.results.filter(i => i.id !== item.id)
        fetch(`http://127.0.0.1:8000/api/question/${item.id}/`, { method: "DELETE" })
        this.setState({
            results: currentresults
        })
    }
    ////////////////////////////////////// For Pagination///////////////////////////////////////////
    Pagination_prevhandler() {
        this.setState({
            url: this.state.previous,
            pre_active:true
        }, () => {
            console.log('previous', this.state.url)
            this.componentDidMount()
        }
        )
    }

    Pagination_nexthandler() {
        this.setState({
            url: this.state.next,
            next_active:true
        }, () => {
            console.log('next', this.state.url)
            this.componentDidMount()
        }
        )
    }
    /////////////////////////////////////////////////////////////////////////////////////////////

    render() {
        if (!this.state.DataisLoaded)
            return (
                <div>
                    <h1> Pleses wait some time.... </h1>
                </div>
            )
        return (
            <>
                <Container>
                    <Row>
                        <Col md={4}></Col>
                        <Col md={{ span: 4, offset: 4 }}>
                            <Card className="text-center">
                                <Card.Body>
                                    <AdminHeader />
                                    <hr />
                                    <>
                                        <Button variant="primary" onClick={this.handleShow}>Filter</Button>

                                        <Modal show={this.state.show} onHide={this.handleClose} animation={false}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Field filters</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <Form>
                                                    {/*===========================for category  ============================*/}

                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Dropdown className="mb-3">
                                                            <Dropdown.Toggle variant="light" id="dropdown-basic">Select category</Dropdown.Toggle>
                                                            <Dropdown.Menu>
                                                                {
                                                                    this.state.category.map((category) => (
                                                                        <Dropdown.Item onClick={() => {
                                                                            this.setState({ category_value: category }, () => {
                                                                                console.log(category)
                                                                                this.Subcategoryhandler()
                                                                            });
                                                                        }}>{category}</Dropdown.Item>
                                                                    ))
                                                                }
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                        <Form.Control disabled type="text" placeholder="Category"
                                                            value={this.state.category_value} />
                                                    </Form.Group>
                                                    {/*===========================for sub_category  ============================*/}
                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Dropdown className="mb-3">
                                                            <Dropdown.Toggle variant="light" id="dropdown-basic">Select Sub category</Dropdown.Toggle>
                                                            <Dropdown.Menu>
                                                                {
                                                                    this.state.sub_category.map((sub_category) => (
                                                                        <Dropdown.Item onClick={() => {
                                                                            this.setState({ sub_category_value: sub_category })
                                                                        }} >{sub_category}</Dropdown.Item>
                                                                    ))
                                                                }
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                        <Form.Control type="text" placeholder="Sub category"
                                                            value={this.state.sub_category_value} />
                                                    </Form.Group>
                                                    <Button variant="primary" onClick={this.filterhandle}>Submit</Button>
                                                </Form>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={this.handleClose}>
                                                    Close
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </>
                                </Card.Body>
                            </Card >
                        </Col>
                    </Row>
                    {/* ======================================================For Question list================================================================================================ */}
                    <Row>
                        <Col md={{ span: 6 }}>
                            <Card >
                                <Card.Header className="text-center">Questions</Card.Header>
                                {
                                    this.state.results.map((item) => (
                                        <Card.Body key={item.id}>
                                            <blockquote className="blockquote mb-0">
                                                <p>
                                                    {''}
                                                    {item.question}
                                                    {' '}
                                                </p>

                                                <footer className="blockquote-footer">
                                                    <cite className="fw-bold" title="correct_answer">{item.correct_answer}</cite>
                                                </footer>
                                            </blockquote>
                                            <Card.Footer>
                                                <ListGroup as='ol' numbered variant={'flush'}>
                                                    <ListGroup.Item as="li">{item.option1}</ListGroup.Item>
                                                    <ListGroup.Item as="li">{item.option2}</ListGroup.Item>
                                                    <ListGroup.Item as="li">{item.option3}</ListGroup.Item>
                                                    <ListGroup.Item as="li">{item.option4}</ListGroup.Item>
                                                </ListGroup>
                                                <small className="blockquote-footer fw-bold">{item.category}</small><br />
                                                <small className="blockquote-footer fw-bold">{item.sub_category}</small>
                                            </Card.Footer>
                                            <Modal.Footer>
                                                <Button variant="danger" onClick={this.delete.bind(this, item)}>Delete</Button>
                                            </Modal.Footer>
                                            <hr />
                                        </Card.Body>
                                    ))
                                }
                                <Modal.Footer>
                                    <Pagination className='center' size="lg">
                                        <Pagination.Prev active={this.state.pre_active} onClick={this.Pagination_prevhandler} />
                                        <Pagination.Next active={this.state.next_active} onClick={this.Pagination_nexthandler} />
                                    </Pagination >
                                </Modal.Footer>
                            </Card>
                        </Col>
                    </Row>
                </Container>


            </>
        )
    }
}
export default Viewquestion

