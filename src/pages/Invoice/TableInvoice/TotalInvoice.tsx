// import Table from 'rc-table';
import { Table, ConfigProvider, Empty } from 'antd';
import { AdAccountData, TotalDailyData } from '../../../dto/AdsBillingsDTO';
import { generateDynamicColumns, staticColumns } from './columns';


function TotalInvoice(props: { data: AdAccountData[], setOpenInvoiceDetails: React.Dispatch<React.SetStateAction<boolean>>, loading: boolean }) {
  const { data, setOpenInvoiceDetails, loading } = props;
  
  const dataForDynamicColumns = data.flatMap(x => 
    Object.entries(x.datas).map(([date, data]) => ({
      date,
      ...data
    }))
  );
  const dynamicColumns = generateDynamicColumns(dataForDynamicColumns.reduce((acc: TotalDailyData, cur) => {
    acc[cur.date] = cur;
    return acc;
  }, {}), setOpenInvoiceDetails);
  const columns = [...staticColumns, ...dynamicColumns];

  return (
    <div className="relative">
      <div className="py-2 flex justify-start">
        <span className="px-6 py-2 rounded-full bg-[#eb9d4d] text-white">TKQC Thường</span>
      </div>
      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: 'red',
            borderRadius: 8,
            colorBorder: "#eb9d4d",
            // Alias Token
            colorBgContainer: '#e5d1ba',
          },
          components: {
            Table: {
              borderColor: "red",
              headerBg: "#db9850"
            }
          }
        }}
        renderEmpty={() => <Empty description="Không có dữ liệu" />}
      >
        <Table
          columns={columns}
          dataSource={data}
          rowKey={(record) => record.ad_account_id} 
          pagination={false}
          bordered
          scroll={{ x: 2000, y: 240 }}
          rowHoverable={false}
          rowClassName="no-padding"
          className='not-fixed'
          loading={loading}
        />
      </ConfigProvider>
    </div>
  )
}

export default TotalInvoice;