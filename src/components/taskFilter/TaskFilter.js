import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './TaskFilter.css';

const TaskFilter = ({ setFilterData }) => {
  const [activeButton, setActiveButton] = useState('all');

  const onClickButton = (event) => {
    const buttonClicked = event.target.innerText.toLowerCase();
    
    // Обновляем состояние активной кнопки
    setActiveButton(buttonClicked);
    
    // Передаем данные фильтра
    setFilterData(event);
  };

  return (
    <ul className="filters">
      <li>
        <button
          type="button"
          className={activeButton === 'all' ? 'selected' : ''}
          onClick={onClickButton}
        >
          All
        </button>
      </li>
      <li>
        <button
          type="button"
          className={activeButton === 'active' ? 'selected' : ''}
          onClick={onClickButton}
        >
          Active
        </button>
      </li>
      <li>
        <button
          type="button"
          className={activeButton === 'completed' ? 'selected' : ''}
          onClick={onClickButton}
        >
          Completed
        </button>
      </li>
    </ul>
  );
};

TaskFilter.defaultProps = {
  setFilterData: () => {},
};

TaskFilter.propTypes = {
  setFilterData: PropTypes.func,
};

export default TaskFilter;

// готово +