import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'

import BindedKeywords from './BindedKeywords'
import AddKeywordForm from './AddKeywordForm'

export default class Resource extends Component {
  componentWillMount() {
    this.props.loadResource(this.props.params.id)
  }

  render() {
    return this.props.isLoading ? (
        <Container>
          <Row>
            <Col>
              Loading
            </Col>
          </Row>
        </Container>
      ) : (
        <Container>
          <Row>
            <Col>
              <h1>{ this.props.resource.ipfsAddress }</h1>
              <h2 className="text-muted">Owned by { this.props.resource.owner }</h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <h2>Keywords</h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <BindedKeywords keywords={this.props.resource.keywords.binded} />
            </Col>
          </Row>
          { this.props.resource.isOwnedByUser && (
            <Row>
              <Col>
                <AddKeywordForm onSubmit={this.props.bind} />
              </Col>
            </Row>
          )}
          { this.props.resource.isOwnedByUser && (
            <Row>
              <Col>
              </Col>
            </Row>
          )}
        </Container>
      )
  }
}
