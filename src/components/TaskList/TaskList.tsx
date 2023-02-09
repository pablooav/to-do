import { PlusCircle } from "phosphor-react";
import { ChangeEvent, useState } from "react";
import { Task } from "../Task/Task";
import {v4 as uuidv4} from 'uuid';

import styles from "./TaskList.module.css";

interface ITask {
  id: string;
  description: string;
  checked: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState([] as ITask[]);
  const [newTaskText, setNewTaskText] = useState('');
  const [countTaskCreated, setCountTaskCreated] = useState(0);
  const [countTaskDone, setCountTaskDone] = useState(0);

  function handleCreateNewTask() {
    if(!newTaskText) return
    const newTask = {
      id: uuidv4(),
      description: newTaskText,
      checked: false,
    };

    setTasks([...tasks, newTask]);
    setNewTaskText('');
    setCountTaskCreated(countTaskCreated + 1)
  }

  function handleNewTaskTextChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskText(event.target.value);
  }

  function deleteTask(taskId: string) {
    const tasksWithoutDeleteOne = tasks.filter(task => task.id !== taskId);
    setTasks(tasksWithoutDeleteOne);
    setCountTaskCreated(countTaskCreated - 1)

    const taskToDelete = tasks.find(task => task.id === taskId);
    if (taskToDelete?.checked) {
      setCountTaskDone(countTaskDone - 1);
    }
  }

  function clickCheckBox(taskId: string) {
    const indexTaskToChange = tasks.findIndex(task => task.id === taskId);
    const newTasks = [...tasks];
    newTasks[indexTaskToChange].checked = !newTasks[indexTaskToChange].checked;
    setTasks(newTasks);

    newTasks[indexTaskToChange].checked ? setCountTaskDone(countTaskDone + 1) : setCountTaskDone(countTaskDone - 1);
    
  }

  return (
    <>
      <div className={styles.newTaskContent}>
        <input 
          placeholder="Adicione uma nova tarefa" 
          onChange={handleNewTaskTextChange} 
          value={newTaskText} >
        </input>
        <button onClick={handleCreateNewTask}>
          Criar <PlusCircle weight="bold" />
        </button>
      </div>

      <article className={styles.tasks}>
        <header>
          <div className={styles.created}>
            <strong>Tarefas Criadas </strong>
            <span>{countTaskCreated}</span>
          </div>

          <div className={styles.done}>
            <strong>Concluídas </strong>
            <span>{countTaskDone} de {countTaskCreated}</span>
          </div>
        </header>

        <div className={styles.tasksList}>
          {
            tasks.map(task => {
              return <Task key={task.id} id={task.id} description={task.description} checked={task.checked} onDeleteTask={deleteTask} onClickCheckBox={clickCheckBox} />
            })
          }
        </div>
      </article>
    </>
  );
}
