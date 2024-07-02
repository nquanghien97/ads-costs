import { RouterProvider } from 'react-router-dom'
import './App.css'
import router from './router'

function App() {
  return (
    <div className="flex bg-[#F0F0F0] w-screen">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
