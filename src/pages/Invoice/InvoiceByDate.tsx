import Table, { ColumnsType } from "rc-table";
import Select from "react-select";
import EyeIcon from "../../assets/icons/EyeIcon";
import { useState } from "react";
import { AdsBillingsByDate } from "../../dto/AdsBillingsDTO";
import { unstable_renderSubtreeIntoContainer } from "react-dom";

const options = [
  { value: 'da-xac-nhan', label: 'Đã xác nhận' },
  { value: 'sai-so-lieu', label: 'Sai số liệu' },
  { value: 'chua-xin', label: 'Chưa xin' },
];

interface InvoiceByDateProps {
  setOpenInvoiceDetails: React.Dispatch<React.SetStateAction<boolean>>
  data: AdsBillingsByDate
}
type ValueType = {
  value: string;
  label: string;
} | null

function InvoiceByDate(props: InvoiceByDateProps) {
  const { setOpenInvoiceDetails, data } = props
  const [value, setValue] = useState<ValueType>(); 
    
  const handleValueChange = (value: ValueType, a) => {
  setValue(value); 
  console.log(value)
  }
  const columns: ColumnsType<AdsBillingsByDate> = [
  
    {
      title: 'Tổng CPQC',
      dataIndex: 'ads',
      width: 200,
      key: 'e',
      render: (_, value) => (
        <div>
          <div className="row-custom">{value.ads}</div>
          <div className="row-custom">{value.ads_vnd}</div>
        </div>
      ),
    },
    {
      title: 'Tổng hóa đơn',
      dataIndex: 'bill',
      width: 200,
      key: 'e',
      render: (_, value) => (
        <div>
          <div className="row-custom flex items-center justify-between gap-2">
            {value.bill}
            <div onClick={() => setOpenInvoiceDetails(true)} >
              <EyeIcon width={18} height={18} className="cursor-pointer" />
            </div>
          </div>
          <div className="row-custom flex items-center justify-between gap-2">
            {value.bill_vnd}
          </div>
        </div>
      ),
    },
    {
      title: "Xác nhận số liệu",
      key: "f",
      render: (e) => (
        <div className={`px-2 flex items-center justify-center`}>
          <Select
            options={options}
            onChange={(ey) => handleValueChange(ey, e.xacNhanSoLieu)}
            defaultValue={e.xacNhanSoLieu}
            // value={value}
            className=" w-[120px]"
            placeholder="Select..."
          />
        </div>
      )
    },
  ];

  if(!data) return
  return (
    <div className="">
      <div className="px-6 py-2 my-2 rounded-full bg-[#0071BA] text-white sticky top-[12px] z-50 flex">{data.time}</div>
      <Table columns={columns} data={[data]} rowKey={(record) => record.time} />
    </div>
  )
}

export default InvoiceByDate;
