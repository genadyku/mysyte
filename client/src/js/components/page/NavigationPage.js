import React from 'react'
import { connect } from 'react-redux'

import Navigation from 'components/Navigation'

class NavigationPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const isAuthenticated = this.props.isAuthenticated
    const isAdmin = this.props.isAdmin

    return (
      <div>
        <Navigation isAuthenticated={isAuthenticated} isAdmin={isAdmin} />
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.initial.token,
    isAdmin: !!parseInt(state.login.admin),
  }
}

export default connect(
  mapStateToProps,
  null
)(NavigationPage)
