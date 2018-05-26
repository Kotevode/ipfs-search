import React from 'react'

export default ({ keywords }) => (
  <div className="binded-keywords">
    { keywords.map(keyword => (
      <span className="badge badge-primary"
            key={keyword}>
        { keyword }
      </span>
    )) }
  </div>
)
