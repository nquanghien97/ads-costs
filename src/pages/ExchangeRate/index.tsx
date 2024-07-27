import { ConfigProvider, Table, TableColumnsType } from "antd"

interface RateData {
  id: number;
  date: string;
  bank_id: number;
  currency_id: number;
  rate: number;
  created_at: string;
  bank: string;
  currency: string;
}

interface TransformedData {
  bank: string;
  currency: string;
  [date: string]: number | string;
}

const data: RateData[] = [
  {
    id: 1,
    date: "2024-07-25",
    bank_id: 3,
    currency_id: 1,
    rate: 1,
    created_at: "2024-07-26T07:11:57.000000Z",
    bank: "TECHCOMBANK",
    currency: "VNĐ"
  },
  {
    id: 2,
    date: "2024-07-25",
    bank_id: 3,
    currency_id: 1,
    rate: 25000,
    created_at: "2024-07-26T07:11:57.000000Z",
    bank: "TECHCOMBANK",
    currency: "USD"
  },
  {
    id: 3,
    date: "2024-07-25",
    bank_id: 3,
    currency_id: 1,
    rate: 17000,
    created_at: "2024-07-26T07:11:57.000000Z",
    bank: "TECHCOMBANK",
    currency: "BATH"
  },
  {
    id: 4,
    date: "2024-07-26",
    bank_id: 3,
    currency_id: 1,
    rate: 26000,
    created_at: "2024-07-26T07:11:57.000000Z",
    bank: "TECHCOMBANK",
    currency: "USD"
  }
]

const transformedData = data.reduce<TransformedData[]>((acc, item) => {
  const existingEntry = acc.find(entry => entry.bank === item.bank && entry.currency === item.currency);

  if (!existingEntry) {
    const newEntry: TransformedData = {
      bank: item.bank,
      currency: item.currency,
      [item.date]: item.rate // Thêm giá trị theo ngày
    };
    acc.push(newEntry);
  } else {
    existingEntry[item.date] = item.rate; // Cập nhật giá trị nếu đã tồn tại
  }

  return acc;
}, []);
const finalData = Object.values(transformedData);

const uniqueDates = [...new Set(data.map(item => item.date))];

const columns: TableColumnsType = [
  {
    title: 'Bank',
    dataIndex: 'bank',
    key: 'bank',
    fixed: 'left',
    width: 200
  },
  {
    title: 'Currency',
    dataIndex: 'currency',
    key: 'currency',
    fixed: 'left',
    width: 200
  },
  ...uniqueDates.map(date => ({
    title: date,
    dataIndex: date,
    key: date,
    width: 200
  }))
];
console.log(columns)

function ExchangeRate() {
  return (
    <div className="flex justify-center p-8">
      <ConfigProvider
          theme={{
            token: {
              borderRadius: 8,
            },
            components: {
              Table: {
                borderColor: "red",
                headerBg: "#d19b5c !important",
              }
            }
          }}
        >
        <Table
          columns={columns}
          dataSource={finalData}
          rowKey={(record) => record.id}
          scroll={{ x: columns.length * 100 }}
          rowClassName={(_, index) => index % 2 === 0 ? '[&>*]:!bg-[#ccc] no-padding' :  '[&>*]:!bg-[#e5d1ba] no-padding'}
          rowHoverable={false}
          bordered
        />
      </ConfigProvider>
    </div>
  )
}

export default ExchangeRate