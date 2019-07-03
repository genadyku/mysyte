/* eslint-disable react/no-danger */
import React, { Component } from 'react'

import Prism from 'prismjs'

class Home extends Component {
  componentDidMount() {
    Prism.highlightAll()
  }
  createMarkup(text) {
    return { __html: text }
  }

  render() {
    const things = `<pre class='language-javascript line-numbers'><code>\nconst things = [\n'Playground',\n'Strategy',\n]\n function add(num1 ,num2 ){\n return num1 +num2 \n} </code></pre>`

    return (
      <div>
        <h4>PRISM1</h4>
        <div dangerouslySetInnerHTML={this.createMarkup(things)} />
      </div>
    )
  }
}
export default Home
