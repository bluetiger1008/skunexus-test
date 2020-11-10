import React, { useState } from 'react';
import Modal from 'react-modal';

import './CreatePlanet.css';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const CreatePlanet = ({ open, closeModal }) => {
  const [formValues, setFormValues] = useState({
    name: '',
    rotation_period: 0,
    orbital_period: 0,
    diameter: 0,
    climate: '',
    gravity: '',
    terrain: '',
    surface_water: 0,
  });
  const [isFormError, setIsFormError] = useState(false);

  const onChangeInput = (e) => {
    setIsFormError(false);
    const values = { ...formValues };
    values[e.target.name] = e.target.value;

    setFormValues(values);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();

    if (
      formValues.name === '' ||
      formValues.climate === '' ||
      formValues.gravity === '' ||
      formValues.terrain === ''
    ) {
      setIsFormError(true);
    } else {
      setIsFormError(false);
      console.log('submit form');
    }
  };

  const renderInput = ({ type, fieldName, placeholder }) => (
    <div className='field-group'>
      <input
        type={type}
        placeholder={placeholder}
        name={fieldName}
        value={formValues[fieldName]}
        onChange={onChangeInput}
      />
      {isFormError && formValues[fieldName] === '' && (
        <p className='error'>This field is required</p>
      )}
    </div>
  );

  const renderSelect = ({ fieldName }) => (
    <div className='field-group'>
      <select
        name='terrain'
        value={formValues.terrain}
        onChange={onChangeInput}
      >
        <option value=''></option>
        <option value='1'>1</option>
        <option value='2'>2</option>
        <option value='3'>3</option>
        <option value='4'>4</option>
      </select>
      {isFormError && formValues[fieldName] === '' && (
        <p className='error'>This field is required</p>
      )}
    </div>
  );

  return (
    <Modal
      isOpen={open}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel='Example Modal'
    >
      <h2>Create new planet</h2>

      <form className='create-form' onSubmit={onSubmitForm}>
        {renderInput({ type: 'text', fieldName: 'name', placeholder: 'name' })}
        {renderInput({
          type: 'number',
          fieldName: 'rotation_period',
          placeholder: 'rotation period',
        })}
        {renderInput({
          type: 'number',
          fieldName: 'orbital_period',
          placeholder: 'orbital period',
        })}
        {renderInput({
          type: 'number',
          fieldName: 'diameter',
          placeholder: 'diameter',
        })}
        {renderInput({
          type: 'text',
          fieldName: 'climate',
          placeholder: 'climate',
        })}
        {renderInput({
          type: 'text',
          fieldName: 'gravity',
          placeholder: 'gravity',
        })}
        {renderSelect({ fieldName: 'terrain' })}
        {renderInput({
          type: 'number',
          fieldName: 'surface_water',
          placeholder: 'surface water',
        })}

        <button type='submit'>Submit</button>
        <button onClick={closeModal}>Close</button>
      </form>
    </Modal>
  );
};

export default CreatePlanet;
