import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class LessonsChapterItem extends Component {
  render() {
    const { _id, slug, chapter1 } = this.props.lesson

    return (
      <li className="list-group-item" key={_id}>
        <Link to={`/chapter/${slug}`}>{chapter1}</Link>
      </li>
    )
  }
}
export default LessonsChapterItem
