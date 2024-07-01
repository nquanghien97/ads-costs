import { HTMLAttributes, ReactNode } from "react";

interface ButtonIconProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}
function ButtonIcon( props: ButtonIconProps ) {
  const { children, ...rest } = props
  return (
    <div {...rest} className="w-8 h-8 rounded-full hover:bg-[#0000001a] flex items-center justify-center cursor-pointer duration-300">
      {children}
    </div>
  )
}

export default ButtonIcon;
