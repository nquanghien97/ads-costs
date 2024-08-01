import { TableColumnsType } from "antd";
import { GroupData } from "./type";
import { formatCurrency } from "../../../../utils/currency";

export const columns: TableColumnsType<GroupData> = [
  {
    title: "SỐ LIỆU BÁO CÁO ADS",
    key: '1',
    render(_, record) {
      return (
        <>
          <div className="flex border-b-[1px] border-[red] font-bold">
            <div className="flex items-center bg-[#29a9e0] text-white uppercase">
              <div className="min-w-[200px]">Số liệu theo TKQC</div>
            </div>
            <div className="w-full bg-[#c4e6f4]">
              <div className="py-1 w-full border-b-[1px] border-l-[1px] border-[red] uppercase text-left pl-2">Tổng</div>
              <div className="py-1 w-full border-b-[1px] border-l-[1px] border-[red] uppercase text-left pl-2">TK THƯỜNG - Trả trước</div>
              <div className="py-1 w-full border-b-[1px] border-l-[1px] border-[red] uppercase text-left pl-2">TK THƯỜNG - Trả sau</div>
              <div className="py-1 w-full border-l-[1px] border-[red] uppercase text-left pl-2">TK THUÊ</div>
            </div>
          </div>
          <div className="flex font-bold">
            <div className="flex items-center bg-[#c12f5b] text-white uppercase">
              <div className="min-w-[200px]">Số liệu theo Kênh</div>
            </div>
            <div className="flex flex-col w-full bg-[#f7bfd7]">
              {record.channel_datas.map((item) => (
                <div className="py-1 w-full [&:not(:last-child)]:border-b-[1px] border-[red] border-l-[1px] uppercase text-left pl-2" key={item.channel}>{item.channel}</div>
              ))}
            </div>
          </div>
        </>
      )
    },
    width: 400,
    align: 'center'
  },
  {
    title: "TỔNG CPQC",
    key: '2',
    render(_, record) {
      return(
        <div className="font-normal">
          <div className="py-1 w-full border-b-[1px] border-[red] bg-[#c4e6f4]">{`${formatCurrency(record.total_ads || 0)} VNĐ`}</div>
          <div className="py-1 w-full border-b-[1px] border-[red] bg-[#c4e6f4]">{`${formatCurrency(record.account_type_datas.find((item) => item.type === "TK THƯỜNG - Trả trước")?.total_ads || 0)} VNĐ`}</div>
          <div className="py-1 w-full border-b-[1px] border-[red] bg-[#c4e6f4]">{`${formatCurrency(record.account_type_datas.find((item) => item.type === "TK THƯỜNG - Trả sau")?.total_ads || 0)} VNĐ`}</div>
          <div className="py-1 w-full border-b-[1px] border-[red] bg-[#c4e6f4]">{`${formatCurrency(record.account_type_datas.find((item) => item.type === "TK THUÊ")?.total_ads || 0)} VNĐ`}</div>
          {record.channel_datas.map((item, index) => (
            <div className="py-1 w-full [&:not(:last-child)]:border-b-[1px] border-[red] bg-[#f7bfd7]" key={index}>{`${formatCurrency(item?.total_ads)} VNĐ`}</div>
          ))}
        </div>
      ) 
    },
    align: 'center'
  },
  {
    title: "TỔNG HÓA ĐƠN",
    key: '3',
    render(_, record) {
      return(
        <div className="font-normal">
          <div className="py-1 w-full border-b-[1px] border-[red] bg-[#c4e6f4]">{`${formatCurrency(record.total_bill || 0)} VNĐ`}</div>
          <div className="py-1 w-full border-b-[1px] border-[red] bg-[#c4e6f4]">{`${formatCurrency(record.account_type_datas.find((item) => item.type === "TK THƯỜNG - Trả trước")?.total_bill || 0)} VNĐ`}</div>
          <div className="py-1 w-full border-b-[1px] border-[red] bg-[#c4e6f4]">{`${formatCurrency(record.account_type_datas.find((item) => item.type === "TK THƯỜNG - Trả sau")?.total_bill || 0)} VNĐ`}</div>
          <div className="py-1 w-full border-b-[1px] border-[red] bg-[#c4e6f4]">{`${formatCurrency(record.account_type_datas.find((item) => item.type === "TK THUÊ")?.total_bill || 0)} VNĐ`}</div>
          {record.channel_datas.map((item, index) => (
            <div className="py-1 w-full [&:not(:last-child)]:border-b-[1px] [&:not(:last-child)]:border-[red] bg-[#f7bfd7]" key={index}>{`${formatCurrency(item?.total_bill)} VNĐ`}</div>
          ))}
        </div>
      ) 
    },
    align: 'center'
  }
]
