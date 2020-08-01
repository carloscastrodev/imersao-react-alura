import React, { useState } from 'react';
import FieldFormInput from '../FieldFormInput';
import StyledButton from '../styled/StyledButton';
import './styles.css';
import { FaPlus, FaClosedCaptioning } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import Modal from '../Modal';
import CategoryList from '../CategoryList';
import useWindowDimensions from '../hooks/windowDimensions';

const UploadForm = ({ fields, submitCallback, categoriesTitles }) => {
  const [fieldsValues, setFieldsValues] = useState({});
  const [showModal, setShowModal] = useState(false);
  const { width } = useWindowDimensions();

  const handleSubmit = e => {
    e.preventDefault();
    if (submitCallback) {
      const submitSuccess = submitCallback({ videoData: fieldsValues });
      if (submitSuccess === true) {
        setFieldsValues({});
      }
    }
  };

  const handleOpenCategories = () => {
    setShowModal(true);
  };

  const handleCloseCategories = () => {
    setShowModal(false);
  };

  const handleChooseCategory = categoryTitle => {
    setFieldsValues(
      Object.assign({}, fieldsValues, { category: categoryTitle }),
    );
    handleCloseCategories();
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
            pattern={field.pattern || null}
            warningText={field.warningText || null}
            required={field.required}
          />
        ))}
        <div className="controls-wrapper">
          <StyledButton
            onClick={handleOpenCategories}
            className="categories-button"
            type="button"
          >
            <span role="img" aria-label="Sinal de mais">
              <GiHamburgerMenu size={'1.2rem'} />
            </span>
            {width > 375 && <p>CATEGORIAS CADASTRADAS</p>}
          </StyledButton>
          <StyledButton type="submit" className="submit-button">
            <span role="img" aria-label="Sinal de mais">
              <FaPlus size={'1.2rem'} />
            </span>
            {width > 375 && <p>CADASTRAR</p>}
          </StyledButton>
        </div>
      </form>
      {showModal && (
        <Modal handleClose={handleCloseCategories}>
          <CategoryList
            categories={categoriesTitles}
            setCategory={handleChooseCategory}
          />
        </Modal>
      )}
    </>
  );
};

export default UploadForm;