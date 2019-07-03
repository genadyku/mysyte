/* eslint-disable react/no-danger */
import React, { Component } from 'react'
import Prism from 'prismjs'

class Code extends Component {
  componentDidMount() {
    Prism.highlightAll()
  }
  createMarkup(text) {
    return { __html: text }
  }

  render() {
    const { text } = this.props

    return (
      <div>
        <div dangerouslySetInnerHTML={this.createMarkup(text)} />
      </div>
    )
  }
}

export default Code
