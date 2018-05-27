import React from 'react'
import { Container, Col, Row } from 'reactstrap'

import SearchForm from './SearchForm'
import SearchResult from '../containers/SearchResult'

export default ({ handleSubmit, results, isLoading }) => (
  <Container>
    <Row>
      <Col>
        <SearchForm onSubmit={handleSubmit}/>
      </Col>
    </Row>
    <Row>
      <Col>
        { !isLoading && results.map(result => (
          <SearchResult id={result}
                        key={result} />
        ))}
      </Col>
    </Row>
  </Container>
)
