import { TodoPage } from '@/todoapp/TodoPage'
import { Route, Routes } from 'react-router-dom'

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/*" element={<TodoPage />} />
    </Routes>
  )
}
