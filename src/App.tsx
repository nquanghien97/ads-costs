import { RouterProvider } from 'react-router-dom'
import './App.css'
import router from './router'
import { useEffect } from 'react'
import { useSystemsStore } from './zustand/systems.store'
import { useGroupsStore } from './zustand/groups.store'
import { isAuthenticated } from './utils/isAuthenticated'
import { useInformationSettingsStore } from './zustand/information_settings.store'

function App() {

  const { getSystems } = useSystemsStore();
  const { getGroups } = useGroupsStore();
  const { getInformation } = useInformationSettingsStore();

  useEffect(() => {
    (async() => {
      if(isAuthenticated()) {
        await getSystems();
        await getGroups();
        await getInformation();
      }
    })()
  }, [getGroups, getInformation, getSystems]) 
  return (
    <div className="flex bg-[#F0F0F0]">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
