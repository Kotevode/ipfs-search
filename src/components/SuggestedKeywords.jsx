import React from 'react'

export default ({ keywords, isLoading, onBind }) => keywords.map(word => (
  <button key={word}
          className="btn btn-outline-primary"
          onClick={() => onBind(word)}>
    word
  </button>
))
