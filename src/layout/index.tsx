import { Button, Skeleton } from "antd";
import MenuSidebar from "../config/MenuSidebar";
import { useAuthStore } from "../zustand/auth.store";
import SidebarItem from "./SidebarItem";
import { Outlet } from "react-router-dom";
import { LogOut } from "../services/auth";
import { useState } from "react";
import ChangePassword from "../components/ChangePassword";

function Layout() {
  const { user } = useAuthStore();
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const currentRole = user.role;

  return (
    <>
      <div className="fixed top-0 left-[180px] right-0 h-[60px] bg-black z-[100]">
        <div className="relative top-0 h-full">
          <div className="flex items-center justify-end h-full gap-4 px-4">
            <div className="px-2 py-1 rounded-md text-white">{user.name}</div>
            <Button className="px-4 py-4" onClick={() => setOpenChangePassword(true)}>Đổi mật khẩu</Button>
            <Button className="px-4 py-4" onClick={() => LogOut()}>Đăng xuất</Button>
          </div>
        </div>
      </div>
      <div className="h-screen w-[180px] z-[100]">
        <div className="bg-black w-[180px] fixed top-0 bottom-0 left-0 bg-no-repeat text-start">
          {MenuSidebar.map((menu) => (
            currentRole ? (
              menu.allowedRoles.includes(currentRole) && (
                <div className="flex items-center justify-center" key={menu.path}>
                  <SidebarItem menu={menu} />
                </div>
              )
            ) : (
              <div className="flex items-center justify-center p-2 w-full m-auto" key={menu.path}>
                <Skeleton.Button className="!w-full !rounded-md" active />
              </div>
            )
          ))}
        </div>
        <div className="w-[180px]" />
      </div>
      {openChangePassword && <ChangePassword open={openChangePassword} onClose={() => setOpenChangePassword(false)} />}
      <div className="w-[calc(100vw-197px)] mt-[60px]">
        <Outlet />
      </div>
    </>
  )
}

export default Layout;