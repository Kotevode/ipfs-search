import React from 'react'
import { Container, Col, Row } from 'reactstrap'

import SearchForm from './SearchForm'

export default ({ handleSubmit, results, isLoading }) => (
  <Container>
    <Row>
      <Col>
        <SearchForm onSubmit={handleSubmit}/>
      </Col>
    </Row>
  </Container>
)
