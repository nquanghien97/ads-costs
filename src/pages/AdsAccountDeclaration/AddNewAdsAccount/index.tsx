import CloseIcon from "../../../assets/icons/CloseIcon";
import BaseButton from "../../../components/common/BaseButton";
import ButtonIcon from "../../../components/common/ButtonIcon";
import { Form, Input, Select } from "antd";

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

  const [form] = Form.useForm();

  const onFinish = (data: unknown) => {
    console.log(data)
  }

  const loaiTKQC = Form.useWatch('loaiTKQC', form);

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
          <Form
            className="flex flex-col gap-6"
            form={form}
            onFinish={onFinish}
          >
            <div className="flex items-center h-[40px]">
              <p className="w-[120px] text-left text-[#0071BA]">ID TKQC</p>
              <Form.Item
                className="!mb-0 w-full"
                name="idTKQC"
                rules={[
                  {
                    required: true,
                    message: "Trường này là bắt buộc"
                  }
                ]}
              >
              <Input className="py-2" />
            </Form.Item>
            </div>
            <div className="flex items-center h-[40px]">
              <p className="w-[120px] text-left text-[#0071BA]">Tên TKQC</p>
              <Form.Item
                className="!mb-0 w-full"
                name="tenTKQC"
                rules={[
                  {
                    required: true,
                    message: "Trường này là bắt buộc"
                  }
                ]}
              >
              <Input className="py-2" />
            </Form.Item>
            </div>
            <div className="flex items-center h-[40px]">
              <p className="w-[120px] text-left text-[#0071BA]">Kênh chạy</p>
              <Form.Item
                className="!mb-0 w-full"
                name="kenhChay"
              >
                <Select
                  options={options}
                  className="w-full h-full"
                />
              </Form.Item>
            </div>
            <div className="flex items-center h-[40px]">
              <p className="w-[120px] text-left text-[#0071BA]">Loại TKQC</p>
              <Form.Item
                className="!mb-0 w-full"
                name="loaiTKQC"
              >
                <Select
                  options={optionsTypeAdsAccount}
                  className="w-full h-full"
                />
              </Form.Item>
            </div>
            <div className="flex items-center h-[40px]">
              <p className="w-[120px] text-left text-[#0071BA]">Tiền tệ</p>
              <Form.Item
                className="!mb-0 w-full"
                name="tienTe"
              >
                <Select
                  options={optionsTypeAdsAccount}
                  className="w-full h-full"
                />
              </Form.Item>
            </div>
            <div className="flex items-center h-[40px]">
              <p className="w-[120px] text-left text-[#0071BA]">Múi giờ</p>
              <Form.Item
                className="!mb-0 w-full"
                name="muiGio"
              >
                <Select
                  options={optionsTypeAdsAccount}
                  className="w-full h-full"
                />
              </Form.Item>
            </div>
            {loaiTKQC === 'thue' && (
              <>
                <div className="flex items-center h-[40px]">
                  <p className="w-[120px] text-left text-[#0071BA]">Tỷ giá</p>
                  <Form.Item
                    className="!mb-0 w-full"
                    name="tyGia"
                    rules={[
                      {
                        required: true,
                        message: "Trường này là bắt buộc"
                      }
                    ]}
                  >
                    <Input className="py-2" />
                  </Form.Item>
                </div>
                <div className="flex items-center h-[40px]">
                  <p className="w-[120px] text-left text-[#0071BA]">Phí thuê</p>
                  <Form.Item
                    className="!mb-0 w-full"
                    name="phiThue"
                    rules={[
                      {
                        required: true,
                        message: "Trường này là bắt buộc"
                      }
                    ]}
                  >
                    <Input className="py-2" />
                  </Form.Item>
                </div>
              </>
            )}
            {(loaiTKQC === 'tra-truoc' || loaiTKQC === 'tra-sau') && (
              <div className="flex items-center h-[40px]">
                <p className="w-[120px] text-left text-[#0071BA]">Bank Liên Kết</p>
                <Form.Item
                  className="!mb-0 w-full"
                  name="bankLienKet"
                >
                  <Select
                    options={optionsTypeAdsAccount}
                    className="w-full h-full"
                  />
                </Form.Item>
              </div>
            )}
            <div className="flex items-center h-[40px]">
              <p className="w-[120px] text-left text-[#0071BA]">Trạng thái TKQC</p>
              <Form.Item
                className="!mb-0 w-full"
                name="trangThaiTKQC"
              >
                <Select
                  options={optionsTypeAdsAccount}
                  className="w-full h-full"
                />
              </Form.Item>
            </div>
            <div className="flex justify-evenly">
              <BaseButton color="danger" onClick={onClose}>Hủy</BaseButton>
              <BaseButton color="success" type="submit">Xác nhận</BaseButton>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default AddNewAdsAccount;