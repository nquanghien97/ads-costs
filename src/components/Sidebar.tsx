import MenuSidebar from "../config/MenuSidebar";

function Sidebar() {
  return (
    <div className="w-[250px] h-screen bg-white opacity-85 fixed top-0 bottom-0 left-0 rounded-r-xl bg-no-repeat">
      {MenuSidebar.map((menu) => (
        <div>
          {menu.title}
        </div>
      ))}
    </div>
  )
}

export default Sidebar;