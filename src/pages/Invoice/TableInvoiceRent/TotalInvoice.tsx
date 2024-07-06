// import type { ColumnsType } from 'rc-table';
// import Table from 'rc-table';
import { ConfigProvider, Table } from 'antd';
import { AdsBillingsDTO } from '../../../dto/AdsBillingsDTO';
import { generateDynamicColumns, staticColumns } from './columns';

// const columns: TableColumnsType<AdsBillingsDTO> = [
//   {
//     title: 'Mã TKQC',
//     dataIndex: 'ad_account',
//     key: '1',
//     render(value) {
//       return value.account_id
//     }
//   },
//   {
//     title: 'Kênh chạy',
//     dataIndex: 'ad_account',
//     width: 100,
//     key: '2',
//     render(value) {
//       return value.channel
//     }
//   },
//   {
//     title: 'ID TKQC',
//     dataIndex: 'ad_account',
//     key: '3',
//     render(value) {
//       return value.id
//     }
//   },
//   {
//     title: 'Tiền tệ',
//     dataIndex: 'ad_account',
//     key: '4',
//     render(value) {
//       return value.currency
//     }
//   },
//   {
//     title: 'Múi giờ',
//     dataIndex: 'ad_account',
//     key: '5',
//     render(value) {
//       return value.timezone
//     }
//   },
//   {
//     title: 'Phí thuê',
//     dataIndex: 'ad_account',
//     width: 100,
//     key: '6',
//     render(value) {
//       return value.rental_fee
//     }
//   },
//   {
//     title: 'Tỷ giá TKQC thuê',
//     dataIndex: 'ad_account',
//     width: 100,
//     key: '7',
//     render(value) {
//       return value.exchange_rate
//     }
//   },
//   {
//     title: 'Trạng thái TKQC',
//     dataIndex: 'ad_account',
//     width: 100,
//     key: '8',
//     render(value) {
//       return value.status
//     }
//   },
//   {
//     title: 'Số liệu',
//     // dataIndex: 'soLieu',
//     width: 200,
//     key: '9',
//     render: () => (
//       <div>
//         <div className="row-custom">TKQC</div>
//         <div className="row-custom">VND</div>
//       </div>
//     ),
//   },
//   {
//     title: 'Tổng CPQC',
//     dataIndex: 'ad_account',
//     width: 200,
//     key: '10',
//     render(_, value) {
//       return (
//         <div>
//           <div className="row-custom">{value.total_ads}</div>
//           <div className="row-custom">{value.total_ads_vnd}</div>
//         </div>
//       )
//     }
//   },
//   {
//     title: 'Tổng hóa đơn',
//     dataIndex: 'ad_account',
//     width: 200,
//     key: '11',
//     render(_, value) {
//       return (
//         <div>
//           <div className="row-custom">{value.total_bill}</div>
//           <div className="row-custom">{value.total_bill_vnd}</div>
//         </div>
//       )
//     }
//   },
// ];

function TotalInvoice(props: { data: AdsBillingsDTO[], setOpenInvoiceDetails: React.Dispatch<React.SetStateAction<boolean>> }) {
  const { data, setOpenInvoiceDetails } = props;

  const dynamicColumns = data.length > 0 ? generateDynamicColumns(data[0].datas, setOpenInvoiceDetails) : [];
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
      >
        <Table
          columns={columns}
          dataSource={data}
          rowKey={(record) => record.ad_account_id}
          bordered
          pagination={false}
          scroll={{ x: 2000, y: 240 }}
          rowHoverable={false}
        />
      </ConfigProvider>
    </div>
  );
} 

export default TotalInvoice;