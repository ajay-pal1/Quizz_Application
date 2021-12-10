import React from 'react'
import { Card, Container, Col, Row,Badge } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom';


const Withlocation = (props) => {
    const location = useLocation()
    const navigate = useNavigate()
    return <Gamejoin {...props} location={location} navigate={navigate} />
}

class Gamejoin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected_category: this.props.location.state.selected_category,
            seconds: 30,
            active_flag: false
        }
    }
    componentDidMount() {
        setInterval(() => this.timmer(), 1000)
    }
    timmer() {
        if (this.state.seconds > 0) {
            this.setState({ seconds: this.state.seconds - 1 })
        }
        else {
            this.props.navigate('/sub_category', { state: this.state })
        }
        if (this.state.seconds === 0) {

            const data = { active_flag: this.state.active_flag }
            console.log('active_flag:', data)
            fetch(`http://127.0.0.1:8000/api/quizzgame/${this.props.location.state.Created_Quizz_data.id}/`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(data)
            }).then(response => response.json())
                .then(data => {
                    console.log('Data_Update', data)
                    this.setState({
                        seconds: 30
                    })
                    this.props.navigate('/sub_category', { state: this.state })
                })

        }
    }

    render() {
        console.log('selected_category', this.props.location.state.Created_Quizz_data.id)
        return (
            <div>
                <div>
                    <h2>{this.state.seconds}</h2>
                </div>
                <Container>
                    <Row>
                        <Col md={6}>
                            <Card className="text-center" >
                                <Card.Header>
                                    <blockquote className="blockquote mb-0">
                                        <p className='h1'>Matche Start in </p>
                                        <footer className="blockquote-footer">
                                            <cite title="Source Title"></cite>
                                            <Badge bg="secondary">{ this.state.seconds}</Badge>
                                        </footer>
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
                                                            Waiting for the opponant....
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
        )
    }
}
export default Withlocation
