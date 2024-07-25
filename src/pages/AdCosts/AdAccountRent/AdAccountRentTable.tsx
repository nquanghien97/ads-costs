// import type { ColumnsType } from 'rc-table';
// import Table from 'rc-table';
import { ConfigProvider, Empty, Table } from 'antd';
import { AdAccountData, TotalDailyData } from '../../../dto/AdsBillingsDTO';
import { generateDynamicColumns, staticColumns } from './columns';

function AdAccountRentTable(props: { data: AdAccountData[], setOpenInvoiceDetails: React.Dispatch<React.SetStateAction<boolean>>, loading: boolean }) {
  const { data, setOpenInvoiceDetails, loading } = props;
  
  const dataForDynamicColumns = data.flatMap(x => 
    Object.entries(x.datas).map(([date, data]) => ({
      date,
      ...data
    }))
  );
  const dynamicColumns = data.length > 0 ? generateDynamicColumns(dataForDynamicColumns.reduce((acc: TotalDailyData, cur) => {
    acc[cur.date] = cur;
    return acc;
  }, {}), setOpenInvoiceDetails) : [];
  const columns = [...staticColumns, ...dynamicColumns];

  return (
    <div className="relative">
      <div className="py-2 flex justify-start">
        <span className="px-6 py-2 rounded-full bg-[#8e3e58] text-white">TKQC Thuê</span>
      </div>
      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: 'red',
            borderRadius: 8,
            colorBorder: "#eb9d4d",
            // Alias Token
            colorBgContainer: '#dea6bd',
          },
          components: {
            Table: {
              borderColor: "red",
              headerBg: "#8e3e58",
              headerColor: "white"
            }
          }
        }}
        renderEmpty={() => <Empty description="Không có dữ liệu" />}
      >
        <Table
          columns={columns}
          dataSource={data}
          rowKey={(record) => record.ad_account_id}
          bordered
          pagination={false}
          scroll={{ x: data.length === 0 ? undefined : columns.length * 100, y: 240 }}
          rowHoverable={false}
          className='not-fixed'
          rowClassName="no-padding"
          loading={loading}
        />
      </ConfigProvider>
    </div>
  );
} 

export default AdAccountRentTable;