import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'

export default class Resource extends Component {
  componentWillMount() {
    this.props.loadResource(this.props.params.id)
  }

  render() {
    return (
      <Container>
        { !this.props.resource || this.props.resource.isLoading ? (
          <Row>
            <Col>
              Loading
            </Col>
          </Row>
        ) : (
          <Row>
            <Col>
              <h1>{ this.props.resource.ipfsAddress }</h1>
              <h2 className="text-muted">Owned by { this.props.resource.owner }</h2>
            </Col>
          </Row>
          // { resource.isOwnedByUser && (
          //   <Row>
          //     <Col>
          //       // <BindKeyword/>
          //     </Col>
          //   </Row>
          //   <Row>
          //     <Col>
          //       // <SuggestedKeywords keywords={resource.keywords.suggested}/>
          //     </Col>
          //   </Row>
          // )}
        )}
      </Container>
    )
  }
}
