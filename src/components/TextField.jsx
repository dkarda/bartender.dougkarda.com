import React, { useState } from 'react';

function TextField(props) {
  const [value, setValue] = useState(props.defaultValue || '');

  const handleChange = (event) => {
    setValue(event.target.value);
    if (props.onChange) {
      props.onChange(event);
    }
  };

  return (
    <h5 className="text-field-wrapper">
      {props.label && <label htmlFor={props.id}>{props.label}: </label>}
      <input
        type="text"
        id={props.id}
        value={value}
        onChange={handleChange}
        placeholder={props.placeholder}
        {...props} // Pass any other props directly to the input element
      />
    </h5>
  );
}

export default TextField;