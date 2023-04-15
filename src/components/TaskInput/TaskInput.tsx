import { Input } from 'antd'
import { useEffect, useState } from 'react'
import { Todo } from '../../@types/todo.type'
import styles from './taskInput.module.scss'
import { DevTool } from '@hookform/devtools'
import { useForm } from 'react-hook-form'

interface TaskInputProps {
  addTodo: (name: string | null) => void
  currentTodo: Todo | null
  editTodo: (name: string) => void
  finishEditTodo: () => void
  trigger: boolean
  formValue: string
}
type formValue = {
  task: string
}

export default function TaskInput(props: TaskInputProps) {
  const { addTodo, currentTodo, editTodo, finishEditTodo,  trigger, formValue } = props

  const [name, setName] = useState<string | null>('')

  const form = useForm<formValue>({
    defaultValues: {
      task: currentTodo ? currentTodo.name : name
    }
  })
  const { register, formState, control, handleSubmit, clearErrors, setValue } = form

  const { errors } = formState

  const onSubmit = (data: formValue) => {
    if (currentTodo) {
      finishEditTodo()
      if (name) setName('')
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

  useEffect(() => {
    clearErrors()
    setValue('task',`${currentTodo?currentTodo.name:name}`)
  }, [trigger])

  useEffect(() => {
    setValue('task',formValue)
  }, [formValue])

  return (
    <div className='mb-2'>
      <h1 className={styles.title}>To do list</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <>
          <input
            type='text'
            placeholder='Caption goes here'
            value={currentTodo ? currentTodo.name : name}
            // onChange={onChangeInput}
            {...register('task', {
              onChange: onChangeInput,
              required: {
                value: true,
                message: 'Không được để trống'
              }
            })}
          />

          <button type='submit'>{currentTodo ? '✔️' : '➕'}</button>
          <p>{errors.task?.message}</p>
        </>
      </form>
      <DevTool control={control} />
    </div>
  )
}
