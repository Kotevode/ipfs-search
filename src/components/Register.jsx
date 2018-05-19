import React from 'react'
import { Container, Col, Row } from 'reactstrap'
import RegistrationForm from './RegistrationForm'

export default ({ handleSubmit }) => (
  <Container>
    <Row>
      <Col>
        <h1>Add your resource</h1>
      </Col>
    </Row>
    <Row>
      <Col>
        <RegistrationForm onSubmit={handleSubmit}/>
      </Col>
    </Row>
  </Container>
)
