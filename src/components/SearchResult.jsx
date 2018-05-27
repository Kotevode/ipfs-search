import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class SearchResult extends Component {
  componentWillMount() {
    this.props.loadResource(this.props.id)
  }

  render() {
    return (
      <div className="search-result">
        { this.props.resource.isLoading ? (
          "Loading..."
        ) : (
          <a href={`https://gateway.ipfs.io/${this.props.resource.ipfsAddress}`}>
            {this.props.resource.ipfsAddress}
          </a>
        )}
      </div>
    )
  }
}
