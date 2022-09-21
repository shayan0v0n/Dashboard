import { Button, Grid, TextField } from '@mui/material'
import { Container } from '@mui/system'
import { useState } from 'react'
import ActiveListCard from '../Components/ActiveListCard';
import DoneListCard from '../Components/DoneListCard';
import uuid from 'react-uuid';

export const Todos = () => {
  const [ addTodo, setAddTodo ] = useState('');
  const currentStorage: any = localStorage.getItem("dashboard")
  const currentStorageJSON = JSON.parse(currentStorage);
  const [currentActiveList, setCurrentActiveList]: any[] = useState(currentStorageJSON.todos.activeList)
  const [currentDoneList, setCurrentDoneList]: any[] = useState(currentStorageJSON.todos.doneList)

  const setAddTodoHandler = (todo: string): void => {
    if (todo.trim().length == 0) return
    const allTodos = currentActiveList.concat(currentDoneList)
    const findedTodo = allTodos.findIndex((item: string) => {
      return item == todo
    })
    if (findedTodo !== -1) return
    const createTodoStructure = {
      name: todo,
      id: uuid()
    }

    const updateStorage: any[] = {
      ...currentStorageJSON,
      todos: {
        ...currentStorageJSON.todos,
        activeList: [...currentStorageJSON.todos.activeList, createTodoStructure]
      }
    }
    setCurrentActiveList([...currentStorageJSON.todos.activeList, createTodoStructure])
    localStorage.setItem('dashboard', JSON.stringify(updateStorage));

    setAddTodo('')
  }

  const deleteActiveListTodoHandler = (todo: any) => {
    const filteredActiveList = currentActiveList.filter((item: any) => {
      return item.id !== todo.id
    })

    const updateStorage: any[] = {
      ...currentStorageJSON,
      todos: {
        ...currentStorageJSON.todos,
        activeList: filteredActiveList
      }
    }

    setCurrentActiveList(filteredActiveList)
    localStorage.setItem('dashboard', JSON.stringify(updateStorage));
  }

  const AddActiveListTodoHandler = (todo: any) => {
    const filteredActiveList = currentActiveList.filter((item: any) => {
      return item.id !== todo.id
    })

    const updateStorage: any[] = {
      ...currentStorageJSON,
      todos: {
        activeList: filteredActiveList,
        doneList: [...currentStorageJSON.todos.doneList, todo]
      }
    }

    setCurrentActiveList(filteredActiveList)
    setCurrentDoneList([...currentStorageJSON.todos.doneList, todo])
    localStorage.setItem('dashboard', JSON.stringify(updateStorage));
  }
  
  const returnDoneListHandler = (todo: any) => {
    const filteredDoneList = currentDoneList.filter((item: any) => {
      return item.id !== todo.id
    })
  
    const updateStorage: any[] = {
      ...currentStorageJSON,
      todos: {
        doneList: filteredDoneList,
        activeList: [...currentStorageJSON.todos.activeList, todo]
      }
    }
  
    setCurrentActiveList([...currentStorageJSON.todos.activeList, todo])
    setCurrentDoneList(filteredDoneList)
    localStorage.setItem('dashboard', JSON.stringify(updateStorage));
  }

  const deleteDoneListHandler = (todo: any) => {
    const filteredDoneList = currentDoneList.filter((item: any) => {
      return item.id !== todo.id
    })

    const updateStorage: any[] = {
      ...currentStorageJSON,
      todos: {
        ...currentStorageJSON.todos,
        doneList: filteredDoneList
      }
    }

    setCurrentDoneList(filteredDoneList)
    localStorage.setItem('dashboard', JSON.stringify(updateStorage));
  }

  return (
    <main>
        <Container>
      <Grid container gap={2} justifyContent="center">
        <Grid item xs={12} md={5} margin="1rem" textAlign="center">
          <h2>َActive List🐷🍫</h2>
          { currentActiveList.map((todo: any) => (
            <ActiveListCard key={todo.id} currentTodo={todo} deleteActiveListTodo={deleteActiveListTodoHandler} AddActiveListTodo={AddActiveListTodoHandler}>
              <>{todo.name}</>
            </ActiveListCard>
          )) }
          <Grid container gap={1}>
            <Grid item xs={8}>
              <TextField id="filled-basic" label="Add Todo" variant="outlined" value={addTodo} onChange={(e) => setAddTodo(e.target.value)} fullWidth/>
            </Grid>
            <Grid item xs={3}>
              <Button variant='contained' color='primary' fullWidth sx={{ height: '100%' }} onClick={() => setAddTodoHandler(addTodo)}>Submit</Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={5} margin="1rem" textAlign="center">
          <h2>Done List🐨🍭</h2>
          { currentDoneList.map((todo: any) => (
              <DoneListCard key={todo.id} currentTodo={todo} returnDoneList={returnDoneListHandler} deleteDoneList={deleteDoneListHandler}>
                {todo.name}
              </DoneListCard>
          )) }
        </Grid>
      </Grid>
        </Container>
    </main>
  )
}