import Table, { ColumnsType } from "rc-table";
import Select from "react-select";
import EyeIcon from "../../assets/icons/EyeIcon";
import { useState } from "react";

const options = [
  { value: 'da-xac-nhan', label: 'Đã xác nhận' },
  { value: 'sai-so-lieu', label: 'Sai số liệu' },
  { value: 'chua-xin', label: 'Chưa xin' },
];

interface RecordType {
  tongCPQC: {
    TKQC: string;
    VND: string;
  };
  tongHoaDon: {
    TKQC: string;
    VND: string;
  };
  xacNhanSoLieu: { value: string; label: string };
  key: string,
}

interface InvoiceByDateProps {
  setOpenInvoiceDetails: React.Dispatch<React.SetStateAction<boolean>>
}
type ValueType = {
  value: string;
  label: string;
} | null
function InvoiceByDate(props: InvoiceByDateProps) {
  const { setOpenInvoiceDetails } = props
  const [value, setValue] = useState<ValueType>(); 
    
  const handleValueChange = (value: ValueType, a) => {
  setValue(value); 
  console.log(value)
  }
  const columns: ColumnsType<RecordType> = [
  
    {
      title: 'Tổng CPQC',
      dataIndex: 'tongCPQC',
      width: 200,
      key: 'e',
      render: (e) => (
        <div>
          <div className="row-custom">{e.TKQC}</div>
          <div className="row-custom">{e.VND}</div>
        </div>
      ),
    },
    {
      title: 'Tổng hóa đơn',
      dataIndex: 'tongHoaDon',
      width: 200,
      key: 'e',
      render: (e) => (
        <div>
          <div className="row-custom flex items-center justify-between gap-2">
            {e.TKQC}
            <div onClick={() => setOpenInvoiceDetails(true)} >
              <EyeIcon width={18} height={18} className="cursor-pointer" />
            </div>
          </div>
          <div className="row-custom flex items-center justify-between gap-2">
            {e.VND}
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
  
  const data: RecordType[] = [
    {
      tongCPQC: {
        TKQC: "25$",
        VND: "625.000đ",
      },
      tongHoaDon: {
        TKQC: "25$",
        VND: "625.000đ",
      },
      xacNhanSoLieu: {
        value: 'chua-xin',
        label:'Chưa xin'
      } ,
      key: "1",
    },
    {
      tongCPQC: {
        TKQC: "25$",
        VND: "625.000đ",
      },
      tongHoaDon: {
        TKQC: "25$",
        VND: "625.000đ",
      },
      xacNhanSoLieu: {
        value: 'da-xac-nhan',
        label:'Đã xác nhận'
      } ,
      key: "2",
    },
    {
      tongCPQC: {
        TKQC: "25$",
        VND: "625.000đ",
      },
      tongHoaDon: {
        TKQC: "25$",
        VND: "625.000đ",
      },
      xacNhanSoLieu: {
        value: 'sai-so-lieu',
        label:'Sai số liệu'
      } ,
      key: "3",
    },
    {
      tongCPQC: {
        TKQC: "25$",
        VND: "625.000đ",
      },
      tongHoaDon: {
        TKQC: "25$",
        VND: "625.000đ",
      },
      xacNhanSoLieu: {
        value: 'da-xac-nhan',
        label:'Đã xác nhận'
      } ,
      key: "4",
    },
    {
      tongCPQC: {
        TKQC: "25$",
        VND: "625.000đ",
      },
      tongHoaDon: {
        TKQC: "25$",
        VND: "625.000đ",
      },
      xacNhanSoLieu: {
        value: 'chua-xin',
        label: 'Chưa xin'
      } ,
      key: "5",
    },
  ];
  
  return (
    <div className="">
      <div className="px-6 py-2 my-2 rounded-full bg-[#0071BA] text-white sticky top-[12px] z-50 flex">14 / 06</div>
      <Table columns={columns} data={data} />
    </div>
  )
}

export default InvoiceByDate;
