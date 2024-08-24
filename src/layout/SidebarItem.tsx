import { Link, useLocation } from "react-router-dom";

interface SidebarItemProps {
  title: string;
  path: string;
  icon: React.ReactNode;
}

function SidebarItem(props: SidebarItemProps) {
  const location = useLocation();
  const { title, path, icon } = props;
  const activePath = location.pathname === path ? 'normal' : 'info'
  return (
    <div className="w-[160px] mt-4">
      <Link to={path}>
        <div color={activePath} className="text-white py-4 text-sm drop-shadow-[1px_2px_rgba(0,0,0,0.4)] hover:text-[#0071ba] duration-300 flex items-center" style={{ outline: 'none' }}>
          <div className="mr-1">
            {icon}
          </div>
          {title}
        </div>
      </Link>
    </div>
  )
}

export default SidebarItem;