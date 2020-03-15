import React, { Component } from 'react'
import SidebarPage from './SidebarPage'
import ContentLessonsPage from './ContentLessonsPage'

class AppLessonsPage extends Component {
  render() {
    const param = this.props.match.params.slug

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col col-lg-2">
            <SidebarPage />
          </div>

          <div className="col col-lg-10">
            <ContentLessonsPage slug={param} />
          </div>
        </div>
      </div>
    )
  }
}
export default AppLessonsPage
