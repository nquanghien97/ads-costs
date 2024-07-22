import { Button, DatePicker, Form, Modal, Table, TableColumnsType } from "antd";
import { ChangeEvent, useState } from "react";
import * as XLSX from "xlsx";

interface DataRow {
  id: number;
  'chi phí': string;
}

function AdCosts() {
  const [dataImport, setDataImport] = useState<DataRow[] | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [form] = Form.useForm();

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

  const onOk = () => {
    console.log(dataImport)
    setOpenModal(false);
  }

  const onFinish = (data: { date: Date}) => {
    const date = new Date(data.date)
    const padZero = (num: number) => num < 10 ? `0${num}` : num;

    const year = date.getFullYear();
    const month = padZero(date.getMonth() + 1);
    const day = padZero(date.getDate());
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    const seconds = padZero(date.getSeconds());
    const time = (`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`)
    console.log({ time, dataImport})
  }

  const columns: TableColumnsType = [
    {
      title: 'NGÀY',
      dataIndex: 'NGÀY',
      key: '1',
    },
    {
      title: 'ID TKQC',
      dataIndex: 'ID TKQC',
      key: '2'
    },
    {
      title: 'CHI PHÍ',
      dataIndex: ['CHI PHÍ'],
      key: '3',
    },
  ]

  return (
    <>
      <div className="bg-[#0071ba] rounded-md cursor-pointer h-full px-4 flex items-center justify-center hover:opacity-80 duration-300" onClick={() => setOpenModal(true)}>
        <span className="text-white">Khai Báo CPQC</span>
      </div>
      <div className="p-4">
        <Modal open={openModal} onCancel={onCloseModal} onOk={onOk} footer={false} className="!w-1/2">
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
              <DatePicker showTime />
            </Form.Item>
            <label htmlFor="import-ad-costs" className="h-full">
              <div className="flex justify-center">
                <div className="bg-[#0071ba] rounded-md cursor-pointer h-full px-4 py-2 my-4 flex items-center justify-center hover:opacity-80 duration-300">
                  <span className="text-white">Khai Báo CPQC...</span>
                </div>
              </div>
              <input type="file" onChange={handleFileUpload} id="import-ad-costs" className="!hidden" />
            </label>
          {dataImport && (
            <>
              <Table dataSource={dataImport} columns={columns} rowKey={(record) => record["ID TKQC"]} />
              <div className="flex justify-evenly py-4">
                <Button type="primary" danger onClick={onCloseModal}>Hủy</Button>
                <Button type="primary" htmlType="submit">Xác nhận</Button>
              </div>
            </>
          )}
          </Form>
        </Modal>
      </div>
    </>
  );
}

export default AdCosts