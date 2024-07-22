import { useEffect, useState } from "react";
import PlusIcon from "../../assets/icons/PlusIcon"
import AddNewInformation from "./AddNewInformation";
import MinusIcon from "../../assets/icons/MinusIcon";
import DeleteInformation from "./DeleteInformation";
import EditIcon from "../../assets/icons/EditIcon";
import EditInformation from "./EditInformation";
import { InformationSettingType } from "../../entities/InformationSetting";
import { Skeleton } from "antd";

interface InformationSettingProps {
  data: {id: number, name: string}[];
  title: string;
  color: string;
  titleColor: string;
  onDelete: (type: string, id: number) => Promise<void>;
  onAdd: (type: string, name: string) => Promise<void>;
  handleEdit: (type: string, data: InformationSettingType) => Promise<void>;
  type: string;
  loadingAdd: boolean;
  loadingDelete: boolean;
  loadingEdit: boolean;
  loading: boolean;
}

function InformationSetting(props: InformationSettingProps) {
  const { data, title, color, titleColor, onDelete, onAdd, handleEdit, type, loadingAdd, loadingDelete, loadingEdit, loading } = props;
  const [openModalAddInformation, setOpenModalAddInformation] = useState(false);
  const [openModalDelInformation, setOpenModalDelInformation] = useState(false);
  const [openModalEditInformation, setOpenModalEditInformation] = useState(false);
  const [id, setId] = useState<number>(-1);
  const [name, setName] = useState<string>('');

  const [datas, setDatas] = useState(data);

  useEffect(() => {
    setDatas(data)
  }, [data])

  const onOpenDel = (id: number) => {
    setOpenModalDelInformation(true)
    setId(id)
  }
  return (
    <div className="flex items-center border border-sky-500 p-2 rounded-xl">
      <div className={`mr-4 px-6 py-2 rounded-full text-white uppercase text-center w-[200px]`} style={{ backgroundColor: titleColor}}>
        <span>{title}</span>
      </div>
      {loading ? (
        <div className="flex my-2 gap-4">
          <Skeleton.Button className="!w-[120px] !h-[56px]" active />
          <Skeleton.Button className="!w-[120px] !h-[56px]" active />
        </div>
      ) : (
        <ul className="flex flex-wrap items-center">
        {datas.map((item) => (
          <li key={item.id} className={`mr-4 px-8 py-4 my-2 rounded-xl uppercase text-center min-w-[120px] relative`} style={{ backgroundColor: color }}>
            <div
              className="absolute top-2 right-3 bg-[red] rounded-xl cursor-pointer hover:opacity-70"
              onClick={() => onOpenDel(item.id)}
            >
              <MinusIcon color="white" width={16} />
            </div>
            <span className="mx-2">{item.name}</span>
            <div
              className="absolute bottom-2 right-3 bg-[green] rounded-xl cursor-pointer hover:opacity-70"
              onClick={() => {
                setOpenModalEditInformation(true)
                setId(item.id)
                setName(item.name)
              }}
            >
              <EditIcon color="white" width={16} />
            </div>
          </li>
        ))}
        <DeleteInformation
          title={title}
          onClose={() => setOpenModalDelInformation(false)}
          onDelete={onDelete}
          id={id}
          type={type}
          loadingDelete={loadingDelete}
          open={openModalDelInformation}
        />
        <EditInformation
          title={title}
          onClose={() => setOpenModalEditInformation(false)}
          onEdit={handleEdit}
          id={id}
          name={name}
          type={type}
          loadingEdit={loadingEdit}
          open={openModalEditInformation}
        />
        <AddNewInformation
          title={title}
          onClose={() => setOpenModalAddInformation(false)}
          onAdd={onAdd}
          type={type}
          loadingAdd={loadingAdd}
          open={openModalAddInformation}
        />
        <div className="p-1 rounded-lg cursor-pointer h-8 w-8" style={{ backgroundColor: color}} onClick={() => setOpenModalAddInformation(true)}>
          <PlusIcon />
        </div>
        </ul>
      )}
    </div>
  )
}

export default InformationSetting