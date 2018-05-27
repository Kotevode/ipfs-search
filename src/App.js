import React from 'react'
import Navigation from './components/Navigation'

export default ({ children }) => (
  <div className="app">
    <Navigation/>
    { children }
  </div>
)
