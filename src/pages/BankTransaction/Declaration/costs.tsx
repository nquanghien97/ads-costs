import { Button, DatePicker, Form, Modal, Table, TableColumnsType } from "antd";
import { ChangeEvent, useState } from "react";
import * as XLSX from "xlsx";
import { formatDate } from "../../../utils/date";
import { useNotification } from "../../../hooks/useNotification";
import localeValues from "antd/locale/vi_VN";
import { BankCostsDeclaration } from "../../../services/bank_transaction";
import axios from "axios";

interface DataRow {
  'SỐ TIỀN': number;
  'NGÀY': string;
  'SỐ TKNH': number;
  'HẠNG MỤC THANH TOÁN': string
}

interface CostsDeclarationProps {
  openModalCosts: boolean
  setOpenModalCosts: React.Dispatch<React.SetStateAction<boolean>>
}

function CostsDeclaration(props: CostsDeclarationProps) {
  const { openModalCosts, setOpenModalCosts} = props;

  const [dataImport, setDataImport] = useState<DataRow[] | null>(null);
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
    setOpenModalCosts(false);
    setDataImport(null);
  }

  const onFinish = async (data: { date: Date}) => {
    setLoading(true);
    const dataSubmit = dataImport?.map(item => ({
      date: formatDate(new Date(data.date)),
      card_number: item["SỐ TKNH"],
      amount: +item["SỐ TIỀN"],
      type: "Thanh toán chi phí khác",
      description: item["HẠNG MỤC THANH TOÁN"]
    }));
    if(!dataSubmit) {
      notification.warning('Bạn cần import dữ liệu')
      return;
    }
    try {
      await BankCostsDeclaration(dataSubmit)
      setOpenModalCosts(false);
      notification.success('Khai báo Tiền nhận thành công')
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const invalidData = err.response?.data.invalidData
        for (const key in invalidData) {
          if (Array.isArray(invalidData[key]) && invalidData[key].includes("Số thẻ ngân hàng không tồn tại hoặc đã ngừng sử dụng.")) {
            const index = parseInt(key.split('.')[1], 10);
            notification.error(`Số TKNH "${dataSubmit[index].card_number}" không tồn tại hoặc đã ngừng sử dụng.`)
            break;
          }
        }
      } else {
        notification.error('Có lỗi xảy ra, vui lòng thử lại!')
      }
    } finally {
      setLoading(false);
    }
  }

  console.log(dataImport)

  const columns: TableColumnsType = [
    {
      title: 'SỐ TIỀN',
      dataIndex: 'SỐ TIỀN',
      key: '2'
    },
    {
      title: 'SỐ TKNH',
      dataIndex: 'SỐ TKNH',
      key: '3',
    },
    {
      title: 'HẠNG MỤC THANH TOÁN',
      dataIndex: 'HẠNG MỤC THANH TOÁN',
      key: '4'
    }
  ]

  return (
    <>
      <Modal open={openModalCosts} onCancel={onCloseModal} footer={false} className="!w-1/2">
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
          <label htmlFor="import-ad-costs" className="h-full">
            <div className="flex justify-center">
              <div className="bg-[#68c2ed] rounded-md cursor-pointer h-full px-4 py-2 my-4 flex items-center justify-center hover:opacity-80 duration-300">
                <span className="text-white">Khai báo Chi phí</span>
              </div>
            </div>
            <input type="file" onChange={handleFileUpload} id="import-ad-costs" className="!hidden" />
          </label>
        {dataImport && (
          <>
            <Table dataSource={dataImport} columns={columns} rowKey={(record) => record["ID TKQC"]} pagination={false} />
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

export default CostsDeclaration