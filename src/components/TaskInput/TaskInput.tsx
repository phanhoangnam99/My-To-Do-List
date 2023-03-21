import { Input } from 'antd'
import { useState } from 'react'
import { Todo } from '../../@types/todo.type'
import styles from './taskInput.module.scss'

interface TaskInputProps {
  addTodo: (name: string | null) => void
  currentTodo: Todo | null
  editTodo: (name: string) => void
  finishEditTodo: () => void
}

export default function TaskInput(props: TaskInputProps) {
  const { addTodo, currentTodo, editTodo, finishEditTodo } = props

  const [name, setName] = useState<string | null>('')
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (currentTodo) {
      if (currentTodo.name === '') {
        alert('hay nhap')
      }
      finishEditTodo()
      if (name) setName('')
    } else if (name === '') {
      alert('hay nhap')
    } else {
      addTodo(name)
      setName('')
    }
  }
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (currentTodo) {
      editTodo(value)
    } else {
      setName(value)
    }
  }

  return (
    <div className='mb-2'>
      <h1 className={styles.title}>To do list</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Caption goes here'
          value={currentTodo ? currentTodo.name : name}
          onChange={onChangeInput}
        />

        <button type='submit'>{currentTodo ? '✔️' : '➕'}</button>
      </form>
    </div>
  )
}
