import { ConfigProvider, Table } from "antd"
import { columns } from "./columns"
import { GroupData } from "./type";
import { useEffect, useState } from "react";
import { getAdsCostsBySystem } from "../../../../services/ads_costs";
import { SearchForm } from "../..";
import LoadingIcon from "../../../../assets/icons/LoadingIcon";

interface TableReportSystemProps {
  dataGroup: GroupData[];
  setDataGroup: React.Dispatch<React.SetStateAction<GroupData[]>>
  searchForm: SearchForm
}

function TableReportSystem(props: TableReportSystemProps) {

  const { dataGroup, setDataGroup, searchForm } = props;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    (async () => {
      if(!searchForm.system_id) return
      const res = await getAdsCostsBySystem({ system_id: searchForm.system_id})
      setDataGroup(res.data.data.list)
      setLoading(false)
    })()
  }, [searchForm.system_id, setDataGroup, setLoading])

  const filterData = dataGroup.filter(item => item.account_type_datas.length !== 0)

  return (
    searchForm.system_id ? (
      loading ? (
        <div className="flex justify-center"><LoadingIcon /></div>
      ) : (
        filterData.length === 0 ? (
          <div>
            <span>Không có dữ liệu</span>
          </div>
        ) : (
          <>
            <div className="px-8 py-2 my-2 bg-[#0071ba] text-white rounded-full uppercase font-bold">
              <span>{searchForm.system_name}</span>
            </div>
            <div>
              {filterData.map(item => (
                <div
                  className="flex flex-col gap-2 border-b-4 border-cyan-700 pb-6 uppercase font-bold"
                  key={item.group_id}
                >
                  <div className="px-8 py-2 bg-[#0071ba] rounded-full w-full text-white">
                    <span>{item.group_name}</span>
                  </div>
                  <div>
                <ConfigProvider
                  theme={{
                    token: {
                      // Seed Token
                      colorPrimary: 'red',
                      borderRadius: 0,
                      colorBorder: "#eb9d4d",
                      // Alias Token
                      // colorBgContainer: '#e5d1ba',
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
                    dataSource={[item]}
                    rowKey={(record) => record.group_id} 
                    pagination={false}
                    bordered
                    // scroll={{ x: 2000, y: 300 }}
                    rowHoverable={false}
                    rowClassName="no-padding"
                    className='not-fixed'
                  />
                </ConfigProvider>
              </div>
                </div>
              ))}
            </div>
          </>
        )
      )
    ) : (
      <div>Chọn Hệ thống để xem báo cáo</div>
    )
  )
}

export default TableReportSystem