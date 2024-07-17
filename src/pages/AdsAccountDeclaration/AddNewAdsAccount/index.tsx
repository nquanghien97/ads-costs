import CloseIcon from "../../../assets/icons/CloseIcon";
import BaseButton from "../../../components/common/BaseButton";
import ButtonIcon from "../../../components/common/ButtonIcon";
import { Form, Input, Select } from "antd";
import { useInformationSettingsStore } from "../../../zustand/information_settings.store";

interface InvoiceDetailsProps {
  onClose: () => void;
}

function AddNewAdsAccount(props: InvoiceDetailsProps) {
  const { onClose } = props;

  const [form] = Form.useForm();
  const { channels, currencies, timezones, adAccountStatus, adAccountTypes, banks } = useInformationSettingsStore();

  const onFinish = (data: unknown) => {
    console.log(data)
  }

  const adsAccountTypes = Form.useWatch('type', form);

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
              <p className="w-[120px] text-left text-[#0071BA]">ID Tài Khoản</p>
              <Form.Item
                className="!mb-0 w-full"
                name="userId"
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
              <p className="w-[120px] text-left text-[#0071BA]">ID TKQC</p>
              <Form.Item
                className="!mb-0 w-full"
                name="accountId"
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
                name="account"
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
                name="channel"
              >
                <Select
                  options={channels.map(channel => ({ label: channel.name, value: channel.id}))}
                  className="w-full h-full"
                />
              </Form.Item>
            </div>
            <div className="flex items-center h-[40px]">
              <p className="w-[120px] text-left text-[#0071BA]">Loại TKQC</p>
              <Form.Item
                className="!mb-0 w-full"
                name="type"
              >
                <Select
                  options={adAccountTypes.map(item => ({ label: item.name, value: item.name }))}
                  className="w-full h-full"
                />
              </Form.Item>
            </div>
            <div className="flex items-center h-[40px]">
              <p className="w-[120px] text-left text-[#0071BA]">Tiền tệ</p>
              <Form.Item
                className="!mb-0 w-full"
                name="currency"
              >
                <Select
                  options={currencies.map(item => ({ label: item.name, value: item.id }))}
                  className="w-full h-full"
                />
              </Form.Item>
            </div>
            <div className="flex items-center h-[40px]">
              <p className="w-[120px] text-left text-[#0071BA]">Múi giờ</p>
              <Form.Item
                className="!mb-0 w-full"
                name="timezone"
              >
                <Select
                  options={timezones.map(item => ({ label: item.name, value: item.id }))}
                  className="w-full h-full"
                />
              </Form.Item>
            </div>
            {adsAccountTypes === 'thuê' && (
              <>
                <div className="flex items-center h-[40px]">
                  <p className="w-[120px] text-left text-[#0071BA]">Tỷ giá</p>
                  <Form.Item
                    className="!mb-0 w-full"
                    name="exchange_rate"
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
                    name="rental_fee"
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
            {(adsAccountTypes === 'Trả sau' || adsAccountTypes === 'Trả trước') && (
              <div className="flex items-center h-[40px]">
                <p className="w-[120px] text-left text-[#0071BA]">Bank Liên Kết</p>
                <Form.Item
                  className="!mb-0 w-full"
                  name="bank_account"
                >
                  <Select
                    options={banks.map(item => ({ label: item.name, value: item.id }))}
                    className="w-full h-full"
                  />
                </Form.Item>
              </div>
            )}
            <div className="flex items-center h-[40px]">
              <p className="w-[120px] text-left text-[#0071BA]">Trạng thái TKQC</p>
              <Form.Item
                className="!mb-0 w-full"
                name="status"
              >
                <Select
                  options={adAccountStatus.map(item => ({ label: item.name, value: item.id }))}
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