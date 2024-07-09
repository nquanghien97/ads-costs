import { ConfigProvider, Table } from 'antd';
import { ResponseBankBillings, TotalDailyData } from "../../../dto/BankBillingsDTO";
import { generateDynamicColumns, staticColumns } from './columns';
import React from 'react';

interface TableBankTransactionProps {
  setOpenBankBillingDetails: React.Dispatch<React.SetStateAction<boolean>>;
  datas: ResponseBankBillings[];
}

function TableBankTransaction(props: TableBankTransactionProps) {
  const { setOpenBankBillingDetails, datas } = props;

  // Chuẩn bị dữ liệu cho các cột động
  const allDatas = datas.flatMap(x => 
    x.list.flatMap(y => 
      y.group_datas.flatMap(item => 
        item.bank_account_datas.flatMap(account => 
          Object.entries(account.datas).map(([date, data]) => ({
            date,
            ...data
          }))
        )
      )
    )
  );

  // Tạo cột động
  const dynamicColumns = generateDynamicColumns(allDatas.reduce((acc: TotalDailyData, cur) => {
    acc[cur.date] = cur;
    return acc;
  }, {}), setOpenBankBillingDetails);

  // Chuẩn bị dữ liệu cho bảng
  const allBankAccountDatas = datas.flatMap(x => 
    x.list.flatMap(y => 
      y.group_datas.flatMap(item => 
        item.bank_account_datas
      )
    )
  );
  console.log(datas.flatMap(x => x.list.flatMap(y => y.system.name)))

  const CustomRow = ({ children, props }: { children: React.ReactNode, props: any }) => {
    console.log(props['className'])
    return (
      <>
        <tr>
          <td colSpan={[...staticColumns].length} className={`py-2 uppercase text-center !bg-[#eb9d4d] ant-table-cell ant-table-cell-fix-left sticky left-0`}>
            {props['className'].split(" ").slice(-2).join(" ")}
          </td>
        </tr>
        <tr className="border-top-row">{children}</tr>
      </>
    );
  };

  return (
    <div className="my-8">
      <div className="flex gap-2">
        <div className="flex-[0_0_60%] w-full">
          <div className="px-6 py-2 my-2 rounded-full h-10 text-white top-0 z-50 flex"></div>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: 'red',
                borderRadius: 8,
                colorBorder: "#eb9d4d",
                colorBgContainer: '#f6ffea',
              },
              components: {
                Table: {
                  borderColor: "red",
                  headerBg: "#2b663c"
                }
              }
            }}
          >
            <Table
              columns={[...staticColumns, ...dynamicColumns]}
              dataSource={allBankAccountDatas}
              pagination={false}
              rowKey={(record) => record.bank_account_id.toString()}
              bordered
              scroll={{ x: 2000, y: 240 }}
              rowHoverable={false}
              rowClassName={(record) => `${record.bank_account.name}`}
              // rowClassName="!bg-[red]"
              components={{
                body: {
                  row: (({ children, ...props }: { children: React.ReactNode })=> <CustomRow children={children} props={props} />),
                },
              }}
            />
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
}

export default TableBankTransaction;
