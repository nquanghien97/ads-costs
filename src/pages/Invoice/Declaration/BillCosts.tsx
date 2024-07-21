import { Button, Modal, Table, TableColumnsType } from "antd";
import { ChangeEvent, useState } from "react";
import * as XLSX from "xlsx";

interface DataRow {
  id: number;
  'chi phí': string;
}

function BillCosts() {
  const [data, setData] = useState<DataRow[] | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const handleFileUpload = (e : ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if(file) {
      const reader = new FileReader();
  
      reader.onload = (event) => {
        const workbook = XLSX.read(event.target?.result, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const sheetData: DataRow[] = XLSX.utils.sheet_to_json(sheet);
  
        setData(sheetData);
        setOpenModal(true);
      };
  
      reader.readAsArrayBuffer(file);
    }
    e.target.value = '';
  };

  const onCloseModal = () => {
    setOpenModal(false);
    setData(null);
  }

  const onOk = () => {
    console.log(data)
    setOpenModal(false);
  }

  const columns: TableColumnsType = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: '1',
    },
    {
      title: 'Chi phí',
      dataIndex: ['chi phí'],
      key: '2',
    },
  ] 

  return (
    <>
    <label htmlFor="import-ad-costs" className="h-full">
      <div className="bg-[#0071ba] rounded-md cursor-pointer px-4 h-full flex items-center justify-center hover:opacity-80 duration-300">
        <span className="text-white">Khai Báo Hóa Đơn</span>
      </div>
      <input type="file" onChange={handleFileUpload} id="import-ad-costs" className="hidden" />
    </label>
    {data && (
      <Modal open={openModal} onCancel={onCloseModal} onOk={onOk} footer={false}>
        <Table dataSource={data} columns={columns} rowKey={(record) => record.id} />
        <div className="flex justify-evenly py-4">
          <Button type="primary" danger onClick={onCloseModal}>Hủy</Button>
          <Button type="primary" htmlType="submit" onClick={onOk}>Xác nhận</Button>
        </div>
      </Modal>
    )}
    </>
  );
}

export default BillCosts