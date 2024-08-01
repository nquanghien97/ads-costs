import { ConfigProvider, Table } from "antd"
import { columns } from "./columns"
import { UserData } from "./type";
import { useEffect, useState } from "react";
import { getAdsCostsByGroup } from "../../../../services/ads_costs";
import { SearchForm } from "../..";
import LoadingIcon from "../../../../assets/icons/LoadingIcon";

interface TableReportGroupProps {
  searchForm: SearchForm
}

function TableReportGroup(props: TableReportGroupProps) {

  const { searchForm } = props;
  const [dataGroup, setDataGroup] = useState<UserData[]>([])
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    (async () => {
      if(!searchForm.group_id) return
      const res = await getAdsCostsByGroup({ group_id: searchForm.group_id})
      setDataGroup(res.data.data.list)
      setLoading(false)
    })()
  }, [searchForm.group_id, setDataGroup, setLoading])

  const filterData = dataGroup.filter(item => item.account_type_datas.length !== 0)
  console.log(filterData)

  return (
    loading ? (
      <div className="flex justify-center"><LoadingIcon /></div>
    ) : (
      filterData.length === 0 ? (
        <div>
          <span>Không có dữ liệu</span>
        </div>
      ) : (
        <>
          <div className="px-8 py-2 my-2 bg-[#0071ba] rounded-full uppercase font-bold text-white">
            <span>{searchForm.system_name}</span>
          </div>
          <div>
            {filterData.map(item => (
              <div
                className="flex flex-col gap-2 border-b-4 border-cyan-700 pb-6"
                key={item.user_id}
              >
                <div className="px-8 py-2 bg-[#0071ba] rounded-full w-full text-white uppercase font-bold">
                  <span>{searchForm.group_name}</span>
                </div>
                <div className="px-8 py-2 bg-[#0071ba] rounded-full w-full text-white uppercase font-bold">
                  <span>{item.name}</span>
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
                  rowKey={(record) => record.user_id} 
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
  )
}

export default TableReportGroup