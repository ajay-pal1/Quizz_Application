import React, { Component } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button, Container } from 'react-bootstrap'

const Withlocation = (props) => {
    const location = useLocation()
    const navigate = useNavigate()
    return <Result {...props} location={location} navigate={navigate} />
}
class Result extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: this.props.location.state.result,
        }
    }
    render() {
        console.log('result:', this.state.result)
        return (
            <div>
                <Container>
                    <Row>
                        <Col md={{ span: 6, offset: 3 }}>
                            {
                                this.state.result ?
                                    <Card className="text-center">
                                        <Card.Header className='h4'>Result</Card.Header>
                                        <Card.Body>
                                            <Card.Title>winner : {this.state.result.winner}</Card.Title>
                                            <Card.Text> winner score : {this.state.result.winner_score}</Card.Text>
                                            <Button variant="primary" onClick={()=>this.props.navigate('/home')}>Go back</Button>
                                        </Card.Body>
                                    </Card>
                                    : null
                            }
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Withlocation;