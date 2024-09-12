import {  ConfigProvider, Table, TableColumnsType } from 'antd'

// const options = [
//   {
//     value: 'Đã duyệt',
//     label: 'Đã duyệt'
//   },
//   {
//     value: 'Chờ duyệt',
//     label: 'Chờ duyệt'
//   },
//   {
//     value: 'Từ chối',
//     label: 'Từ chối'
//   }
// ]

function TableContent() {
  // const [loading, setLoading] = useState(false);

  const columns: TableColumnsType = [
    {
      title: 'Hệ thống',
      dataIndex: ['username'],
      width: 80,
      key: '1',
    },
    {
      title: 'HKD',
      width: 160,
      dataIndex: ['name'],
      key: '2',
    },
    {
      title: 'Mã MKT',
      dataIndex: ['system', 'name'],
      key: '3',
      width: 150
    },
    {
      width: 100,
      title: 'Họ tên',
      dataIndex: ['group', 'name'],
      key: '4',
    },
    {
      width: 100,
      title: 'ID TKQC',
      dataIndex: ['group', 'name'],
      key: '5',
    },
    {
      width: 100,
      title: 'Link bài QC',
      dataIndex: ['group', 'name'],
      key: '13',
    },
    {
      width: 100,
      title: 'Kiểm duyệt',
      dataIndex: ['group', 'name'],
      key: '14',
      // render: (_: unknown, record) => {
      //   return (
      //     <Select
      //       options={options}
      //       // onChange={(value) => onChangeStatus(value, data.datas?.[date]?.id)}
      //       size="large"
      //     // defaultValue={data.datas?.[date]?.status}
      //     // className={`w-full ${getBackgroundColor(currentStatus)}`}
      //     // placeholder={!data.datas?.[date]?.status ? 'Không có dữ liệu' : 'Lựa chọn...'}
      //     // disabled={!data.datas?.[date]?.status || ((user.role !== UserRole.ACCOUNTANT && user.role !== UserRole.ROOT && (selectedStatus[date_id] || data.datas?.[date]?.status) === "Đã XN"))}
      //     />
      //   )
      // },
    },
    {
      width: 100,
      title: 'Chi phí QC',
      dataIndex: ['group', 'name'],
      key: '9',
    },
    {
      width: 100,
      title: 'Tiền tệ',
      dataIndex: ['group', 'name'],
      key: '10',
    },
    {
      width: 100,
      title: 'Mess',
      dataIndex: ['group', 'name'],
      key: '11',
    },
    {
      width: 100,
      title: 'Bình luận',
      dataIndex: ['group', 'name'],
      key: '12',
    },
    {
      width: 100,
      title: 'Chuyển đổi',
      dataIndex: ['group', 'name'],
      key: '13',
    },
  ]

  return (
    <div className="custom-header-table">
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
      >
        <Table
          columns={columns}
          // dataSource={}
          rowHoverable={false}
          rowKey={(record) => record.id}
          rowClassName={(_, index) => index % 2 === 0 ? 'table-row-custom-color' : ''}
          bordered
          // pagination={{
          //   total: pagingUsers?.total,
          //   pageSize: pagingUsers?.page_size,
          //   onChange: onChange,
          //   showTotal: (total) => <span className="font-bold">{`Tổng:   ${total}`}</span>,
          //   showSizeChanger: true
          // }}
          // loading={loading}
          scroll={{ y: 600 }}
        />
      </ConfigProvider>
    </div>
  )
}

export default TableContent