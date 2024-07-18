import { Button, notification, Skeleton } from "antd";
import MenuSidebar from "../../config/MenuSidebar";
import { useAuthStore } from "../../zustand/auth.store";
import SidebarItem from "./SidebarItem";
import { Outlet } from "react-router-dom";
import { LogOut } from "../../services/auth";
import { useState } from "react";
import ChangePassword from "../ChangePassword";

function Sidebar() {
  const { user } = useAuthStore();
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const currentRole = user.role;

  const [api, contextHolder] = notification.useNotification();
  
  return (
    <>
      {contextHolder}
      <div className="fixed top-0 left-[160px] right-0 h-[60px] bg-[#0071ba]">
        <div className="relative top-0 h-full">
          <div className="flex items-center justify-end h-full gap-4 px-4">
            <Button className="px-4 py-2" onClick={() => setOpenChangePassword(true)}>Đổi mật khẩu</Button>
            <Button className="px-4 py-2" onClick={() => LogOut()}>Đăng xuất</Button>
          </div>
        </div>
      </div>
      <div className="h-screen w-[160px] z-[100]">
        <div className="bg-white w-[160px] opacity-85 fixed top-0 bottom-0 left-0 rounded-r-xl bg-no-repeat">
          {MenuSidebar.map((menu) => (
            currentRole ? (
              menu.allowedRoles.includes(currentRole) && (
                <div className="flex items-center justify-center p-2" key={menu.path}>
                  <SidebarItem title={menu.title} path={menu.path} />
                </div>
              )
            ) : (
              <div className="flex items-center justify-center p-2 w-[140px] min-h-[80px] m-auto" key={menu.path}>
                <Skeleton.Button className="!w-full !min-h-[80px] !rounded-full" active />
              </div>
            )
          ))}
        </div>
        <div className="w-[160px]" />
      </div>
      {openChangePassword && <ChangePassword open={openChangePassword} onClose={() => setOpenChangePassword(false)} api={api} />}
      <div className="w-[calc(100vw-177px)] mt-[60px]">
        <Outlet />
      </div>
    </>
  )
}

export default Sidebar;