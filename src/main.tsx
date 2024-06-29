import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router/index.tsx'
import Sidebar from './components/Sidebar/index.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="flex w-screen bg-[#F0F0F0]">
      <Sidebar />
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>,
)
