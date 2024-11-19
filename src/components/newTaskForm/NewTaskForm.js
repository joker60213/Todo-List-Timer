import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

const NewTaskForm = ({ addNewItem }) => {
  const [description, setDescription] = useState('');
  const [minValue, setMinValue] = useState('');
  const [secValue, setSecValue] = useState('');
  const placeholder = 'What needs to be done?';

  const onDescriptionChange = (event) => {
    const { name, value } = event.target;
    if (name === 'description') {
      setDescription(value);
    } else if (name === 'minValue') {
      setMinValue(value);
    } else if (name === 'secValue') {
      setSecValue(value);
    }
  };

  const onSubmitForm = (event) => {
    if (event.key === 'Enter') {
      const trimDescription = description.replace(/ +/g, ' ').trim();

      if (trimDescription === '') {
        addNewItem('Имя задачи не задано', minValue, secValue);
      } else {
        addNewItem(trimDescription, minValue, secValue);
      }

      // Сброс состояния после добавления задачи
      setDescription('');
      setMinValue('');
      setSecValue('');
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <form className="new-todo-form" onKeyPress={onSubmitForm}>
      <input
        className="new-todo"
        name="description"
        placeholder={placeholder}
        onChange={onDescriptionChange}
        value={description}
      />
      {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
      <input
        className="new-todo-form__timer"
        name="minValue"
        placeholder="Min"
        onChange={onDescriptionChange}
        value={minValue}
      />
      {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
      <input
        className="new-todo-form__timer"
        name="secValue"
        placeholder="Sec"
        onChange={onDescriptionChange}
        value={secValue}
      />
    </form>
  );
};

NewTaskForm.defaultProps = {
  addNewItem: () => {},
};

NewTaskForm.propTypes = {
  addNewItem: PropTypes.func,
};

export default NewTaskForm;

// готово +