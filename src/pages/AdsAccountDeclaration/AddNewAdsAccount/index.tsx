import { Button, Form, Input, Modal, Select } from "antd";
import { useInformationSettingsStore } from "../../../zustand/information_settings.store";
import { addNewAdAccount } from "../../../services/ads_account";
import { useEffect, useState } from "react";
import { getUserId } from "../../../services/users";
import { useNotification } from "../../../hooks/useNotification";
import { getListBankAccounts } from "../../../services/bank_account";
import { BankAccountType } from "../../../entities/BankAccount";

interface InvoiceDetailsProps {
  onClose: () => void;
  setRefreshKey: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}

interface FormValues {
  user_id: number,
  account_id: number,
  account_name: string,
  channel_id: number,
  type: {
    label: string,
    value: number
  },
  currency_id: number,
  timezone_id: number,
  bank_account_id: number,
  exchange_rate: number,
  rental_fee: number,
  status_id: number,
  card_number: number,
}

function AddNewAdsAccount(props: InvoiceDetailsProps) {
  const { onClose, setRefreshKey, open } = props;
  const [loading, setLoading] = useState(false);
  const [dataAdsAccount, setDataAdsAccount] = useState<BankAccountType[]>([]);
  const [bankName, setBankName] = useState(-1)

  const [form] = Form.useForm();
  const user_id = getUserId();
  const { channels, currencies, timezones, adAccountStatus, adAccountTypes, banks } = useInformationSettingsStore();
  const notification = useNotification();
  
  const adsAccountTypes = Form.useWatch('type', form);

  const onChangeBankName = (option: number) => {
    setBankName(option)
  }

  useEffect(() => {
    (async () => {
      const res = await getListBankAccounts({user_id})
      setDataAdsAccount(res.data.data.list)
    })()
  }, [user_id])

  const onFinish = async (data: FormValues) => {
    setLoading(true);
    try{
      if(adsAccountTypes?.label === 'thuê') {
        const submitData = {
          user_id: user_id,
          account_id: +data.account_id,
          account_name: data.account_name,
          channel_id: data.channel_id,
          currency_id: data.currency_id,
          type_id: data.type.value,
          timezone_id: data.timezone_id,
          exchange_rate: data.exchange_rate,
          rental_fee: data.rental_fee,
          status_id: data.status_id,
        }
        await addNewAdAccount(submitData)
        notification.success('Thêm mới tài khoản quảng cáo thành công')
        onClose()
      } else if(adsAccountTypes?.label === 'Trả sau' || adsAccountTypes?.label === 'Trả trước') {
        const submitData = {
          user_id: user_id,
          account_id: +data.account_id,
          account_name: data.account_name,
          channel_id: data.channel_id,
          currency_id: data.currency_id,
          type_id: data.type.value,
          timezone_id: data.timezone_id,
          bank_account_id: +data.card_number,
          status_id: data.status_id,
        }
        await addNewAdAccount(submitData)
        notification.success('Thêm mới tài khoản quảng cáo thành công')
        onClose()
      }
      setRefreshKey(pre => !pre)
    } catch (err){
      console.log(err);
      notification.success('Thêm mới tài khoản quảng cáo thất bại')
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={false}
      className="!w-4/6 top-12"
    >
      <div>
        <div className="w-full text-center p-3 h-[50px] bg-[#0071BA] rounded-t-md uppercase font-bold">Khai báo tài khoản quảng cáo</div>
      </div>
      <div className="p-4 my-4">
        <Form
          className="flex flex-col gap-6"
          form={form}
          onFinish={onFinish}
        >
          {/* <div className="flex items-center h-[40px]">
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
          </div> */}
          <div className="flex items-center h-[40px]">
            <p className="w-[120px] text-left text-[#0071BA]">ID TKQC</p>
            <Form.Item
              className="!mb-0 w-full"
              name="account_id"
              rules={[
                {
                  required: true,
                  message: "Trường này là bắt buộc",
                },
                () => ({
                  validator(_, value) {
                    if (!value) {
                      return Promise.reject();
                    }
                    if (isNaN(value)) {
                      return Promise.reject("ID TKQC phải là số");
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input className="py-2" />
            </Form.Item>
          </div>
          <div className="flex items-center h-[40px]">
            <p className="w-[120px] text-left text-[#0071BA]">Tên TKQC</p>
            <Form.Item
              className="!mb-0 w-full"
              name="account_name"
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
              name="channel_id"
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
                labelInValue
                options={adAccountTypes.map(item => ({ label: item.name, value: item.id }))}
                className="w-full h-full"
              />
            </Form.Item>
          </div>
          <div className="flex items-center h-[40px]">
            <p className="w-[120px] text-left text-[#0071BA]">Tiền tệ</p>
            <Form.Item
              className="!mb-0 w-full"
              name="currency_id"
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
              name="timezone_id"
            >
              <Select
                options={timezones.map(item => ({ label: item.name, value: item.id }))}
                className="w-full h-full"
              />
            </Form.Item>
          </div>
          {adsAccountTypes?.label === 'thuê' && (
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
          {(adsAccountTypes?.label === 'Trả sau' || adsAccountTypes?.label === 'Trả trước') && (
            <>
              <div className="flex items-center h-[40px]">
                <p className="w-[120px] text-left text-[#0071BA]">Bank Liên Kết</p>
                <Form.Item
                  className="!mb-0 w-full"
                  name="bank_account_id"
                >
                  <Select
                    onChange={onChangeBankName}
                    options={banks.map(item => ({ label: item.name, value: item.id }))}
                    className="w-full h-full"
                  />
                </Form.Item>
              </div>
              <div className="flex items-center h-[40px]">
                <p className="w-[120px] text-left text-[#0071BA]">Số TKNH</p>
                <Form.Item
                  className="!mb-0 w-full"
                  name="card_number"
                >
                  <Select
                    options={dataAdsAccount.filter(item => item.bank_id === bankName).map(x => ({ label: x.card_number, value: x.id }))}
                    className="w-full h-full"
                  />
                </Form.Item>
              </div>
            </>
            
          )}
          <div className="flex items-center h-[40px]">
            <p className="w-[120px] text-left text-[#0071BA]">Trạng thái TKQC</p>
            <Form.Item
              className="!mb-0 w-full"
              name="status_id"
            >
              <Select
                options={adAccountStatus.map(item => ({ label: item.name, value: item.id }))}
                className="w-full h-full"
              />
            </Form.Item>
          </div>
          <div className="flex justify-evenly">
            <Button type="primary" danger onClick={onClose}>Hủy</Button>
            <Button type="primary" htmlType="submit" loading={loading}>Xác nhận</Button>
          </div>
        </Form>
      </div>
    </Modal>
    
  )
}

export default AddNewAdsAccount;