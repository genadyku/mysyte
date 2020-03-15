import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ChapterItem extends Component {
  render() {
    const { chapter1, _id, slug } = this.props.chapter

    return (
      <li className="sidebar-nav-link" key={_id}>
        <Link to={`/chapter/${slug}`}>{chapter1}</Link>
      </li>
    )
  }
}
export default ChapterItem
