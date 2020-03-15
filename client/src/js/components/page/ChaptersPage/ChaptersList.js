import React, { Component } from 'react'

import ChaptersItem from './ChaptersItem'

class ChapterList extends Component {
  render() {
    const chapters = this.props.chapters
    console.log(1, chapters)
    return (
      <div>
        <ul>
          {chapters &&
            chapters.map(chapter => (
              <ChaptersItem
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
