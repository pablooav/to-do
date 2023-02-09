import { PlusCircle, Trash } from "phosphor-react";
import styles from "./Task.module.css";

interface ITaskProps {
  id: string;
  description: string;
  checked?: boolean;
  onDeleteTask: (taskId: string) => void;
  onClickCheckBox: (taskId: string) => void;
}

export function Task({
  id,
  description,
  checked,
  onDeleteTask,
  onClickCheckBox,
}: ITaskProps) {
  function handleDeleteTask() {
    onDeleteTask(id);
  }

  function handleClickCheckBox() {
    onClickCheckBox(id);
  }

  return (
    <div className={styles.task + (checked ? ' ' + styles.checked : '')}>
      <label className={styles.container}>
        <input type="checkbox" onClick={handleClickCheckBox} readOnly />
        <span className={styles.checkmark}></span>
      </label>
      <label htmlFor="task">
        {description}
      </label>
      <Trash size={25} onClick={handleDeleteTask} />
    </div>
  );
}
