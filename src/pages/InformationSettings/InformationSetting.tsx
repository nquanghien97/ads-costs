import { useState } from "react";
import PlusIcon from "../../assets/icons/PlusIcon"
import AddNewInformation from "./AddNewInformation";

interface InformationSettingProps {
  data: {id: number, name: string}[];
  title: string;
}

function InformationSetting(props: InformationSettingProps) {
  const { data, title } = props;
  const [openModalAddInformation, setOpenModalAddInformation] = useState(false);
  return (
    <div className="flex items-center border border-sky-500 p-2 rounded-xl">
      <div className="mr-4 px-6 py-2 rounded-full bg-[#0071BA] text-white uppercase text-center w-[200px]">
        <span>{title}</span>
      </div>
      <ul className="flex flex-wrap items-center">
        {data.map((item) => (
          <li key={item.id} className="mr-4 px-6 py-2 my-2 rounded-full bg-[#29A9E0] text-white uppercase text-center min-w-[120px]">
            {item.name}
          </li>
        ))}
        <div className="!bg-[#29A9E0] p-1 rounded-lg cursor-pointer h-8 w-8" onClick={() => setOpenModalAddInformation(true)}>
          <PlusIcon />
        </div>
      </ul>
      {openModalAddInformation && <AddNewInformation title={title} onClose={() => setOpenModalAddInformation(false)} />}
    </div>
  )
}

export default InformationSetting