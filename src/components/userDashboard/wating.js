import React from 'react'
import { Card, Container, Col, Row, Badge } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom';


const Withlocation = (props) => {
    const location = useLocation()
    const navigate = useNavigate()
    return <Watingoppenent {...props} location={location} navigate={navigate} />
}

class Watingoppenent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected_category: this.props.location.state.selected_category,
            seconds: 10,
            active_flag: false,
            started_at: null,
            my_room_code:null,
            my_sub_category:null,
        }
    }
    componentDidMount() {
        this.intervalId = setInterval(this.timmer.bind(this), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    timmer() {
        if (this.state.seconds > 0) {
            this.setState({ seconds: this.state.seconds - 1 })
            fetch(`http://192.168.0.103:8000/api/quizzgame/${this.props.location.state.Created_Quizz_data.id}/`)
                .then(response => response.json())
                .then(data => {
                    console.log('Match started_at', data.started_at)
                    this.setState({
                        started_at: data.started_at
                    })
                })

        }
        if (this.state.seconds === 0 && this.state.started_at === null) {
            const data = { active_flag: this.state.active_flag }
            console.log('active_flag:', data)
            fetch(`http://192.168.0.103:8000/api/quizzgame/${this.props.location.state.Created_Quizz_data.id}/`, {
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
        if (this.state.seconds !== 0 && this.state.started_at !== null) {
            this.setState({
                my_room_code:this.props.location.state.Created_Quizz_data.room_code,
                my_sub_category:this.props.location.state.Created_Quizz_data.sub_category,
                my_quizz_id:this.props.location.state.Created_Quizz_data.id
            })
            this.props.navigate('/matchstart',{ state: this.state })
            clearInterval(this.intervalId);
        }
    }

    render() {
        console.log('Room_code:', this.props.location.state.Created_Quizz_data.room_code)
        console.log('selected_category', this.props.location.state.Created_Quizz_data)
        return (
            <div>
                <Container>
                    <Row>
                        <Col md={6}>
                            <Card className="text-center" >
                                <Card.Header>
                                    <blockquote className="blockquote mb-0">
                                        <p className='h1'>Match Start</p>
                                        <footer className="blockquote-footer">
                                            <cite title="Source Title">{this.state.seconds}</cite>
                                        </footer>
                                    </blockquote>

                                </Card.Header>
                                <>
                                    < Row className="mt-3" >
                                        <Col>
                                            <Card className="text-center">
                                                <Card.Body>
                                                    <blockquote className="blockquote mb-0">
                                                        <>
                                                            <p>
                                                                <Badge bg="secondary">{this.state.seconds}</Badge>
                                                                {' '}
                                                                Waiting for the opponant....
                                                                {' '}
                                                            </p>
                                                        </>
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
