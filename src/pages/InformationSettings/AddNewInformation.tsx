import { useForm } from "react-hook-form";
import CloseIcon from "../../assets/icons/CloseIcon";
import BaseButton from "../../components/common/BaseButton";
import BaseInput from "../../components/common/BaseInput";
import ButtonIcon from "../../components/common/ButtonIcon";
import { useId } from "react";

interface AddNewInformationProps {
  onClose: () => void;
  title: string;
  onAddNewData: (data: { id: string; name: string }) => void
}

interface FormValue {
  name: string
}

function AddNewInformation(props: AddNewInformationProps) {
  const id = useId();
  const { handleSubmit, register } = useForm<FormValue>();
  const { onClose, title, onAddNewData } = props;
  const onSubmit = (data: { name: string }) => {
   onAddNewData({id: id, name: data.name})
   onClose()
  }
  return (
    <div className="fixed inset-0 bg-[#0000004d] z-50">
      <div className="w-[800px] relative rounded-xl bg-white left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col">
        <div>
          <div className="w-full text-center p-3 h-[50px] bg-[#eb9d4d] rounded-t-xl uppercase font-bold">{title}</div>
          <div className="absolute right-2 top-2" onClick={onClose}>
            <ButtonIcon>
              <CloseIcon />
            </ButtonIcon>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-center w-4/5 m-auto py-8">
            <BaseInput placeholder="Nhập thông tin" fullWidth {...register('name')} />
          </div>
          <div className="flex justify-center gap-12 p-4">
            <BaseButton color="danger" onClick={onClose}>Hủy</BaseButton>
            <BaseButton color="info" type="submit">Xác nhận</BaseButton>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddNewInformation;