import { RouterProvider } from 'react-router-dom'
import './App.css'
import router from './router'
import { useEffect } from 'react'
import { useSystemsStore } from './zustand/systems.store'
import { useGroupsStore } from './zustand/groups.store'
import { isAuthenticated } from './utils/isAuthenticated'
import { useInformationSettingsStore } from './zustand/information_settings.store'
import { useAuthStore } from './zustand/auth.store'
import { NotificationProvider } from './context/NotificationContext'

function App() {

  const { getSystems } = useSystemsStore();
  const { getGroups } = useGroupsStore();
  const { getInformation } = useInformationSettingsStore();
  const { getUser } = useAuthStore();

  useEffect(() => {
    (async() => {
      if(isAuthenticated()) {
        await getUser();
        await getSystems();
        await getGroups();
        await getInformation();
      }
    })()
  }, [getGroups, getInformation, getSystems, getUser]) 
  return (
    <NotificationProvider>
      <div className="flex">
        <RouterProvider router={router} />
      </div>
    </NotificationProvider>
  )
}

export default App
