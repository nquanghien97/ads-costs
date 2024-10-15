import { Link, useLocation } from "react-router-dom";
import { MenuSidebar } from "../config/MenuSidebar";
import { useState } from "react";
import ArrowDown from "../assets/icons/ArrowDown";

interface SidebarItemProps {
  menu: MenuSidebar
}

function SidebarItem(props: SidebarItemProps) {
  const location = useLocation();
  const [showChildren, setShowChildren] = useState(false);
  const { menu } = props;
  const activePath = location.pathname === menu.path ? 'text-[black] bg-[white] rounded-md' : 'text-black'
  return (
    <div className="w-full mt-4">
      <Link to={menu.path}>
        <div
          className={`py-2 px-2 text-sm flex flex-col items-start ${activePath}`}
          style={{ outline: 'none' }}
        >
          <div className="flex items-center justify-start hover:scale-110 transform-scale duration-300" onClick={() => setShowChildren(pre => !pre)}>
            <div className="mr-1 py-1">
              {menu.icon}
            </div>
            <span>
              {menu.title}
            </span>
            {menu.children && (
              <div>
                {showChildren ? <ArrowDown className="duration-300" width={20} height={20} /> : <ArrowDown width={20} height={20} className="rotate-180 duration-300" />}
              </div>
            )}
          </div>
          <div className="flex justify-center w-full">
            <span className="text-center text-md text-[#8b8080]">{menu.subTitle}</span>
          </div>
          {
            showChildren && (
              <div className="flex flex-col pl-4 w-full">
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