import React, { useState } from 'react';
import FieldFormInput from '../FieldFormInput';
import StyledButton from '../styled/StyledButton';
import './styles.css';
import { FaPlus } from 'react-icons/fa';
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
      submitCallback({ videoData: fieldsValues }).then(response => {
        if (response === true) {
          const primaryField = fields.find(field => field.primary);
          const { dbKey } = primaryField;
          setFieldsValues({ [dbKey]: fieldsValues[dbKey] });
          return { submit: true };
        }
      });
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
      <form
        className="default-form"
        onSubmit={handleSubmit}
        name="create-video-form"
      >
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
            {width > 375 && <p>ANIMES CADASTRADOS</p>}
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
