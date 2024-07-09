// import Table from 'rc-table';
import { Table, ConfigProvider } from 'antd';
import { AdsBillingsDTO } from '../../../dto/AdsBillingsDTO';
import { generateDynamicColumns, staticColumns } from './columns';


function TotalInvoice(props: { data: AdsBillingsDTO[], setOpenInvoiceDetails: React.Dispatch<React.SetStateAction<boolean>> }) {
  const { data, setOpenInvoiceDetails } = props;
  
  const dynamicColumns = data.length > 0 ? generateDynamicColumns(data[0].datas, setOpenInvoiceDetails) : [];
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
        />
      </ConfigProvider>
    </div>
  )
}

export default TotalInvoice;