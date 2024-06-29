import BaseButton from "../common/BaseButton";

interface SidebarItemProps {
  title: string;
  path: string;
}

function SidebarItem(props: SidebarItemProps) {
  const { title, path } = props;
  return (
    <div className="w-[140px]">
      <a href={path}>
        <BaseButton fullWidth className="py-4 text-white min-h-[80px] text-sm" style={{ outline: 'none' }}>
          {title}
        </BaseButton>
      </a>
    </div>
  )
}

export default SidebarItem;