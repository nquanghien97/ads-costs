// import Table from 'rc-table';
import { Table, ConfigProvider, Empty } from 'antd';
import { AdAccountData, SystemData, TotalDailyData } from '../../../dto/AdsBillingsDTO';
import { GenerateDynamicColumns } from './columns/GenerateDynamicColumns';
import { StaticColumns } from './columns/StaticColumns';
import { useState } from 'react';
import BillDetails from '../BillDetails';


function AdAccountTable(props: { data: SystemData[], loading: boolean }) {
  const { data } = props;
  const [loadingTable, setLoadingTable] = useState(false)
  const [openInvoiceDetails, setOpenInvoiceDetails] = useState(false);
  const [dataDetails, setDataDetails] = useState({
    ad_account_id: -1,
    date: '',
    currency: ''
  });
  const [showHiddenColumns, setShowHiddenColumns] = useState(false);

  // const dataForDynamicColumns = data?.map(data => data.group_datas.map(data => data.user_datas.map((item) => item.ad_account_datas.flatMap(x => 
  //   Object.entries(x.datas).map(([date, data]) => ({
  //     date,
  //     ...data
  //   }))
  // ))))

  const a = data?.map(data => data.group_datas.map(data => data.user_datas.map(item => item.ad_account_datas))).flat(3)
  const dataForDynamicColumns = a.flatMap(x =>
    Object.entries(x.datas).map(([date, data]) => ({
      date,
      ...data
    }))
  )
  const dynamicColumns = GenerateDynamicColumns({
    datas: dataForDynamicColumns.reduce((acc: TotalDailyData, cur) => {
      acc[cur.date] = cur;
      return acc;
    }, {}),
    setDataDetails,
    setOpenInvoiceDetails,
    setLoadingTable
  });
  const hiddenKeys = ['7', '8', '9', '10', '12', '13']
  const hiddenColumns = StaticColumns(() => setShowHiddenColumns(pre => !pre), showHiddenColumns).filter(staticColumn => !hiddenKeys.includes(staticColumn.key as string))
  const newColumns = showHiddenColumns ? StaticColumns(() => setShowHiddenColumns(pre => !pre), showHiddenColumns) : hiddenColumns
  const columns = [...newColumns, ...dynamicColumns];
  // Tạo sub header cho từng hệ thống / HKD
  // const CustomRow = ({ children, className }: { children: React.ReactNode,  className: string }) => {
  //   return (
  //     <>
  //       <tr>
  //         <td colSpan={[...StaticColumns(() => setShowHiddenColumns(pre => !pre), showHiddenColumns)].length} className={`py-2 uppercase text-center !bg-[#0071ba] ant-table-cell ant-table-cell-fix-left sticky left-0 font-bold text-white`}>
  //           {className.split(" ").slice(2, className.length).join(" ")}
  //         </td>
  //       </tr>
  //       <tr className="border-top-row">{children}</tr>
  //     </>
  //   );
  // };
  return (
    <>
      <div className="relative">
        {/* <div className="py-2 flex justify-start">
          <span className="px-6 py-2 rounded-full bg-[#eb9d4d] text-white">TKQC Thường</span>
        </div> */}
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: 'red',
              borderRadius: 8,
              colorBorder: "#eb9d4d",
            },
            components: {
              Table: {
                borderColor: "black",
                headerBg: "#ebd1b2"
              }
            }
          }}
          renderEmpty={() => <Empty description="Không có dữ liệu" />}
        >
          <Table
            columns={columns}
            dataSource={data}
            rowKey={(record) => record.system_id}
            rowClassName={(_, index) => index % 2 === 0 ? '[&>*]:!bg-[#e9e9e9] no-padding' : '[&>*]:!bg-white no-padding'}
            pagination={false}
            bordered
            scroll={{ x: columns.length * 100, y: 240 }}
            rowHoverable={false}
            className='not-fixed'
            loading={loadingTable}
          // components={{
          //   body: {
          //     row: (({ children, className }: { children: React.ReactNode, className: string})=> <CustomRow children={children} className={className} />),
          //   },
          // }}
          />
        </ConfigProvider>
      </div>
      {openInvoiceDetails && <BillDetails open={openInvoiceDetails} onClose={() => setOpenInvoiceDetails(false)} dataDetails={dataDetails} />}
    </>
  )
}

export default AdAccountTable;