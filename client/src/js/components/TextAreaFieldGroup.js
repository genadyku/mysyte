import React from 'react'

const TextAreaFieldGroup = ({ name, placeholder, value, onChange }) => {
  return (
    <div>
      <textarea
        placeholder={placeholder}
        name={name}
        value={value}
        rows="35"
        cols="40"
        onChange={onChange}
      />
    </div>
  )
}

export default TextAreaFieldGroup
