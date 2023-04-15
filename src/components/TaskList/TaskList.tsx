import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Todo } from '../../@types/todo.type'
import styles from './taskList.module.scss'

interface TaskListProps {
  doneTaskList?: boolean
  todos: Todo[]
  handleDoneTodo: (id: string, done: boolean) => void
  startEditTodo: (id: string) => void
  deleteTodo: (id: string) => void
  handleTrigger: () => void
}

export default function TaskList(props: TaskListProps) {
  const { doneTaskList, todos, handleDoneTodo, startEditTodo, deleteTodo,handleTrigger } = props

  // const handleChangeCheckbox = (idTodo: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
  //   handleDoneTodo(idTodo, event.target.checked)
  // }
  const {clearErrors,register} =useForm()

  return (
    <div>
      <h2 className={styles.title}>{doneTaskList ? 'Hoàn thành' : 'Chưa hoàn thành'}</h2>

      <div className={styles.tasks}>
        {todos.map((todo) => (
          <div className={styles.task} key={todo.id}>
            <input
              type='checkbox'
              className={styles.taskCheckbox}
              checked={todo.done}
              onChange={(event) => {
                handleDoneTodo(todo.id, event.target.checked)
              }}
            />
            <span className={`${styles.taskName} ${todo.done ? styles.taskNameDone : ''}`}>{todo.name}</span>
            <div className={styles.taskAction}>
              <button
                className={styles.taskBtn}
                onClick={() => {
                  startEditTodo(todo.id)
                  handleTrigger()
                  
                }}
              >
                🖊️
              </button>
              <button className={styles.taskBtn} onClick={() => deleteTodo(todo.id)}>
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
