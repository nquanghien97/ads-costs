import { Button, Form, Input, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { editAdsAccount, getAdsAccount } from "../../../services/ads_account";
import { useInformationSettingsStore } from "../../../zustand/information_settings.store";
import { AdsAccountType } from "../../../entities/AdsAccount";
import { useNotification } from "../../../hooks/useNotification";
import { BankAccountType } from "../../../entities/BankAccount";
import { getListBankAccounts } from "../../../services/bank_account";
import { getUserId } from "../../../services/users";
import axios from "axios";

interface EditAdsAccountProps {
  onClose: () => void;
  open: boolean;
  adAccountId: number;
  setRefreshKey: React.Dispatch<React.SetStateAction<boolean>>
  bankAccountId: number
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
  status: {
    label: string,
    value: number
  },
  card_number: number,
}

function EditAdsAccount(props: EditAdsAccountProps) {
  const { onClose, adAccountId, open, setRefreshKey, bankAccountId } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [adAccountData, setAdAccountData] = useState<AdsAccountType>();
  const [dataAdsAccount, setDataAdsAccount] = useState<BankAccountType[]>([]);
  const [bankId, setBankId] = useState(0)
  const user_id = getUserId();
  const { channels, currencies, timezones, adAccountStatus, adAccountTypes, banks } = useInformationSettingsStore();
  const notification = useNotification();

  const adsAccountTypes = Form.useWatch('type', form);

  const onChangeBankId = (option: number) => {
    setBankId(option)
    form.setFieldsValue({ card_number: null })
  }

  useEffect(() => {
    (async () => {
      const res = await getListBankAccounts({user_id})
      setDataAdsAccount(res.data.data.list)
    })()
  }, [user_id])

  useEffect(() => {
    (async () => {
      if(!adAccountId) return
      const res = await getAdsAccount(adAccountId);
      const adAccountData = res.data.data as AdsAccountType
      setAdAccountData(adAccountData)
      form.setFieldsValue({
          account_id: +adAccountData.account_id,
          account_name: adAccountData.account_name,
          channel_id: adAccountData.channel_id,
          currency_id: adAccountData.currency_id,
          type: {
            label: adAccountData.type,
            value: adAccountData.type_id
          },
          timezone_id: adAccountData.timezone_id,
          exchange_rate: adAccountData.exchange_rate,
          bank_account_id: adAccountData.bank_account?.bank_name,
          rental_fee: adAccountData.rental_fee,
          status: {
            label: adAccountData.status,
            value: adAccountData.status_id
          },
          card_number: adAccountData.bank_account?.card_number
      })
    })()
  }, [adAccountId, form])

  const onFinish = async (data: FormValues) => {
    setLoading(true);
    try {
      const valuesSubmit = {
        user_id: adAccountData?.user.id,
        account_id: data.account_id,
        account_name: data.account_name,
        channel_id: data.channel_id,
        type_id: data.type.value,
        currency_id: data.currency_id,
        exchange_rate: data.exchange_rate,
        timezone_id: data.timezone_id,
        rental_fee: data.rental_fee,
        bank_account_id: data.card_number ? adAccountData?.bank_account.id: data.card_number,
        status_id: data.status.value,
      }
      await editAdsAccount(adAccountData?.id || -1, valuesSubmit);
      notification.success('Chỉnh sửa tài khoản quảng cáo thành công');
      onClose();
      setRefreshKey(pre => !pre)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const invalidData = err.response?.data.invalidData
        for (const key in invalidData) {
          if (Array.isArray(invalidData[key]) && invalidData[key].includes("Đã được sử dụng.")) {
            notification.error('ID TKQC đã tồn tại và đang được sử dụng.')
            break;
          } else {
            notification.error('Có lỗi xảy ra, vui lòng thử lại!')
          }
        }
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      open={open}
      className='!p-0 !w-4/6 !top-12'
      onCancel={onClose}
      footer={false}
    >
      <div>
        <div className="w-full text-center p-3 h-[50px] bg-[#0071BA] rounded-t-md uppercase font-bold">Chỉnh sửa thông tin tài khoản quảng cáo</div>
      </div>
      <div className="p-4 my-4">
        <Form
          form={form}
          onFinish={onFinish}
          className="flex flex-col gap-6"
        >
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
                rules={[
                  {
                    required: true,
                    message: "Trường này là bắt buộc"
                  }
                ]}
              >
                <Select
                  options={channels.map(channel => ({ label: channel.name, value: channel.id}))}
                  className="w-full h-full"
                  allowClear
                />
              </Form.Item>
            </div>
            <div className="flex items-center h-[40px]">
              <p className="w-[120px] text-left text-[#0071BA]">Loại TKQC</p>
              <Form.Item
                className="!mb-0 w-full"
                name="type"
                rules={[
                  {
                    required: true,
                    message: "Trường này là bắt buộc"
                  }
                ]}
              >
                <Select
                  labelInValue
                  options={adAccountTypes.map(item => ({ label: item.name, value: item.id }))}
                  className="w-full h-full"
                  allowClear
                />
              </Form.Item>
            </div>
            <div className="flex items-center h-[40px]">
              <p className="w-[120px] text-left text-[#0071BA]">Tiền tệ</p>
              <Form.Item
                className="!mb-0 w-full"
                name="currency_id"
                rules={[
                  {
                    required: true,
                    message: "Trường này là bắt buộc"
                  }
                ]}
              >
                <Select
                  options={currencies.map(item => ({ label: item.name, value: item.id }))}
                  className="w-full h-full"
                  allowClear
                />
              </Form.Item>
            </div>
            <div className="flex items-center h-[40px]">
              <p className="w-[120px] text-left text-[#0071BA]">Múi giờ</p>
              <Form.Item
                className="!mb-0 w-full"
                name="timezone_id"
                rules={[
                  {
                    required: true,
                    message: "Trường này là bắt buộc"
                  }
                ]}
              >
                <Select
                  options={timezones.map(item => ({ label: item.name, value: item.id }))}
                  className="w-full h-full"
                  allowClear
                />
              </Form.Item>
            </div>
            {adsAccountTypes?.label === 'TK THUÊ' && (
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
                      },
                      () => ({
                        validator(_, value) {
                          if (!value) {
                            return Promise.reject();
                          }
                          if (isNaN(value)) {
                            return Promise.reject("Tỷ giá phải là số");
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
                  <p className="w-[120px] text-left text-[#0071BA]">Phí thuê</p>
                  <Form.Item
                    className="!mb-0 w-full"
                    name="rental_fee"
                    rules={[
                      {
                        required: true,
                        message: "Trường này là bắt buộc"
                      },
                      () => ({
                        validator(_, value) {
                          if (!value) {
                            return Promise.reject();
                          }
                          if (isNaN(value)) {
                            return Promise.reject("Phí thuê phải là số");
                          }
                          return Promise.resolve();
                        },
                      }),
                    ]}
                  >
                    <Input className="py-2" />
                  </Form.Item>
                </div>
              </>
            )}
            {(adsAccountTypes?.label === 'TK THƯỜNG - Trả sau' || adsAccountTypes?.label === 'TK THƯỜNG - Trả trước') && (
              <>
                <div className="flex items-center h-[40px]">
                  <p className="w-[120px] text-left text-[#0071BA]">Bank Liên Kết</p>
                  <Form.Item
                    className="!mb-0 w-full"
                    name="bank_account_id"
                    rules={[
                      {
                        required: true,
                        message: "Trường này là bắt buộc"
                      }
                    ]}
                  >
                    <Select
                      onChange={onChangeBankId}
                      options={banks.map(item => ({ label: item.name, value: item.id }))}
                      className="w-full h-full"
                      allowClear
                    />
                  </Form.Item>
                </div>
                <div className="flex items-center h-[40px]">
                <p className="w-[120px] text-left text-[#0071BA]">Số TKNH</p>
                <Form.Item
                  className="!mb-0 w-full"
                  name="card_number"
                  rules={[
                    {
                      required: true,
                      message: "Trường này là bắt buộc"
                    }
                  ]}
                >
                  <Select
                    options={dataAdsAccount.filter(item => item.bank_id === (bankId===0? bankAccountId : bankId)).map(x => ({ label: x.card_number, value: x.id }))}
                    className="w-full h-full"
                    allowClear
                  />
                </Form.Item>
              </div>
              </>
            )}
            <div className="flex items-center h-[40px]">
              <p className="w-[120px] text-left text-[#0071BA]">Trạng thái TKQC</p>
              <Form.Item
                className="!mb-0 w-full"
                name="status"
                rules={[
                  {
                    required: true,
                    message: "Trường này là bắt buộc"
                  }
                ]}
              >
                <Select
                  labelInValue
                  options={adAccountStatus.map(item => ({ label: item.name, value: item.id }))}
                  className="w-full h-full"
                  allowClear
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

export default EditAdsAccount;