import Select from "react-select";
import CloseIcon from "../../../assets/icons/CloseIcon";
import BaseButton from "../../../components/common/BaseButton";
import BaseInput from "../../../components/common/BaseInput";
import ButtonIcon from "../../../components/common/ButtonIcon";
import { useForm, Controller } from "react-hook-form";

interface InvoiceDetailsProps {
  onClose: () => void;
}

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const optionsTypeAdsAccount = [
  { value: 'tra-truoc', label: "TKCN trả trước"},
  { value: 'tra-sau', label: "TKCN trả sau"},
  { value: 'thue', label: "Tài khoản thuê"}
]

function AddNewAdsAccount(props: InvoiceDetailsProps) {
  const { onClose } = props;

  const { register, handleSubmit, watch, control } = useForm();

  const onSubmit = (data: unknown) => {
    console.log(data)
  }

  console.log(watch()?.loaiTKQC?.value)

  return (
    <div className="fixed inset-0 bg-[#0000004d] z-50">
      <div className="w-[800px] relative rounded-xl bg-white left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col">
        <div>
          <div className="w-full text-center p-3 h-[50px] bg-[#0071BA] rounded-t-xl uppercase font-bold">Khai báo tài khoản quảng cáo</div>
          <div className="absolute right-2 top-2" onClick={onClose}>
            <ButtonIcon>
              <CloseIcon />
            </ButtonIcon>
          </div>
        </div>
        <div className="p-4 my-4">
          <form
            className="flex flex-col gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex items-center">
              <p className="w-[120px] text-left text-[#0071BA]">ID TKQC</p>
              <BaseInput fullWidth {...register('idTKQC')} />
            </div>
            <div className="flex items-center">
              <p className="w-[120px] text-left text-[#0071BA]">Tên TKQC</p>
              <BaseInput fullWidth {...register('tenTKQC')} />
            </div>
            <div className="flex items-center">
              <p className="w-[120px] text-left text-[#0071BA]">Kênh chạy</p>
              <Controller
                control={control}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                }) => (
                  <Select
                    options={options}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    name={name}
                    ref={ref}
                    className="w-full"
                  />
                )}
                name="kenhChay"
              />
            </div>
            <div className="flex items-center">
              <p className="w-[120px] text-left text-[#0071BA]">Loại TKQC</p>
              <Controller
                control={control}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                }) => (
                  <Select
                    options={optionsTypeAdsAccount}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    name={name}
                    ref={ref}
                    className="w-full"
                  />
                )}
                name="loaiTKQC"
              />
            </div>
            <div className="flex items-center">
              <p className="w-[120px] text-left text-[#0071BA]">Tiền tệ</p>
              <Controller
                control={control}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                }) => (
                  <Select
                    options={optionsTypeAdsAccount}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    name={name}
                    ref={ref}
                    className="w-full"
                  />
                )}
                name="tienTe"
              />
            </div>
            <div className="flex items-center">
              <p className="w-[120px] text-left text-[#0071BA]">Múi giờ</p>
              <Controller
                control={control}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                }) => (
                  <Select
                    options={optionsTypeAdsAccount}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    name={name}
                    ref={ref}
                    className="w-full"
                  />
                )}
                name="muiGio"
              />
            </div>
            {watch()?.loaiTKQC?.value === 'thue' ? (
              <>
                <div className="flex items-center">
                  <p className="w-[120px] text-left text-[#0071BA]">Tỷ giá</p>
                  <BaseInput fullWidth />
                </div>
                <div className="flex items-center">
                  <p className="w-[120px] text-left text-[#0071BA]">Phí thuê</p>
                  <BaseInput fullWidth />
                </div>
              </>
            ): (
              <div className="flex items-center">
                <p className="w-[120px] text-left text-[#0071BA]">Bank Liên Kết</p>
                <Controller
                  control={control}
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                  }) => (
                    <Select
                      options={optionsTypeAdsAccount}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      name={name}
                      ref={ref}
                      className="w-full"
                    />
                  )}
                  name="bankLienKet"
                />
              </div>
            )}
            <div className="flex items-center">
              <p className="w-[120px] text-left text-[#0071BA]">Trạng thái TKQC</p>
              <Controller
                control={control}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                }) => (
                  <Select
                    options={optionsTypeAdsAccount}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    name={name}
                    ref={ref}
                    className="w-full"
                  />
                )}
                name="trangThaiTKQC"
              />
            </div>
            <div className="flex justify-evenly">
              <BaseButton color="danger" onClick={onClose}>Hủy</BaseButton>
              <BaseButton color="success" type="submit">Xác nhận</BaseButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddNewAdsAccount;