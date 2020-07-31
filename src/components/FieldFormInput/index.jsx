import React, { useState, useEffect } from 'react';
import './styles.css';
import WarningToast from '../WarningToast';

const FieldFormInput = ({
  placeholder,
  dbKey,
  fieldsValues,
  setFieldsValues,
  pattern,
  warningText,
  required = false,
}) => {
  const [hasText, setHasText] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [showWarningToast, setShowWarningToast] = useState(false);
  const selfRef = React.createRef();

  useEffect(() => {
    if (Object.keys(fieldsValues).length === 0) {
      setHasText(false);
    }
  }, [fieldsValues]);

  const setFocus = () => {
    setHasText(true);
    setInvalid(false);
  };

  const setUnfocus = () => {
    if (selfRef.current.value === '') {
      setHasText(false);
      setInvalid(false);
    } else {
      if (!invalid && pattern) {
        if (!fieldsValues[dbKey].match(pattern)) {
          setInvalid(true);
          setShowWarningToast(true);
        }
      }
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
    <>
      <div className="input-wrapper">
        <span
          className={`fake-placeholder  ${hasText && 'small-placeholder'} `}
        >
          {placeholder}
        </span>
        <input
          pattern={pattern ? pattern : null}
          ref={selfRef}
          onChange={handleChangeInputValue}
          onFocus={setFocus}
          onBlur={setUnfocus}
          className={`form-input ${invalid && 'form-input-invalid'}`}
          value={fieldsValues[dbKey] || ''}
          onInvalid={e => e.preventDefault()}
          required={required}
        />
      </div>
      {warningText && (
        <WarningToast
          warning={warningText}
          show={showWarningToast}
          setShow={setShowWarningToast}
        />
      )}
    </>
  );
};

export default FieldFormInput;
