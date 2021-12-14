import React, { Component } from 'react';
import { Card, Container, Col, Row, Form, Stack } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom';

// opponant_uses(data){
//     console.log(this.state.my_room_code)
//     fetch(`http://192.168.0.103:8000/api/quizzgame/?room_code=${this.state.my_room_code}`)
//             .then(response => response.json())
//             .then(data => {
//                 console.log('opponant_username', data)
//                 this.setState({
//                     users:data.users
//                 })
//             })
// }
// opponant_usename(){
//     fetch(`    http://192.168.0.103:8000/api/quizzgame/${this.state.my_quizz_id}`)
//             .then(response => response.json())
//             .then(data => {
//                 console.log('opponant_username', data.users)
//                 this.setState({
//                     users:data.users
//                 })
//             })
// }

const Withlocation = (props) => {
    const location = useLocation()
    const navigate = useNavigate()
    return <Matchpage {...props} location={location} navigate={navigate} />
}
let token = JSON.parse(localStorage.getItem('Token'))
class Matchpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opponants: this.props.location.state.live_Matchs,

            my_room_code: this.props.location.state.my_room_code,
            my_sub_category: this.props.location.state.my_sub_category,

            opponant_room_code: this.props.location.state.opponant_room_code,
            opponant_sub_category: this.props.location.state.opponant_sub_category,

            users: undefined,

            questions_id: [],
            id: 0,
            question: [],

            answer: null,
            current_score: 0,

            result: [],
            currentCount: 10


        }
        this.nextbtn = this.nextbtn.bind(this)
        this.onSiteChange = this.onSiteChange.bind(this)

    }
    componentDidMount() {
        this.getting_questions_id();
        this.intervalId = setInterval(this.timer.bind(this), 1000);
    }
    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    timer() {
        this.setState({
            currentCount: this.state.currentCount - 1
        })
        if (this.state.currentCount === 0 ) {
            this.next_question()
        }
        if (this.state.id===10) {
            this.result();
            clearInterval(this.intervalId);            
        }
    }

    next_question() {
        this.setState({
            id: this.state.id + 1,
            currentCount:10
        }, () => this.nextbtn())
    }
    getting_questions_id() {
        console.log('answer:', this.state.answer)
        if (this.state.my_room_code !== undefined) {
            const data = { room_code: this.state.my_room_code, sub_category: this.state.my_sub_category }
            this.question_id_api(data)
        }
        if (this.state.opponant_room_code !== undefined) {
            const data = { room_code: this.state.opponant_room_code, sub_category: this.state.opponant_sub_category }
            this.question_id_api(data)
        }
    }
    question_id_api(data) {
        fetch(`http://192.168.0.103:8000/api/getquizzquestion`, {
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
                console.log('questions_id', data)
                this.setState({
                    questions_id: data.Question
                }, () => this.nextbtn())
            })
    }

    question(id) {
        fetch(`http://192.168.0.103:8000/api/quizzquestion/${this.state.questions_id[id]}`)
            .then(response => response.json())
            .then(data => {
                console.log('Question', data)
                this.setState({
                    question: data
                })
            })
    }
    nextbtn() {
        this.question(this.state.id)
        if (this.state.answer !== null) {
            this.submit_answer()
        }
    }
    onSiteChange(e) {
        this.setState({
            answer: e.currentTarget.value
        })
    }
    submit_answer() {
        console.log('question_id:', this.state.question.id)
        if (this.state.my_room_code !== undefined) {
            const data = { room_code: this.state.my_room_code, question_id: this.state.question.id, answer: this.state.answer }
            this.current_question(data)
        }
        if (this.state.opponant_room_code !== undefined) {
            const data = { room_code: this.state.opponant_room_code, question_id: this.state.question.id, answer: this.state.answer }
            this.current_question(data)
        }
    }

    current_question(data) {
        console.log('select answer:', data)
        fetch(`http://192.168.0.103:8000/api/submitanswer`, {
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
                console.log('Result:', data)
                this.setState({
                    current_score: data.current_score,
                    answer: null
                })
            })
    }

    result() {
        if (this.state.my_room_code !== undefined) {
            const data = { room_code: this.state.my_room_code }
            this.result_api(data)
        }
        if (this.state.opponant_room_code !== undefined) {
            const data = { room_code: this.state.opponant_room_code }
            this.result_api(data)
        }
    }
    result_api(data) {
        fetch(`http://192.168.0.103:8000/api/submitquizz`, {
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
                console.log('result_api:', data)
                this.setState({
                    result: data.Status
                })
                this.props.navigate('/result', { state: this.state })
            })

    }
    render() {
        // console.log(this.state.opponants)
        const question = this.state.question
        return (
            <div>
                <Container>
                    <Row>
                        <Col >
                            <Card className="text-center" >
                                <Card.Header>

                                    <Row>
                                        <Col xs={12} md={8}>
                                            <Stack direction="horizontal" gap={3}>
                                                <div className="bg-light">Remaning Time </div>
                                                <div className="vr" />
                                                <div className="bg-light">{this.state.currentCount} sec</div>
                                                <div className="vr" />
                                            </Stack>
                                        </Col>
                                        <Col xs={6} md={4}>
                                            <Stack direction="horizontal" gap={3}>
                                                <div className="bg-light">Your current score </div>
                                                <div className="vr" />
                                                <div className="bg-light">{this.state.current_score}</div>
                                                <div className="vr" />
                                            </Stack>
                                        </Col>
                                    </Row>
                                    <blockquote className="blockquote mb-0">
                                        <p className='h1'>Match Start</p>
                                    </blockquote>

                                </Card.Header>
                                <>
                                    < Row className="mt-3" >
                                        <Col>
                                            <Card className="text-center">
                                                <Card.Body>{
                                                    question.length === 0 ?
                                                        <>
                                                            <blockquote className="blockquote mb-0">
                                                                <p>
                                                                    {' '}
                                                                    some one has join
                                                                    {' '}
                                                                </p>
                                                            </blockquote>
                                                        </> :
                                                        <>
                                                            <blockquote className="blockquote mb-0">
                                                                {question.img_question ?
                                                                    <Card.Img variant="top" src={question.img_question} />
                                                                    : null
                                                                }
                                                                <Card.Title>{question.question}</Card.Title>
                                                                {/* <Card.Title>{this.state.question.id}</Card.Title> */}

                                                                <hr />

                                                                <Form>
                                                                    <Form.Group className="mb-3">
                                                                        <Col sm={1}>
                                                                            <Form.Check type="radio" label={question.option1} value={question.option1} checked={this.state.answer === question.option1}
                                                                                onChange={this.onSiteChange} name="formHorizontalRadios" id="formHorizontalRadios1" />

                                                                            <Form.Check type="radio" label={question.option2} value={question.option2} checked={this.state.answer === question.option2}
                                                                                onChange={this.onSiteChange} name="formHorizontalRadios" id="formHorizontalRadios2" />

                                                                            <Form.Check type="radio" label={question.option3} value={question.option3} checked={this.state.answer === question.option3}
                                                                                onChange={this.onSiteChange} name="formHorizontalRadios" id="formHorizontalRadios3" />

                                                                            <Form.Check type="radio" label={question.option4} value={question.option4} checked={this.state.answer === question.option4}
                                                                                onChange={this.onSiteChange} name="formHorizontalRadios" id="formHorizontalRadios4" />
                                                                        </Col>
                                                                    </Form.Group>
                                                                </Form>
                                                            </blockquote>
                                                        </>
                                                }
                                                    <hr />
                                                    {this.state.id === 9 ?
                                                        <div className=" h4 bg-light">Wait for end Results</div>
                                                        : null
                                                    }
                                                </Card.Body>
                                            </Card >
                                        </Col>
                                    </Row>
                                </>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

        );
    }
}

export default Withlocation