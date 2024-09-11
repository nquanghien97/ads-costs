import { Alert, Button, Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import { getAdsAccountByAccountId } from "../../../services/ads_account";
import { AdsAccountType, BmOwner } from "../../../entities/AdsAccount";
import { useNotification } from "../../../hooks/useNotification";
import axios from "axios";
import useDebounce from "../../../hooks/useDebounce";
import LoadingIcon from "../../../assets/icons/LoadingIcon";
import { updateCampaign } from "../../../services/campaigns";

interface EditAdsAccountProps {
  onClose: () => void;
  open: boolean;
  adAccountId: number;
  setRefreshKey: React.Dispatch<React.SetStateAction<boolean>>
  bankAccountId: number;
  dataCampaign?: {
    id: number;
    campaign_id: string;
    account_id: string;
  }
}

interface FormValues {
  user_id: number,
  account_id: string,
  campaign_id: string;
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
  const { onClose, adAccountId, open, setRefreshKey, dataCampaign } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [adsAccountData, setAdsAccountData] = useState<AdsAccountType>();
  const [loadingDataAds, setLoadingDataAds] = useState(false);

  const notification = useNotification();

  const adsAccountId = useDebounce(dataCampaign?.account_id || '', 1000);

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
      form.setFieldsValue({
        account_id: dataCampaign?.account_id,
        campaign_id: dataCampaign?.campaign_id
      })
    })()
  }, [adAccountId, dataCampaign?.account_id, dataCampaign?.campaign_id, form])

  const onFinish = async (data: FormValues) => {
    setLoading(true);
    try {
      const valuesSubmit = {
        account_id: data.account_id || dataCampaign?.account_id,
        campaign_id: data.campaign_id || dataCampaign?.campaign_id,
      }
      await updateCampaign(dataCampaign?.id || -1, valuesSubmit);
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
              name="campaign_id"
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
            {(adsAccountData?.ads_costs_count || adsAccountData?.ads_bill_count) ? (
              <div className="flex items-center h-[40px]">
                <p className="w-[120px] text-left">ID TKQC</p>
                <Alert message={adsAccountData?.account_id || "Loading..."} className="w-full" />
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
                        <Alert message={adsAccountData?.exchange_rate || "0"} className="w-full" />
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