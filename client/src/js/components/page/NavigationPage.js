import React from 'react'
import { connect } from 'react-redux'

import Navigation from 'components/Navigation'

class NavigationPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const isAuthenticated = this.props.isAuthenticated

    return (
      <div>
        <Navigation isAuthenticated={isAuthenticated} />
      </div>
    )
  }
}
function mapStateToProps(state) {
  return { isAuthenticated: !!state.initial.token }
}

export default connect(
  mapStateToProps,
  null
)(NavigationPage)
