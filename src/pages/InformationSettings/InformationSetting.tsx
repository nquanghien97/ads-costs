import { useState } from "react";
import PlusIcon from "../../assets/icons/PlusIcon"
import AddNewInformation from "./AddNewInformation";
import MinusIcon from "../../assets/icons/MinusIcon";
import SubmitDelInformation from "./SubmitDelInformation";
import React from "react";

interface InformationSettingProps {
  data: {id: string, name: string}[];
  title: string;
}

function InformationSetting(props: InformationSettingProps) {
  const { data, title } = props;
  const [openModalAddInformation, setOpenModalAddInformation] = useState(false);
  const [openModalDelInformation, setOpenModalDelInformation] = useState(false);
  const [id, setId] = useState<string>('');

  const [datas, setDatas] = useState(data);

  const onAddNewData = (data: {id: string, name: string}) => {
    setDatas([...datas, data])
  }

  const onRemoveData = (id: string) => {
    const newData = datas.filter((item) => item.id !== id)
    setDatas(newData);
  }

  const onOpenDel = (id: string) => {
    setOpenModalDelInformation(true)
    setId(id)
  }

  return (
    <div className="flex items-center border border-sky-500 p-2 rounded-xl">
      <div className="mr-4 px-6 py-2 rounded-full bg-[#0071BA] text-white uppercase text-center w-[200px]">
        <span>{title}</span>
      </div>
      <ul className="flex flex-wrap items-center">
        {datas.map((item) => (
          <React.Fragment key={item.id}>
            <li key={item.id} className="mr-4 px-6 py-2 my-2 rounded-full bg-[#29A9E0] text-white uppercase text-center min-w-[120px] relative">
              <div className="absolute top-1 right-2 bg-[#ccc] rounded-xl cursor-pointer hover:opacity-70" onClick={() => onOpenDel(item.id)}>
                <MinusIcon color="red" width={16} />
              </div>
              {item.name}
            </li>
          </React.Fragment>
        ))}
        <div className="!bg-[#29A9E0] p-1 rounded-lg cursor-pointer h-8 w-8" onClick={() => setOpenModalAddInformation(true)}>
          <PlusIcon />
        </div>
      </ul>
      {openModalDelInformation && <SubmitDelInformation title={title} onClose={() => setOpenModalDelInformation(false)} onRemoveData={() => onRemoveData(id)} />}
      {openModalAddInformation && <AddNewInformation title={title} onClose={() => setOpenModalAddInformation(false)} onAddNewData={onAddNewData} />}
    </div>
  )
}

export default InformationSetting