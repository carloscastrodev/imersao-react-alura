import React, { useState } from 'react';
import FieldFormInput from '../FieldFormInput';
import StyledButton from '../styled/StyledButton';
import './styles.css';
import { FaPlus } from 'react-icons/fa';

const UploadForm = ({ fields, submitCallback }) => {
  const [fieldsValues, setFieldsValues] = useState({});

  const handleSubmit = e => {
    e.preventDefault();
    if (submitCallback) {
      submitCallback({ data: fieldsValues });
    }
    setFieldsValues({});
  };

  return (
    <>
      <form className="default-form" onSubmit={handleSubmit}>
        {fields.map(field => (
          <FieldFormInput
            key={field.dbKey}
            dbKey={field.dbKey}
            placeholder={field.placeholder}
            fieldsValues={fieldsValues}
            setFieldsValues={setFieldsValues}
            required={field.required}
          />
        ))}
        <StyledButton htmlFor="submit" className="submit-button">
          <span role="img" aria-label="Sinal de mais">
            <FaPlus size={'1.2rem'} />
          </span>
          <p>CADASTRAR</p>
        </StyledButton>
      </form>
    </>
  );
};

export default UploadForm;
