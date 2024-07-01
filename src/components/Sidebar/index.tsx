import MenuSidebar from "../../config/MenuSidebar";
import SidebarItem from "./SidebarItem";
import { Outlet } from "react-router-dom";

function Sidebar() {
  return (
    <>
      <div className="h-screen w-[160px]">
        <div className="bg-white w-[160px] opacity-85 fixed top-0 bottom-0 left-0 rounded-r-xl bg-no-repeat">
          {MenuSidebar.map((menu) => (
            <div className="flex items-center justify-center py-2" key={menu.path}>
              <SidebarItem title={menu.title} path={menu.path} />
            </div>
          ))}
        </div>
        <div className="w-[160px]" />
      </div>
      <div className="w-full">
        <Outlet />
      </div>
    </>
  )
}

export default Sidebar;