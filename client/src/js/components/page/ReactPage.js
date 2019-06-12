import React, { Component } from 'react'

let styles = {
  marginTop: '20px',
}

class ReactPage extends Component {
  render() {
    return (
      <section>
        <div className="container" style={styles}>
          <div className="row">
            <div>
              <h4>Статьи REACT</h4>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default ReactPage
