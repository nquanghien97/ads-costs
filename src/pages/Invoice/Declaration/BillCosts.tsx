import { Button, Modal, Table, TableColumnsType } from "antd";
import { ChangeEvent, useState } from "react";
import * as XLSX from "xlsx";

interface DataRow {
  id: number;
  'chi phí': string;
}

function BillCosts() {
  const [dataBill, setDataBill] = useState<DataRow[] | null>(null);
  const [openModalBillCosts, setOpenModalBillCosts] = useState(false);

  const handleFileUpload = (e : ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if(file) {
      const reader = new FileReader();
  
      reader.onload = (event) => {
        const workbook = XLSX.read(event.target?.result, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const sheetData: DataRow[] = XLSX.utils.sheet_to_json(sheet);
  
        setDataBill(sheetData);
        setOpenModalBillCosts(true);
      };
  
      reader.readAsArrayBuffer(file);
    }
    e.target.value = '';
  };

  const onCloseModal = () => {
    setOpenModalBillCosts(false);
    setDataBill(null);
  }

  const onOk = () => {
    console.log(dataBill)
    setOpenModalBillCosts(false);
  }

  const columns: TableColumnsType = [
    {
      title: 'MÚI GIỜ',
      dataIndex: ['MÚI GIỜ'],
      key: '1',
    },
    {
      title: 'ID GIAO DỊCH',
      dataIndex: ['ID GIAO DỊCH'],
      key: '2',
    },
    {
      title: 'NGÀY PHÁT SINH HÓA ĐƠN',
      dataIndex: ['NGÀY PHÁT SINH HÓA ĐƠN'],
      key: '3',
    },
    {
      title: 'SỐ TIỀN',
      dataIndex: ['SỐ TIỀN'],
      key: '4',
    },
    {
      title: 'PTTT',
      dataIndex: ['PTTT'],
      key: '5',
    },
    {
      title: 'MÃ THAM CHIẾU',
      dataIndex: ['MÃ THAM CHIẾU'],
      key: '2',
    },
  ] 

  return (
    <>
    <label htmlFor="import-bill-costs" className="h-full">
      <div className="bg-[#0071ba] rounded-md cursor-pointer px-4 h-full flex items-center justify-center hover:opacity-80 duration-300">
        <span className="text-white">Khai Báo Hóa Đơn</span>
      </div>
      <input type="file" onChange={handleFileUpload} id="import-bill-costs" className="hidden" />
    </label>
    {dataBill && (
      <Modal open={openModalBillCosts} onCancel={onCloseModal} onOk={onOk} footer={false}>
        <Table dataSource={dataBill} columns={columns} rowKey={(record) => record.id} />
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