import React, { Component } from 'react'

import ChapterItem from './ChapterItem'

class ChapterList extends Component {
  render() {
    const chapters = this.props.chapters
    console.log('55', chapters)
    return (
      <div>
        <ul>
          {chapters &&
            chapters.map(chapter => (
              <ChapterItem
                chapter={chapter}
                lessons={chapter.lessons}
                key={chapter._id}
              />
            ))}
        </ul>
      </div>
    )
  }
}
export default ChapterList
