import { Alert, Button, Form, Input, Modal } from "antd";
import { addNewAdAccount, getAdsAccountByAccountId } from "../../../services/ads_account";
import { useEffect, useState } from "react";
import { getUserId } from "../../../services/users";
import { useNotification } from "../../../hooks/useNotification";
import axios from "axios";
import useDebounce from "../../../hooks/useDebounce";
import { AdsAccountType } from "../../../entities/AdsAccount";
import LoadingIcon from "../../../assets/icons/LoadingIcon";

interface CampainDetailsProps {
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

function AddNewCampain(props: CampainDetailsProps) {
  const { onClose, setRefreshKey, open } = props;
  const [loading, setLoading] = useState(false);
  const [adsAccountData, setAdsAccountData] = useState<AdsAccountType>();
  const [loadingDataAds, setLoadingDataAds] = useState(false);

  const [form] = Form.useForm();
  const user_id = getUserId();
  const notification = useNotification();

  const adsAccountTypes = Form.useWatch('type', form);
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
      if (adsAccountTypes?.label === 'TK THUÊ') {
        const submitData = {
          user_id: user_id,
          account_id: data.account_id,
          account_name: data.account_name,
          channel_id: data.channel_id,
          currency_id: data.currency_id,
          type_id: data.type.value,
          timezone_id: data.timezone_id,
          exchange_rate: Number(data.exchange_rate?.toString().replace(/\./g, '')),
          rental_fee: data.rental_fee,
          status_id: data.status_id,
        }
        await addNewAdAccount(submitData)
        notification.success('Thêm mới tài khoản quảng cáo thành công')
        onClose()
        form.resetFields();
      } else if (adsAccountTypes?.label === 'TK THƯỜNG - Trả sau' || adsAccountTypes?.label === 'TK THƯỜNG - Trả trước') {
        const dataSubmit = {
          user_id: user_id,
          account_id: data.account_id,
          account_name: data.account_name,
          channel_id: data.channel_id,
          currency_id: data.currency_id,
          type_id: data.type.value,
          timezone_id: data.timezone_id,
          bank_account_id: +data.card_number,
          status_id: data.status_id,
        }
        await addNewAdAccount(dataSubmit)
        notification.success('Thêm mới tài khoản quảng cáo thành công')
        onClose();
        form.resetFields();
      }
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
          <div className="flex justify-evenly">
            <Button type="primary" danger onClick={onCancel}>Hủy</Button>
            <Button type="primary" htmlType="submit" loading={loading}>Xác nhận</Button>
          </div>
        </Form>
      </div>
    </Modal>

  )
}

export default AddNewCampain;