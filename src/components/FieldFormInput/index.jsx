import React, { useState } from 'react';
import './styles.css';

const FieldFormInput = ({
  placeholder,
  dbKey,
  fieldsValues,
  setFieldsValues,
  required = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const selfRef = React.createRef();

  const setFocus = () => {
    setIsFocused(true);
  };

  const setUnfocus = () => {
    if (selfRef.current.value === '') {
      setIsFocused(false);
    }
  };

  const handleChangeInputValue = e => {
    const { value } = e.target;

    if (value !== '') {
      setFieldsValues(
        Object.assign({}, { ...fieldsValues }, { [dbKey]: value }),
      );
    } else {
      const newValues = { ...fieldsValues };
      delete newValues[dbKey];
      setFieldsValues(newValues);
    }
  };

  return (
    <div className="input-wrapper">
      <span className={`fake-placeholder  ${isFocused && 'small-placeholder'}`}>
        {placeholder}
      </span>
      <input
        ref={selfRef}
        onChange={handleChangeInputValue}
        onFocus={setFocus}
        onBlur={setUnfocus}
        className="form-input"
        value={fieldsValues[dbKey] || ''}
        required={required}
      ></input>
    </div>
  );
};

export default FieldFormInput;
