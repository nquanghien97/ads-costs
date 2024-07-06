// import { useState } from "react";
// import Table, { ColumnsType } from "rc-table";
import { Table, ConfigProvider, Select } from "antd";
import { TableColumnsType } from "antd";
// import Select from "react-select";
import EyeIcon from "../../assets/icons/EyeIcon";
import { AdsBillingsByDate } from "../../dto/AdsBillingsDTO";

const options = [
  { value: 'da-xac-nhan', label: 'Đã xác nhận' },
  { value: 'sai-so-lieu', label: 'Sai số liệu' },
  { value: 'chua-xin', label: 'Chưa xin' },
];

interface InvoiceByDateProps {
  setOpenInvoiceDetails: React.Dispatch<React.SetStateAction<boolean>>
  data: AdsBillingsByDate
  type: string
}
// type ValueType = {
//   value: string;
//   label: string;
// } | null

function InvoiceByDate(props: InvoiceByDateProps) {
  const { setOpenInvoiceDetails, data, type } = props
  // const [value, setValue] = useState<ValueType>(); 
    
  // const handleValueChange = (value: ValueType) => {
  //   setValue(value); 
  // }
  // console.log(value)
  const columns: TableColumnsType<AdsBillingsByDate> = [
  
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
            size="large"
            // onChange={(ey) => handleValueChange(ey, e.xacNhanSoLieu)}
            defaultValue={e.xacNhanSoLieu}
            // value={value}
            className=" w-[120px]"
            placeholder="Select..."
          />
        </div>
      )
    },
  ];

  const datas = [
    {
      id: "3213",
      time: "01/06",
      ads: 2000,
      ads_vnd: 4800000,
      bill: 200,
      bill_vnd: 48000,
      exchange_rate: 24000,
      status: "Đã xác nhận"
    },
    {
      id: "1341",
      time: "01/06",
      ads: 2000,
      ads_vnd: 4800000,
      bill: 200,
      bill_vnd: 48000,
      exchange_rate: 24000,
      status: "Đã xác nhận"
    }
  ]

  if(!data) return
  return (
    <div className="">
      {type === "TKQC Thường" ? (
        <div className="px-6 py-2 my-2 rounded-full bg-[#0071BA] text-white sticky top-[12px] z-50 flex">{data.time}</div>
      ) : (
        <div className="px-6 py-2 my-2 rounded-full h-10 z-50 flex"></div>
      )}
      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: 'red',
            borderRadius: 8,
            colorBorder: "#eb9d4d",
            // Alias Token
            colorBgContainer: '#f6ffea',
          },
          components: {
            Table: {
              borderColor: "red",
              headerBg: "#2b663c"
            }
          }
        }}
      >
        <Table columns={columns} dataSource={datas} rowKey={(record) => record.id} pagination={false} bordered />
      </ConfigProvider>
    </div>
  )
}

export default InvoiceByDate;
