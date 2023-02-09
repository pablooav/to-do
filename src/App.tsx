
import './global.css'
import styles from './App.module.css';
import { TaskList } from './components/TaskList/TaskList';
import { Header } from './components/Header/Header';

function App() {
  return (
    <div >
      <Header />

      <div className={styles.wrapper}>
        <TaskList />
      </div>
      
    </div>
  )
}

export default App
