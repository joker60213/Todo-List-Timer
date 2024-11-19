import React, { useState } from 'react';
import PropTypes from 'prop-types';
import NewTaskForm from '../newTaskForm';
import Footer from '../footer';
import TaskList from '../taskList';
import './App.css';

const App = ({ dataStream: initialDataStream, filterData: initialFilterData }) => {
  const [dataStream, setDataStream] = useState(initialDataStream || [
    createTodoItem('Completed task', 10, 0),
    createTodoItem('Editing task', 10, 0),
    createTodoItem('Active task', 10, 0),
  ]);
  
  const [filterData, setFilterData] = useState(initialFilterData || 'all');

  // Функция для создания новой задачи
  const createTodoItem = (description, minValue, secValue) => {
    const id = Date.now() + Math.floor(Math.random() * 10000);
    const trimDescription = description.replace(/ +/g, ' ').trim();
    let minValueNumber = +minValue;
    let secValueNumber = +secValue;

    if (secValueNumber > 60) {
      minValueNumber += Math.trunc(secValueNumber / 60);
      secValueNumber -= Math.trunc(secValueNumber / 60) * 60;
    }

    return {
      id,
      description: trimDescription,
      dateCreate: new Date(),
      compleeted: false,
      editing: false,
      minValue: minValueNumber,
      secValue: secValueNumber,
    };
  };

  const addItem = (description, minValue, secValue) => {
    const newItem = createTodoItem(description, minValue, secValue);
    setDataStream((prevDataStream) => [...prevDataStream, newItem]);
  };

  const changeDescription = (id, description) => {
    setDataStream((prevDataStream) => 
      prevDataStream.map((el) =>
        el.id === id ? { ...el, description, compleeted: false, editing: false } : el
      )
    );
  };

  const editingItem = (id) => {
    setDataStream((prevDataStream) =>
      prevDataStream.map((el) =>
        el.id === id ? { ...el, editing: true } : el
      )
    );
  };

  const completedItem = (id) => {
    setDataStream((prevDataStream) =>
      prevDataStream.map((el) =>
        el.id === id ? { ...el, compleeted: !el.compleeted } : el
      )
    );
  };

  const deletedItem = (id) => {
    setDataStream((prevDataStream) => prevDataStream.filter((el) => el.id !== id));
  };

  const clearCompleted = () => {
    setDataStream((prevDataStream) => prevDataStream.filter((el) => el.compleeted === false));
  };

  const handleFilterData = (event) => {
    setFilterData(event.target.innerText.toLowerCase());
  };

  const notCompletedCount = dataStream.filter((el) => !el.compleeted).length;

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm addNewItem={addItem} />
      </header>
      <section className="main">
        <TaskList
          taskData={dataStream}
          onCheckBoxClick={completedItem}
          onDeletedClick={deletedItem}
          onEditClick={editingItem}
          onChangeDescription={changeDescription}
          filterData={filterData}
        />
        <Footer
          notCompleetedCount={notCompletedCount}
          clearCompleted={clearCompleted}
          setFilterData={handleFilterData}
        />
      </section>
    </section>
  );
};

App.defaultProps = {
  dataStream: [
    {
      id: 101,
      description: 'Cписок задач',
      dateCreate: new Date(),
      compleeted: false,
      editing: false,
      minValue: 10,
      secValue: 0,
    },
  ],
  filterData: 'all',
};

// Определение типов пропсов
App.propTypes = {
  dataStream: PropTypes.instanceOf(Array),
  filterData: PropTypes.string,
};

export default App;

// +