import { ConfigProvider, Table } from "antd"
import { data, generateDynamicColumns } from "./columns"

function TableAdsAccount() {
  const columns = generateDynamicColumns(data)
  return (
    <div>
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
          columns={[...columns]}
          dataSource={data}
          rowKey={(record) => record.id} 
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

export default TableAdsAccount