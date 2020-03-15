import React, { Component } from 'react'

import ChapterItem from './ChapterItem'

class ChapterList extends Component {
  render() {
    const { chapters } = this.props

    return (
      <div className="sidebar-content">
        <ul className="sidebar-nav-links">
          {chapters.map(chapter => (
            <ChapterItem chapter={chapter} key={`chapter_${chapter._id}`} />
          ))}
        </ul>
      </div>
    )
  }
}
export default ChapterList
