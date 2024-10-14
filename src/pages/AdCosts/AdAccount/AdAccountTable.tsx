// import Table from 'rc-table';
import { Table, ConfigProvider, Empty } from 'antd';
import { SystemData, TotalDailyData } from '../../../dto/AdsBillingsDTO';
import { GenerateDynamicColumns } from './columns/GenerateDynamicColumns';
import { StaticColumns } from './columns/StaticColumns';
import { useState } from 'react';
import BillDetails from '../BillDetails';


function AdAccountTable(props: { data: SystemData[], loading: boolean, showAdCosts: boolean, showBillCosts: boolean}) {
  const { data, showAdCosts, showBillCosts } = props;
  const [loadingTable, setLoadingTable] = useState(false)
  const [openAdCostsDetails, setOpenAdCostsDetails] = useState(false);
  const [dataDetails, setDataDetails] = useState({
    ad_account_id: -1,
    date: '',
    currency: ''
  });
  const [showHiddenColumns, setShowHiddenColumns] = useState(false);

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
    setOpenAdCostsDetails,
    setLoadingTable,
    showAdCosts,
    showBillCosts
  });
  const hiddenKeys = ['7', '8', '9', '10', '12', '13']
  const hiddenColumns = StaticColumns(() => setShowHiddenColumns(pre => !pre), showHiddenColumns).filter(staticColumn => !hiddenKeys.includes(staticColumn.key as string))
  const newColumns = showHiddenColumns ? StaticColumns(() => setShowHiddenColumns(pre => !pre), showHiddenColumns) : hiddenColumns
  const columns = [...newColumns, ...dynamicColumns];
  // Tạo sub header cho từng hệ thống / HKD
  const CustomRow = ({ children, className }: { children: React.ReactNode, className: string }) => {
    return (
      <>
        <tr>
          <td colSpan={newColumns.length} className={`py-2 uppercase text-center !bg-[#68c2ed] ant-table-cell ant-table-cell-fix-left sticky left-0 font-bold text-black`}>
            {className.split(" ").slice(2, className.length).join(" ")}
          </td>
        </tr>
        <tr className="border-top-row">{children}</tr>
      </>
    );
  };
  return (
    <>
      <div className="relative mt-4">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: 'red',
              borderRadius: 8,
              colorBorder: "#eb9d4d",
            },
            components: {
              Table: {
                borderColor: "#007bb5",
                headerBg: "#f3ec90",
                headerColor: 'black',
              }
            }
          }}
          renderEmpty={() => <Empty description="Không có dữ liệu" />}
        >
          <Table
            columns={columns}
            dataSource={data}
            rowKey={(record) => record.system_id}
            rowClassName={(record) => `${record.system?.name} - ${record.group_datas.flatMap(item => item.group?.name)} - ${record.group_datas.flatMap(item => item.user_datas.flatMap(innerItem => innerItem?.name))}`}
            pagination={false}
            bordered
            scroll={{ x: columns.length * 100, y: 600 }}
            rowHoverable={false}
            className='not-fixed'
            loading={loadingTable}
            components={{
              body: {
                row: (({ children, className }: { children: React.ReactNode, className: string }) => <CustomRow children={children} className={className} />),
              },
            }}
          />
        </ConfigProvider>
      </div>
      {openAdCostsDetails && <BillDetails open={openAdCostsDetails} onClose={() => setOpenAdCostsDetails(false)} dataDetails={dataDetails} />}
    </>
  )
}

export default AdAccountTable;