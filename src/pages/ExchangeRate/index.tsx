import { ConfigProvider, Table, TableColumnsType } from "antd"
import { useEffect, useState } from "react";
import { getListExchangeRate } from "../../services/exchange_rates";
import { ExchangeRateType } from "../../entities/ExchangeRate";

interface TransformedData {
  bank: string;
  currency: string;
  [date: string]: number | string;
}

function ExchangeRate() {
  const [dataExchangeRate, setDataExchangeRate] = useState<ExchangeRateType[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    (async () => {
      const res = await getListExchangeRate()
      setDataExchangeRate(res.data.data.list);
      setLoading(false);
    })()
  }, []);

  const transformedData = dataExchangeRate.reduce<TransformedData[]>((acc, item) => {
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
  
  const uniqueDates = [...new Set(dataExchangeRate.map(item => item.date))];

  const columns: TableColumnsType = [
    {
      title: 'Ngân hàng',
      dataIndex: 'bank',
      key: 'bank',
      fixed: 'left',
      width: 200
    },
    {
      title: 'Tiền tệ',
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
          scroll={{ x: columns.length * 100, y: 700 }}
          rowClassName={(_, index) => index % 2 === 0 ? '[&>*]:!bg-[#ccc] no-padding' :  '[&>*]:!bg-[#e5d1ba] no-padding'}
          rowHoverable={false}
          bordered
          loading={loading}
          pagination={false}
        />
      </ConfigProvider>
    </div>
  )
}

export default ExchangeRate