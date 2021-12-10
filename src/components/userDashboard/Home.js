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
    fetch(`http://127.0.0.1:8000/api/question/category/`)
      .then(response => response.json())
      .then(data => {
        console.log('categories_data', data)
        this.setState({
          categories: data.category,
          user: user
        })
      })
  }

  render() {
    return (
      <>
        <div>
          <Container>
            <Card className="mt-5 mb-5">
              <Container>
                <Row className="justify-content-md-center">
                  <Col sm={8}>
                    <Card.Header className="text-muted mt-5 mb-5">welcom :{user.username}</Card.Header>
                  </Col>
                  <Col sm={4}>
                    <Card.Header className="mb-5">Score:</Card.Header>
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