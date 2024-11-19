import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Task.css';

const Task = ({
  description,
  checked,
  timeAfterCreate,
  onEditClick,
  onDeletedClick,
  onCheckBoxClick,
  minValue,
  secValue
}) => {
  const [min, setMin] = useState(minValue);
  const [sec, setSec] = useState(secValue);
  const [isCounting, setIsCounting] = useState(false);
  let counterID = null;

  // Очистка интервала при размонтировании компонента
  useEffect(() => {
    return () => {
      clearInterval(counterID);
    };
  }, []);

  const minDecrement = () => {
    setMin((prevMin) => prevMin - 1);
    setSec(59);
  };

  const secDecrement = () => {
    if (min === 0 && sec === 0 && isCounting === true) {
      onCheckBoxClick();
      clearInterval(counterID);
      setIsCounting(false);
    } else if (sec > 0) {
      setSec((prevSec) => prevSec - 1);
      setIsCounting(true);
    } else {
      minDecrement();
    }
  };

  const handlePause = (event) => {
    event.stopPropagation();
    setIsCounting(false);
    clearInterval(counterID);
  };

  const handleStart = (event) => {
    event.stopPropagation();
    setIsCounting(true);
    counterID = setInterval(secDecrement, 1000);
  };

  const buttonTimer = !isCounting ? (
    <button type="button" className="icon icon-play" onClick={handleStart} />
  ) : (
    <button type="button" className="icon icon-pause" onClick={handlePause} />
  );

  return (
    <div className="view">
      <input
        className="toggle"
        type="checkbox"
        readOnly
        onClick={onCheckBoxClick}
        checked={checked}
      />

      <div className="label">
        <span role="presentation" className="title" onClick={onCheckBoxClick}>
          {description}
        </span>
        <span className="description">
          {buttonTimer}
          <span className="description__time-value">
            {min}:{sec < 10 ? `0${sec}` : sec} {/* Добавляем ведущее 0 для секунд */}
          </span>
        </span>
        <span className="created">created {timeAfterCreate} ago</span>
      </div>
      <button type="button" className="icon icon-edit" onClick={onEditClick} aria-label="edit" />
      <button type="button" className="icon icon-destroy" onClick={onDeletedClick} aria-label="delete" />
    </div>
  );
};

Task.defaultProps = {
  description: 'Имя не задано',
  checked: false,
  timeAfterCreate: 'N/A',
  onEditClick: () => {},
  onDeletedClick: () => {},
  onCheckBoxClick: () => {},
};

Task.propTypes = {
  checked: PropTypes.bool,
  onCheckBoxClick: PropTypes.func,
  description: PropTypes.string,
  timeAfterCreate: PropTypes.string,
  onEditClick: PropTypes.func,
  onDeletedClick: PropTypes.func,
  minValue: PropTypes.number.isRequired,
  secValue: PropTypes.number.isRequired,
};

export default Task;

// готово +