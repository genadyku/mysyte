import React from 'react'

const renderTextArea = ({
  textarea,
  label,
  value,
  meta: { touched, error, warning },
}) => (
  <div>
    <label>{label}</label>
    <div>
      <textarea
        {...textarea}
        placeholder={label}
        rows="10"
        cols="40"
        value={value}
      />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
)
export default renderTextArea
