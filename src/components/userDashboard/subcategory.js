import React, { Component } from 'react';
import { Card, Button, Container, Col, Row, Modal, Form, Dropdown } from 'react-bootstrap'
import { useLocation,useNavigate } from 'react-router-dom';



const Withlocation = (props) => {
    const location = useLocation()
    const navigate = useNavigate()
    return <Subcategory {...props} location={location} navigate={navigate}/>
}

let token = JSON.parse(localStorage.getItem('Token'))
class Subcategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected_category: this.props.location.state.selected_category,
            Subcategories: [],
            sub_category_value: null,
            show: false,
            live_Matchs: [],
            live_Matchs_users: [],
            Created_Quizz_data:[],
            opponant_room_code:null,
            opponant:null,
            opponant_sub_category:null
        }

        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }
    /////////////////////////////////// live matches /////////////////////////////////////////////////
    componentDidMount = () => {
        console.log('selected_category:', this.state.selected_category)
        // fetch(`http://127.0.0.1:8000/api/quizzgame&active_flag=true`)
        fetch(`http://127.0.0.1:8000/api/livegame/?category=${this.state.selected_category}`)
            .then(response => response.json())
            .then(data => {
                console.log('Live_Quizz_Data', data)
                this.setState({
                    live_Matchs: data.results,
                })
            })
    }
//////////////////////////////////////Join Match //////////////////////////////////////////////////

join_match = ()=>{
    const data={room_code:this.state.opponant_room_code}
    console.log('room_code:',data)
    fetch(`http://127.0.0.1:8000/api/quizzgame/joinquizz/`,{
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token.access}`,
        },
        body: JSON.stringify(data)
    }).then(response => response.json())
    .then(data => {
        console.log('join_match',data.status)
        this.setState({
            opponant:data.status
        },()=>{
            this.props.navigate('/matchstart',{state: this.state})
        })
    })

}
    //////////////////////////////// for create match /////////////////////////////////////////////
    onsubmit = () => {
        console.log('sub_category_value', this.state.sub_category_value)
        console.log('token', token)
        
        const data = { category: this.state.selected_category, sub_category: this.state.sub_category_value }
        console.log('data:', data)
        fetch(`http://127.0.0.1:8000/api/quizzgame/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token.access}`,
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log('create_match_Data', data)
                this.setState({
                    Created_Quizz_data:data,
                    show: false
                },() => {
                this.props.navigate('/waiting',{state: this.state})
                })
            })
    }
    ////////////////////////////////////////////// for getting the sub category //////////////////////////////////
    handleShow() {
        fetch(`http://127.0.0.1:8000/api/question/category/${this.state.selected_category}/subcategory`)
            .then(response => response.json())
            .then(data => {
                console.log('Subcategories_data', data)
                this.setState({
                    Subcategories: data.sub_category
                })
            })
        this.setState({
            show: true
        })
    }

    handleClose() {
        this.setState({
            show: false
        })
    }

    /////////////////////////////////////////////////// for join match ///////////////////////////////////////////
    render() {
        console.log('opponant_sub_category:',this.state.opponant_sub_category)
        console.log('opponant_room_code:',this.state.opponant_room_code)
        return (
            <>
                <Container>
                    <Row>
                        <Col md={4}></Col>
                        <Col md={{ span: 4, offset: 4 }}>
                            <Card className="text-center">
                                <Card.Body>
                                    <strong> Create a new match</strong>
                                    <hr />
                                    <>
                                        <Button variant="primary" onClick={this.handleShow}>Create Match</Button>

                                        <Modal show={this.state.show} onHide={this.handleClose} animation={false}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Field filters</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <Form>
                                                    {/*===========================for Create match  ============================*/}
                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Dropdown className="mb-3">
                                                            <Dropdown.Toggle variant="light" id="dropdown-basic">Select Sub category</Dropdown.Toggle>
                                                            <Dropdown.Menu>
                                                                {
                                                                    this.state.Subcategories.map((sub_category) => (
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
                                                    <Button variant="primary" onClick={this.onsubmit}>Submit</Button>
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
                    {/*===========================for Join match  ============================*/}
                    <Row>
                        <Col md={6}>
                            <Card className="text-center" >
                                <Card.Header>
                                    <blockquote className="blockquote mb-0">
                                        <p className='h1'>Live Matches</p>
                                        <footer className="blockquote-footer">
                                            <cite title="Source Title">{this.state.selected_category}</cite>
                                        </footer>
                                    </blockquote>

                                </Card.Header>
                                <>
                                    {this.state.live_Matchs.length !== 0 ?
                                        this.state.live_Matchs.map((live_Match) => (
                                            < Row className="mt-3" >
                                                <Col>
                                                    <Card className="text-center">
                                                        <Card.Body>
                                                            <blockquote className="blockquote mb-0">
                                                                <p>
                                                                    {' '}
                                                                    {live_Match.sub_category}
                                                                    {' '}
                                                                </p>
                                                            <footer className="blockquote-footer">
                                                                <cite title="Source Title">{live_Match.opponant}</cite>
                                                            </footer>
                                                            </blockquote>
                                                            <Button variant="primary" onClick={()=>{
                                                                this.setState({
                                                                    opponant_room_code:live_Match.room_code,
                                                                    opponant_sub_category:live_Match.sub_category
                                                                },()=>{
                                                                    this.join_match()
                                                                })
                                                            }}>Join Match</Button>
                                                            <hr />
                                                        </Card.Body>
                                                    </Card >
                                                </Col>
                                            </Row>
                                        ))
                                        :
                                        <div>
                                            <Card.Text className="mt-4 mb-4"> No match available this time.... </ Card.Text>
                                        </div>
                                    }
                                </>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

export default Withlocation;