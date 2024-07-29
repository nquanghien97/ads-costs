import { Button, DatePicker, Form, Modal, Table, TableColumnsType } from "antd";
import { ChangeEvent, useState } from "react";
import * as XLSX from "xlsx";
import { formatDate } from "../../../utils/date";
import { useNotification } from "../../../hooks/useNotification";
import localeValues from "antd/locale/vi_VN";
import { ExchangeRateDeclaration } from "../../../services/exchange_rates";
import { useInformationSettingsStore } from "../../../zustand/information_settings.store";

interface DataRow {
  'NGÂN HÀNG': string;
  'TIỀN TỆ': string;
  'TỶ GIÁ': number;
  __rowNum__: number
}

interface ExchangeRateProps {
  openModalExchangeRate: boolean
  setOpenModalExchangeRate: React.Dispatch<React.SetStateAction<boolean>>
}

function ExchangeRate(props: ExchangeRateProps) {
  const { openModalExchangeRate, setOpenModalExchangeRate } = props;

  const [dataImport, setDataImport] = useState<DataRow[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const { banks, currencies } = useInformationSettingsStore();

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
    setOpenModalExchangeRate(false);
    setDataImport(null);
  }

  const onFinish = async (data: { date: Date}) => {
    setLoading(true);
    const dataSubmit = dataImport?.map(item => ({
      date: formatDate(new Date(data.date)),
      bank_id: banks.find(bank => bank.name === item["NGÂN HÀNG"])?.id || -1,
      currency_id: currencies.find(currency => currency.name === item["TIỀN TỆ"])?.id || -1,
      rate: +item["TỶ GIÁ"]
    }));
    if(!dataSubmit) {
      notification.warning('Bạn cần import dữ liệu')
      return;
    }
    try {
      await ExchangeRateDeclaration(dataSubmit)
      setOpenModalExchangeRate(false);
      notification.success('Khai báo Tỷ giá ngân hàng thành công')
    } catch (err) {
      console.log(err);
      notification.error('Khai báo Tỷ giá ngân hàng không thành công')
    } finally {
      setLoading(false);
    }
  }

  const columns: TableColumnsType<DataRow> = [
    {
      title: 'NGÂN HÀNG',
      dataIndex: 'NGÂN HÀNG',
      key: '1'
    },
    {
      title: 'TIỀN TỆ',
      dataIndex: 'TIỀN TỆ',
      key: '2',
    },
    {
      title: 'TỶ GIÁ',
      dataIndex: 'TỶ GIÁ',
      key: '3',
    }
  ]

  return (
    <> 
      <Modal open={openModalExchangeRate} onCancel={onCloseModal} footer={false} className="!w-1/2">
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
          <div className="flex items-center justify-center">
            <label htmlFor="import-ad-costs" className="h-full">
              <div className="flex justify-center">
                <div className="bg-[#0071ba] rounded-md cursor-pointer h-full px-4 py-2 my-4 flex items-center justify-center hover:opacity-80 duration-300">
                  <span className="text-white">Khai báo tỷ giá ngân hàng</span>
                </div>
              </div>
              <input type="file" onChange={handleFileUpload} id="import-ad-costs" className="!hidden" />
            </label>
          </div>
        {dataImport && (
          <>
            <Table dataSource={dataImport} columns={columns} rowKey={(record) => record.__rowNum__} />
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

export default ExchangeRate