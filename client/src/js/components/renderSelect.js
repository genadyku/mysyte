import React from 'react'

const renderSelect = ({ input, label, meta: { touched, error }, children }) => (
  <div>
    <label>{label}</label>
    <div>
      <select {...input}>{children}</select>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)
export default renderSelect
