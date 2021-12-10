import React, { Component } from 'react';
import { Card, Container, Col, Row, Button } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom';


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

        }

    }
    componentDidMount() {
        if (this.state.my_room_code !== undefined) {
            const data = { room_code: this.state.my_room_code, sub_category: this.state.sub_category }
            this.loadquestion(data)
        }
        if (this.state.opponant_room_code !== undefined) {
            const data = { room_code: this.state.opponant_room_code, sub_category: this.state.opponant_sub_category }
            this.loadquestion(data)

        }
    }

    loadquestion(data) {
            fetch(`http://127.0.0.1:8000/api/getquizzquestion`, {
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
                    console.log('Match_question_set', data)
                })
    }
    render() {
        // console.log('props_data===>', this.props.location.state)
        // console.log('my_data:',this.state.my_room_code,this.state.my_sub_category)
        // console.log('opponant_data:',this.state.opponant_room_code,this.state.opponant_sub_category)
        return (
            <div>
                <Container>
                    <Row>
                        <Col md={6}>
                            <Card className="text-center" >
                                <Card.Header>

                                    <blockquote className="blockquote mb-0">
                                        <p className='h1'>Match Start</p>
                                        {this.state.opponants ?
                                            <>
                                                {this.state.opponants.map((player) => (
                                                    <footer className="blockquote-footer">
                                                        <cite title="Source Title">{player.opponant}</cite>
                                                    </footer>
                                                ))
                                                }
                                            </>
                                            :
                                            <Button variant="success" >Start Match</Button>
                                        }
                                    </blockquote>

                                </Card.Header>
                                <>
                                    < Row className="mt-3" >
                                        <Col>
                                            <Card className="text-center">
                                                <Card.Body>
                                                    <blockquote className="blockquote mb-0">
                                                        <p>
                                                            {' '}
                                                            some one has join
                                                            {' '}
                                                        </p>
                                                        <footer className="blockquote-footer">
                                                            <cite title="Source Title">{ }</cite>
                                                        </footer>
                                                    </blockquote>
                                                    <hr />
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