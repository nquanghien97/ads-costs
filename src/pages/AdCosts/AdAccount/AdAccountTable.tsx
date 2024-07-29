// import Table from 'rc-table';
import { Table, ConfigProvider, Empty } from 'antd';
import { AdAccountData, TotalDailyData } from '../../../dto/AdsBillingsDTO';
import { GenerateDynamicColumns } from './columns/GenerateDynamicColumns';
import { StaticColumns } from './columns/StaticColumns';


function AdAccountTable(props: { data: AdAccountData[], setOpenInvoiceDetails: React.Dispatch<React.SetStateAction<boolean>>, loading: boolean }) {
  const { data, setOpenInvoiceDetails, loading } = props;
  
  const dataForDynamicColumns = data.flatMap(x => 
    Object.entries(x.datas).map(([date, data]) => ({
      date,
      ...data
    }))
  );
  const dynamicColumns = GenerateDynamicColumns(dataForDynamicColumns.reduce((acc: TotalDailyData, cur) => {
    acc[cur.date] = cur;
    return acc;
  }, {}), setOpenInvoiceDetails);
  const columns = [...StaticColumns, ...dynamicColumns];

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
            // colorBgContainer: '#e5d1ba',
          },
          components: {
            Table: {
              borderColor: "red",
              headerBg: "#ebd1b2"
            }
          }
        }}
        renderEmpty={() => <Empty description="Không có dữ liệu" />}
      >
        <Table
          columns={columns}
          dataSource={data}
          rowKey={(record) => record.ad_account_id}
          rowClassName={(_, index) => index % 2 === 0 ? '[&>*]:!bg-[#e9e9e9] no-padding' :  '[&>*]:!bg-[#ebd1b2] no-padding'}
          pagination={false}
          bordered
          scroll={{ x: columns.length * 100, y: 240 }}
          rowHoverable={false}
          className='not-fixed'
          loading={loading}
        />
      </ConfigProvider>
    </div>
  )
}

export default AdAccountTable;