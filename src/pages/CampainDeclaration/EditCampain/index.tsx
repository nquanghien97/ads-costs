import { Alert, Button, Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import { editAdsAccount, getAdsAccount, getAdsAccountByAccountId } from "../../../services/ads_account";
import { AdsAccountType, BmOwner } from "../../../entities/AdsAccount";
import { useNotification } from "../../../hooks/useNotification";
import axios from "axios";
import useDebounce from "../../../hooks/useDebounce";
import LoadingIcon from "../../../assets/icons/LoadingIcon";

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
  bm_id: string,
  bm_name: string,
  bm_owned_by: BmOwner
}

function EditAdsAccount(props: EditAdsAccountProps) {
  const { onClose, adAccountId, open, setRefreshKey } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [adAccountData, setAdAccountData] = useState<AdsAccountType>();
  const [adsAccountData, setAdsAccountData] = useState<AdsAccountType>();
  const [loadingDataAds, setLoadingDataAds] = useState(false);

  const notification = useNotification();

  const adsAccountId = useDebounce(Form.useWatch('account_id', form), 1000);

  useEffect(() => {
    (async () => {
      try {
        if (adsAccountId) {
          setLoadingDataAds(true);
          const res = await getAdsAccountByAccountId(+adsAccountId);
          setAdsAccountData(res.data.data);
        }
      } catch {
        setAdsAccountData(undefined);
        notification.warning('ID tài khoản quảng cáo không tồn tại')
      } finally {
        setLoadingDataAds(false);
      }
    })()
    return () => {
      setAdsAccountData(undefined);
    }
  }, [adsAccountId, notification])

  useEffect(() => {
    (async () => {
      if (!adAccountId) return
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
        card_number: adAccountData.bank_account?.card_number,
        bm_id: adAccountData.bm_id,
        bm_name: adAccountData.bm_name,
        bm_owned_by: adAccountData.bm_owned_by
      })
    })()
  }, [adAccountId, form])

  const onFinish = async (data: FormValues) => {
    setLoading(true);
    try {
      const valuesSubmit = {
        user_id: adAccountData?.user.id,
        account_id: +(adAccountData?.account_id || -1),
        account_name: data.account_name,
        channel_id: data.channel_id,
        type_id: data.type.value,
        currency_id: data.currency_id,
        exchange_rate: data.exchange_rate,
        timezone_id: data.timezone_id,
        rental_fee: data.rental_fee,
        bank_account_id: data.card_number ? adAccountData?.bank_account.id : data.card_number,
        status_id: data.status.value || adAccountData?.status_id,
        bm_id: data.bm_id || adAccountData?.bm_id,
        bm_name: data.bm_name || adAccountData?.bm_name,
        bm_owned_by: data.bm_owned_by || adAccountData?.bm_owned_by
      }
      await editAdsAccount(adAccountData?.id || -1, valuesSubmit);
      notification.success('Chỉnh sửa tài khoản quảng cáo thành công');
      onCancel();
      form.resetFields();
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

  const onCancel = () => {
    onClose();
    form.resetFields();
  }

  return (
    <Modal
      open={open}
      className='!p-0 !w-4/6 !top-12'
      onCancel={onCancel}
      footer={false}
    >
      <div>
        <div className="w-full text-center p-3 h-[50px] bg-[#68c2ed] rounded-t-md uppercase font-bold">Chỉnh sửa thông tin chiến dịch</div>
      </div>
      <div className="p-4 my-4">
        <Form
          form={form}
          onFinish={onFinish}
          className="flex flex-col gap-2"
        >
          <div className="flex items-center h-[40px]">
            <p className="w-[120px] text-left text-[black]">ID Chiến dịch</p>
            <Form.Item
              className="!mb-0 w-full"
              name="campain_id"
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
                      return Promise.reject("ID chiến dịch phải là số");
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input className="py-2" />
            </Form.Item>
          </div>
          <div className="flex flex-col gap-4">
            {(adAccountData?.ads_costs_count || adAccountData?.ads_bill_count) ? (
              <div className="flex items-center h-[40px]">
                <p className="w-[120px] text-left">ID TKQC</p>
                <Alert message={adAccountData?.account_id || "Loading..."} className="w-full" />
              </div>
            ) : (
              <div className="flex items-center h-[40px]">
            <p className="w-[120px] text-left text-[black]">ID TKQC</p>
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
              <Input className="py-2" addonAfter={loadingDataAds && <LoadingIcon size="small" />} allowClear />
            </Form.Item>
          </div>
            )}
            {adsAccountData && (
              <div className="p-2 border-[1px] border-red-500 rounded-md flex flex-col gap-4 bg-[#f0eeee]">
                <div className="flex items-center h-[40px]">
                  <p className="w-[136px] text-left">Tên TKQC</p>
                  <Alert message={adsAccountData?.account_name || "Chưa có thông tin"} className="w-full" />
                </div>
                <div className="flex items-center h-[40px]">
                  <p className="w-[136px] text-left">Kênh chạy</p>
                  <Alert message={adsAccountData?.channel || "Chưa có thông tin"} className="w-full" />
                </div>
                <div className="flex items-center h-[40px]">
                  <p className="w-[136px] text-left">Loại TKQC</p>
                  <Alert message={adsAccountData?.type || "Chưa có thông tin"} className="w-full" />
                </div>
                <div className="flex items-center h-[40px]">
                  <p className="w-[136px] text-left">Tiền tệ</p>
                  <Alert message={adsAccountData?.currency || "Chưa có thông tin"} className="w-full" />
                </div>
                <div className="flex items-center h-[40px]">
                  <p className="w-[136px] text-left">Múi giờ</p>
                  <Alert message={adsAccountData?.timezone || "Chưa có thông tin"} className="w-full" />
                </div>
                {
                  adsAccountData.type === "TK THUÊ" ? (
                    <>
                      <div className="flex items-center h-[40px]">
                        <p className="w-[136px] text-left">Tỷ giá</p>
                        <Alert message={adsAccountData?.exchange_rate || 0} className="w-full" />
                      </div>
                      <div className="flex items-center h-[40px]">
                        <p className="w-[136px] text-left">Phí thuê</p>
                        <Alert message={adsAccountData?.rental_fee || "Chưa có thông tin"} className="w-full" />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center h-[40px]">
                        <p className="w-[136px] text-left">Bank Liên kết</p>
                        <Alert message={adsAccountData?.bank_account?.bank_name || "Chưa có thông tin"} className="w-full" />
                      </div>
                      <div className="flex items-center h-[40px]">
                        <p className="w-[136px] text-left">Số TKNH</p>
                        <Alert message={adsAccountData?.bank_account?.card_number || "Chưa có thông tin"} className="w-full" />
                      </div>
                    </>
                  )
                }
                <div className="flex items-center h-[40px]">
                  <p className="w-[136px] text-left">Trạng thái TKQC</p>
                  <Alert message={adsAccountData?.status || "Chưa có thông tin"} className="w-full" />
                </div>
              </div>
            )}
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