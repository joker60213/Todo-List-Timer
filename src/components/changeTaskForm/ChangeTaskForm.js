import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ChangeTaskForm.css';

const ChangeTaskForm = ({ description, id, onChangeDescription }) => {
  const [newDescription, setNewDescription] = useState('');

  const onDescriptionChange = (event) => {
    setNewDescription(event.target.value.replace(/ +/g, ' ').trim());
  };

  const onKeyPress = (event) => {
    if (event.key === 'Enter') {
      if (newDescription === '') {
        onChangeDescription(id, description);
      } else {
        onChangeDescription(id, newDescription);
      }
      setNewDescription('');
    }
  };

  return (
    <input
      type="text"
      className="edit"
      placeholder={description}
      value={newDescription}
      onChange={onDescriptionChange}
      onKeyPress={onKeyPress}
    />
  );
};

// Установка значений по умолчанию
ChangeTaskForm.defaultProps = {
  description: '',
  onChangeDescription: () => {},
};

// Определение типов пропсов
ChangeTaskForm.propTypes = {
  description: PropTypes.string,
  id: PropTypes.number.isRequired,
  onChangeDescription: PropTypes.func,
};

export default ChangeTaskForm;