import { useEffect } from "react";
import withAuth from "../../hocs/withAuth";
import { useSystemsStore } from "../../zustand/systems.store";
import { useGroupsStore } from "../../zustand/groups.store";
import { useInformationSettingsStore } from "../../zustand/information_settings.store";

function Home() {

  const { getSystems } = useSystemsStore();
  const { getGroups } = useGroupsStore();
  const { getInformation } = useInformationSettingsStore();

  useEffect(() => {
    (async () => {
      await getSystems();
      await getGroups();
      await getInformation();
    })()
  }, [getGroups, getInformation, getSystems])
  return (
    <div className="bg-[url('./assets/background-home.jpg')] h-[calc(100vh-60px)] bg-no-repeat bg-cover flex">

    </div>
  )
}

const HomeWithAuth = withAuth(Home);

export default HomeWithAuth;

