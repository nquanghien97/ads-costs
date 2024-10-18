import { Alert, Button, Form, Input, Modal } from "antd";
import { getAdsAccountByAccountId } from "../../../services/ads_account";
import { useEffect, useState } from "react";
import { useNotification } from "../../../hooks/useNotification";
import axios from "axios";
import useDebounce from "../../../hooks/useDebounce";
import { AdAccount } from "../../../entities/AdsAccount";
import LoadingIcon from "../../../assets/icons/LoadingIcon";
import { createCampaign } from "../../../services/campaigns";

interface CampaignsDetailsProps {
  onClose: () => void;
  setRefreshKey: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}

interface FormValues {
  account_id: string,
  campaign_id: string
}

function AddNewCampaigns(props: CampaignsDetailsProps) {
  const { onClose, setRefreshKey, open } = props;
  const [loading, setLoading] = useState(false);
  const [adsAccountData, setAdsAccountData] = useState<AdAccount>();
  const [loadingDataAds, setLoadingDataAds] = useState(false);

  const [form] = Form.useForm();
  const notification = useNotification();

  const adAccountId = useDebounce(Form.useWatch('account_id', form), 1000);
  useEffect(() => {
    (async () => {
      try {
        if (adAccountId) {
          setLoadingDataAds(true);
          const res = await getAdsAccountByAccountId(+adAccountId);
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
  }, [adAccountId, notification])

  const onFinish = async (data: FormValues) => {
    setLoading(true);
    try {
      if(!adsAccountData) {
        notification.warning('ID TKQC không chính xác, vui lòng thử lại!')
        return
      }
      await createCampaign(data)
      notification.success('Thêm mới tài khoản quảng cáo thành công')
      onClose()
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
      setLoading(false);
    }
  }

  const onCancel = () => {
    onClose();
    form.resetFields();
  }

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={false}
      className="top-12"
    >
      <div>
        <div className="w-full text-center p-3 h-[50px] bg-[#68c2ed] rounded-t-md uppercase font-bold">Khai báo chiến dịch</div>
      </div>
      <div className="p-4 my-4 px-8">
        <Form
          className="flex flex-col gap-6"
          form={form}
          onFinish={onFinish}
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
          <div className="flex justify-evenly">
            <Button type="primary" danger onClick={onCancel}>Hủy</Button>
            <Button type="primary" htmlType="submit" loading={loading}>Xác nhận</Button>
          </div>
        </Form>
      </div>
    </Modal>

  )
}

export default AddNewCampaigns;