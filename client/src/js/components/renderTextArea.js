import React from 'react'

const renderTextArea = ({
  input,
  label,
  meta: { touched, error, warning },
}) => (
  <div>
    <label>{label}</label>
    <div>
      <textarea {...input} placeholder={label} rows="10" cols="40" />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
)
export default renderTextArea
