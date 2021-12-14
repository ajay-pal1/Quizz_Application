import React from 'react'
import { Card, Container, Col, Row, Stack } from 'react-bootstrap'
import { useNavigate } from "react-router-dom"
let user = JSON.parse(localStorage.getItem('user-info'))

const Withnavigate = (props) => {
  const navigate = useNavigate()
  return <Home {...props} navigate={navigate} />
}
class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      user: [],
      categories: [],
      selected_category: null

    }
  }

  componentDidMount = () => {
    this.getting_category();
    this.user_data();
  }

  getting_category() {
    fetch(`http://192.168.0.103:8000/api/question/category/`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          categories: data.category,
        })
      })
  }
  user_data() {
    fetch(`http://192.168.0.103:8000/api/user/${user.user_id}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          user: data
        })
      })
  }
  render() {
    console.log('user', this.state.user.total_score)
    return (
      <>
        <div>
          <Container>
            <Card className="mt-5 mb-5">
              <Container>

                <Row>
                  <Col xs={12} md={8}>
                    <Card.Header className="mb-5">

                      <Stack direction="horizontal" gap={3}>
                        <div className="bg-light">Welcome  </div>
                        <div className="vr" />
                        <div className="bg-light">{this.state.user.username}</div>
                        <div className="vr" />
                      </Stack>
                    </Card.Header>
                  </Col>
                  <Col xs={6} md={4}>
                    <Card.Header className="mb-5">

                      <Stack direction="horizontal" gap={3}>
                        <div className="bg-light">Total score </div>
                        <div className="vr" />
                        <div className="bg-light">{this.state.user.total_score}</div>
                        <div className="vr" />
                      </Stack>
                    </Card.Header>

                  </Col>
                </Row>
              </Container>

              <Container>
                <Row>
                  <Col md={{ span: 8, offset: 1 }}>
                    <Card className="text-center mb-5">
                      <Card.Body>
                        <hr />
                        <>
                          <Stack direction="horizontal" gap={3}>
                            <div className="vr" />
                            {
                              this.state.categories.map((category) => (
                                < >
                                  <Card.Body key={category.id} onClick={() => {
                                    this.setState({
                                      selected_category: category,
                                    }, () => {
                                      this.props.navigate('/sub_category', { state: this.state })
                                    })
                                  }} className="bg-light border">
                                    {category}
                                  </Card.Body>
                                  <div className="vr" />
                                </>
                              ))
                            }
                          </Stack>
                        </>
                      </Card.Body>
                    </Card >
                  </Col>
                </Row>
              </Container>

            </Card>
          </Container>
        </div>
      </>
    )
  }
}

export default Withnavigate