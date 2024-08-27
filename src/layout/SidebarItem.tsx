import { Link, useLocation } from "react-router-dom";
import { MenuSidebar } from "../config/MenuSidebar";
import ArrowUp from "../assets/icons/ArrowUp";
import { useState } from "react";
import ArrowDown from "../assets/icons/ArrowDown";

interface SidebarItemProps {
  menu: MenuSidebar
}

function SidebarItem(props: SidebarItemProps) {
  const location = useLocation();
  const [showChildren, setShowChildren] = useState(false);
  const { menu } = props;
  const activePath = location.pathname === menu.path ? 'text-[#f3ec90]' : 'text-white'
  return (
    <div className="w-[160px] mt-4">
      <Link to={menu.path}>
        <div
          className='text-white py-4 text-sm drop-shadow-[1px_2px_rgba(0,0,0,0.4)] flex flex-col items-start'
          style={{ outline: 'none' }}
        >
          <div className="flex items-center justify-start hover:text-[#0071ba] duration-300" onClick={() => setShowChildren(pre => !pre)}>
            <div className="mr-1">
              {menu.icon}
            </div>
            {menu.title}
            {menu.children && (
              <div>
                {showChildren ? <ArrowDown width={20} height={20} /> : <ArrowUp width={20} height={20} />}
              </div>
            )}
          </div>
          {
            showChildren && (
              <div className="flex flex-col pl-4">
                {menu.children && (
                  menu.children.map((childMenu) => (
                    <SidebarItem key={childMenu.path} menu={childMenu} />
                  ))
                )}
              </div>)
          }
        </div>
      </Link>
    </div>
  )
}

export default SidebarItem;