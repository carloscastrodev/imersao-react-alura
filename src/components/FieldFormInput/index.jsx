import React, { useState, useEffect } from 'react';
import './styles.css';
import Toast from '../Toast';

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
    const isFocused = document.activeElement === selfRef.current;
    if (Object.keys(fieldsValues).length === 0 && !isFocused) {
      setHasText(false);
    } else {
      if (fieldsValues[dbKey]) {
        setHasText(true);
      }
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
        } else if (fieldsValues[dbKey].match(pattern)) {
          setInvalid(false);
          setShowWarningToast(false);
        }
      }
    }
  };

  const handleChangeInputValue = e => {
    let { value } = e.target;
    value = value.replace(/\s\s+/g, ' ');
    value = value.replace(/^\s/, '');

    if (value === ' ') {
      value = '';
    }
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
          className={`fake-placeholder  ${
            (hasText && 'small-placeholder') || ''
          } `}
        >
          {placeholder}
        </span>
        <input
          pattern={pattern ? pattern : null}
          ref={selfRef}
          onChange={handleChangeInputValue}
          onFocus={setFocus}
          onBlur={setUnfocus}
          className={`form-input ${(invalid && 'form-input-invalid') || ''}`}
          name={dbKey}
          value={fieldsValues[dbKey] || ''}
          onInvalid={e => e.preventDefault()}
          required={required}
        />
      </div>
      {showWarningToast && (
        <Toast
          text={warningText}
          show={showWarningToast}
          setShow={setShowWarningToast}
          warning={true}
        />
      )}
    </>
  );
};

export default FieldFormInput;
