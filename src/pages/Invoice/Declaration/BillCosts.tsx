import { Button, Modal, Table, TableColumnsType } from "antd";
import { ChangeEvent, useState } from "react";
import * as XLSX from "xlsx";
import { convertCurrencyStringToNumber } from "../../../utils/convertCurrency";
import { formatDate } from "../../../utils/formatDate";
import { useNotification } from "../../../hooks/useNotification";
import { DeclarationAdsBills } from "../../../services/ads_bills";

interface DataRow {
  'ID TKQC': number;
  'ID GIAO DỊCH': string;
  'MÃ THAM CHIẾU': string;
  'NGÀY': string;
  'SỐ TIỀN': string;
  'PTTT': string;
}

function BillCosts() {
  const [dataBill, setDataBill] = useState<DataRow[] | null>(null);
  const [openModalBillCosts, setOpenModalBillCosts] = useState(false);
  const [loading, setLoading] = useState(false);

  const notification = useNotification();

  const handleFileUpload = (e : ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if(file) {
      const reader = new FileReader();
  
      reader.onload = (event) => {
        const workbook = XLSX.read(event.target?.result, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const sheetData: DataRow[] = XLSX.utils.sheet_to_json(sheet, {
          raw: false,
          dateNF: 'yyy-mm-dd',
        });
  
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

  const onOk = async () => {
    setLoading(true);
    const dataSubmit = dataBill?.map(item => ({
      date: formatDate(new Date(item['NGÀY'])),
      amount: convertCurrencyStringToNumber(item['SỐ TIỀN']),
      payment_method: item['PTTT'],
      refer_code: item['MÃ THAM CHIẾU'],
      billing_id: item['ID GIAO DỊCH'],
      account_id: item['ID TKQC']
    }))
    if (!dataSubmit) {
      notification.warning('Bạn cần import dữ liệu')
      return;
    }
    try {
      await DeclarationAdsBills(dataSubmit)
      setOpenModalBillCosts(false);
      console.log(dataSubmit)
      notification.success('Khai báo Hóa đơn thành công')
    } catch (err) {
      console.log(err);
      notification.error('Khai báo Hóa đơn không thành công')
    } finally {
      setLoading(false)
    }
  }

  const columns: TableColumnsType<DataRow> = [
    {
      title: 'MÚI GIỜ',
      dataIndex: ['MÚI GIỜ'],
      width: 200,
      key: '1',
    },
    {
      title: 'ID TKQC',
      dataIndex: 'ID TKQC',
      key: '2'
    },
    {
      title: 'ID GIAO DỊCH',
      dataIndex: ['ID GIAO DỊCH'],
      width: 320,
      key: '3',
    },
    {
      title: 'NGÀY',
      dataIndex: ['NGÀY'],
      key: '4',
    },
    {
      title: 'SỐ TIỀN',
      dataIndex: ['SỐ TIỀN'],
      key: '5',
    },
    {
      title: 'PTTT',
      dataIndex: ['PTTT'],
      key: '6',
    },
    {
      title: 'MÃ THAM CHIẾU',
      dataIndex: ['MÃ THAM CHIẾU'],
      width: 200,
      key: '7',
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
      <Modal open={openModalBillCosts} onCancel={onCloseModal} footer={false} className="!w-full">
        <Table dataSource={dataBill} columns={columns} rowKey={(record) => record["ID GIAO DỊCH"]} />
        <div className="flex justify-evenly py-4">
          <Button type="primary" danger onClick={onCloseModal}>Hủy</Button>
          <Button type="primary" htmlType="submit" onClick={onOk} loading={loading}>Xác nhận</Button>
        </div>
      </Modal>
    )}
    </>
  );
}

export default BillCosts