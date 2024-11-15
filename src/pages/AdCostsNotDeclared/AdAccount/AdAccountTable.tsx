import { Table, ConfigProvider, Empty } from 'antd';
import { DailyAdsBillings, UserData } from '../../../dto/AdsBillingsDTO';
import { GenerateDynamicColumns } from './columns/GenerateDynamicColumns';
import { StaticColumns } from './columns/StaticColumns';
import { useMemo, useState } from 'react';
import BillDetails from '../BillDetails';
import React from 'react';

// eslint-disable-next-line react-refresh/only-export-components
function AdAccountTable(props: { data: UserData[], loading: boolean, showAdCosts: boolean, showBillCosts: boolean }) {
  const { data, showAdCosts, showBillCosts } = props;
  const [loadingTable, setLoadingTable] = useState(false);
  const [openAdCostsDetails, setOpenAdCostsDetails] = useState(false);
  const [dataDetails, setDataDetails] = useState({
    ad_account_id: -1,
    date: '',
    currency: ''
  });

  // Calculate ad_account_datas only once
  const a = useMemo(() => data?.flatMap(d => d.ad_account_datas) ?? [], [data]);

  // Prepare dynamic columns data
  const dataForDynamicColumns = useMemo(() =>
    a.flatMap(x => Object.entries(x.datas).map(([date, data]) => ({
      date,
      ...data
    })))
    , [a]);

  // Create Map for dynamic columns
  const datasMap = useMemo(() => {
    const map: Map<string, DailyAdsBillings> = new Map();
    for (const { date, ...cur } of dataForDynamicColumns) {
      map.set(date, cur);
    }
    return map;
  }, [dataForDynamicColumns]);
  
  const sortedData = new Map(
    Array.from(datasMap.entries()).sort((a, b) => {
      const [dayA, monthA] = a[0].split("/").map(Number);
      const [dayB, monthB] = b[0].split("/").map(Number);
      const dateA = new Date(2000, monthA - 1, dayA).getTime();
      const dateB = new Date(2000, monthB - 1, dayB).getTime();
      return dateA - dateB;
    })
  );
  const dynamicColumns = GenerateDynamicColumns({
    datas: Object.fromEntries(sortedData),
    setDataDetails,
    setOpenAdCostsDetails,
    setLoadingTable,
    showAdCosts,
    showBillCosts
  });



  const staticColumns = StaticColumns();

  const columns = [...staticColumns, ...dynamicColumns];

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
            rowKey={(record) =>
              record?.ad_account_datas?.map(item => item.ad_account_id)?.join('-') || 'unknown'
            }
            rowClassName={(record) =>
              `${record.system?.name || ''} - ${record.group?.name || ''} - ${record.name || ''} - ${record.username || ''}`
            }
            pagination={false}
            bordered
            scroll={{ x: columns.length * 100, y: 600 }}
            rowHoverable={false}
            className='not-fixed'
            rootClassName='ant-table-cell ant-table-cell-fix-left'
            loading={loadingTable}
          />
        </ConfigProvider>
      </div>
      {openAdCostsDetails && <BillDetails open={openAdCostsDetails} onClose={() => setOpenAdCostsDetails(false)} dataDetails={dataDetails} />}
    </>
  );
}

const memoizationAdAccount = React.memo(AdAccountTable);
export default memoizationAdAccount;