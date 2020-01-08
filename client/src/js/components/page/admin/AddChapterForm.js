/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react'

import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'

import renderField from '../../renderField'

import { addChapter } from '../../../ducks/lesson'

var divStyle = {
  color: '#d9534f',
}
class AddLessonForm extends Component {
  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(values) {
    console.log(values)
    this.props.addChapter(values)
  }
  render() {
    const { handleSubmit } = this.props
    const { error } = this.props.errorMessage
    return (
      <div className="add-lesson">
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <Field
            name="chapter1"
            type="text"
            component={renderField}
            label="Название раздела*"
          />
          <Field
            name="title"
            type="text"
            component={renderField}
            label="Краткое описание раздела*"
          />
          <Field
            name="slug"
            type="text"
            component={renderField}
            label="Ссылка*"
          />
          <Field
            name="textf"
            type="text"
            component={renderField}
            label="Полное описание раздела*"
          />
          <div className="enter">
            <div className="row">
              <div className="col-8">
                <button type="submit" className="btn btn-primary">
                  Сохранить
                </button>
                <Link to="/" className="btn btn-error">
                  {' '}
                  Отмена
                </Link>
              </div>
            </div>
          </div>
          <div>
            {error && error.message && (
              <div style={divStyle}>{error.message}</div>
            )}
          </div>
        </form>
      </div>
    )
  }
}
const validate = props => {
  const errors = {}
  const fields = ['chapter1', 'title', 'slug', 'textf']

  fields.forEach(f => {
    if (!(f in props)) {
      errors[f] = 'Заполните поле'
    }
  })

  return errors
}
function mapStateToProps(state) {
  return { errorMessage: state.lesson }
}
export default reduxForm({
  form: 'add',
  validate,
})(
  connect(
    mapStateToProps,
    { addChapter }
  )(AddLessonForm)
)
