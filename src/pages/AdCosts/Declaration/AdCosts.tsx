import { Button, DatePicker, Form, Modal, Table, TableColumnsType } from "antd";
import { ChangeEvent, useState } from "react";
import * as XLSX from "xlsx";
import { formatDate } from "../../../utils/formatDate";
import { useNotification } from "../../../hooks/useNotification";
import { DeclarationAdsCosts, GetAdsCostsByUser } from "../../../services/ads_costs";
import localeValues from "antd/locale/vi_VN";
import { SearchFormValues } from "../Header";
import { SystemData } from "../../../dto/AdsBillingsDTO";
import axios from "axios";


interface DataRow {
  'ID TKQC': number;
  'CHI PHÍ': string;
}


interface AdCostsProps {
  setRefreshKey: React.Dispatch<React.SetStateAction<boolean>>
  searchForm: SearchFormValues
  setDatas: React.Dispatch<React.SetStateAction<SystemData[] | undefined>>
}

function AdCosts(props: AdCostsProps) {
  const { setDatas, searchForm, setRefreshKey } = props;
  const [dataImport, setDataImport] = useState<DataRow[] | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const notification = useNotification()

  const handleFileUpload = (e : ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if(file) {
      const reader = new FileReader();
  
      reader.onload = (event) => {
        const workbook = XLSX.read(event.target?.result, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const sheetData: DataRow[] = XLSX.utils.sheet_to_json(sheet, { raw: false, dateNF: 'yyy-mm-dd'});
  
        setDataImport(sheetData);
      };
  
      reader.readAsArrayBuffer(file);
    }
    e.target.value = '';
  };

  const onCloseModal = () => {
    setOpenModal(false);
    setDataImport(null);
  }

  const onFinish = async (data: { date: Date}) => {
    setLoading(true);
    const dataSubmit = dataImport?.map(item => ({
      date: formatDate(new Date(data.date)),
      account_id: item["ID TKQC"],
      amount: +item["CHI PHÍ"].replace(/,/g, '')
    }));
    if(!dataSubmit) {
      notification.warning('Bạn cần import dữ liệu')
      return;
    }
    try {
      await DeclarationAdsCosts(dataSubmit)
      const res = await GetAdsCostsByUser(searchForm)
      console.log(res.data)
      setDatas(res.data.data.list)
      setOpenModal(false)
      notification.success('Khai báo Chi phí quảng cáo thành công')
      setRefreshKey(pre => !pre)
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const invalidData = err.response?.data.invalidData
        console.log(invalidData)
        for (const key in invalidData) {
          if (Array.isArray(invalidData[key]) && invalidData[key].includes("TKQC không tồn tại hoặc đã ngừng sử dụng.")) {
            const index = parseInt(key.split('.')[1], 10);
            notification.error(`ID TKQC "${dataSubmit[index].account_id}" không tồn tại hoặc đã ngừng sử dụng.`)
            break;
          }
        }
      }
      notification.error('Có lỗi xảy ra, vui lòng thử lại!')
    } finally {
      setLoading(false);
    }
  }

  const columns: TableColumnsType = [
    {
      title: 'ID TKQC',
      dataIndex: 'ID TKQC',
      key: '2'
    },
    {
      title: 'CHI PHÍ',
      dataIndex: 'CHI PHÍ',
      key: '3',
    },
  ]

  return (
    <>
      <div className="bg-[#0071ba] rounded-md cursor-pointer h-full px-4 flex items-center justify-center hover:opacity-80 duration-300" onClick={() => setOpenModal(true)}>
        <span className="text-white">Khai Báo CPQC</span>
      </div>
      <Modal open={openModal} onCancel={onCloseModal} footer={false} className="!w-1/2">
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            name='date'
            className="flex justify-center !mb-0 pt-4"
            rules={[
              {
                required: true,
                message: "Trường này là bắt buộc"
              }
            ]}
          >
            <DatePicker placeholder="Chọn ngày" locale={localeValues.DatePicker} />
          </Form.Item>
          <div className="flex justify-center">
            <label htmlFor="import-ad-costs" className="h-full">
              <div className="flex justify-center">
                <div className="bg-[#0071ba] rounded-md cursor-pointer h-full px-4 py-2 my-4 flex items-center justify-center hover:opacity-80 duration-300">
                  <span className="text-white">Khai Báo CPQC</span>
                </div>
              </div>
              <input type="file" onChange={handleFileUpload} id="import-ad-costs" className="!hidden" />
            </label>
          </div>
        {dataImport && (
          <>
            <Table dataSource={dataImport} columns={columns} rowKey={(record) => record["ID TKQC"]} />
            <div className="flex justify-evenly py-4">
              <Button type="primary" danger onClick={onCloseModal}>Hủy</Button>
              <Button type="primary" htmlType="submit" loading={loading}>Xác nhận</Button>
            </div>
          </>
        )}
        </Form>
      </Modal>
    </>
  );
}

export default AdCosts