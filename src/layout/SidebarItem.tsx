import { Link, useLocation } from "react-router-dom";
import BaseButton from "../components/common/BaseButton";

interface SidebarItemProps {
  title: string;
  path: string;
}

function SidebarItem(props: SidebarItemProps) {
  const location = useLocation();
  const { title, path } = props;
  const activePath = location.pathname === path ? 'normal' : 'info'
  return (
    <div className="w-[140px]">
      <Link to={path}>
        <BaseButton color={activePath} fullWidth className="py-4 text-white min-h-[80px] text-sm drop-shadow-[1px_2px_rgba(0,0,0,0.4)]" style={{ outline: 'none' }}>
          {title}
        </BaseButton>
      </Link>
    </div>
  )
}

export default SidebarItem;