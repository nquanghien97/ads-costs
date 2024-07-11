import { ConfigProvider, Table } from 'antd';
import { BankBillings, TotalDailyData } from "../../../dto/BankBillingsDTO";
import { generateDynamicColumns, staticColumns } from './columns';
import React from 'react';

interface TableBankTransactionProps {
  setOpenBankBillingDetails: React.Dispatch<React.SetStateAction<boolean>>;
  datas: BankBillings[];
}

function TableBankTransaction(props: TableBankTransactionProps) {
  const { setOpenBankBillingDetails, datas } = props;

  // Chuẩn bị dữ liệu cho các cột động
  const data = datas.flatMap(x => x.list);

  const dataForDynamicColumns = datas.flatMap(x => 
    x.list
    .flatMap(y => 
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
  const dynamicColumns = generateDynamicColumns(dataForDynamicColumns.reduce((acc: TotalDailyData, cur) => {
    acc[cur.date] = cur;
    return acc;
  }, {}), setOpenBankBillingDetails);

  // Tạo sub header cho từng hệ thống / HKD
  const CustomRow = ({ children, className }: { children: React.ReactNode,  className: string }) => {
    return (
      <>
        <tr>
          <td colSpan={[...staticColumns].length} className={`py-2 uppercase text-center !bg-[#73b67b] ant-table-cell ant-table-cell-fix-left sticky left-0`}>
            {className.split(" ").slice(2, className.length).join(" ")}
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
                  headerBg: "#d19b5c"
                }
              }
            }}
          >
            <Table
              columns={[...staticColumns, ...dynamicColumns]}
              dataSource={data}
              pagination={false}
              rowKey={(record) => record.system_id.toString()}
              bordered
              scroll={{ x: 2000, y: 240 }}
              rowHoverable={false}
              rowClassName={(record) => `${record.system.name}`}
              components={{
                body: {
                  row: (({ children, className }: { children: React.ReactNode, className: string})=> <CustomRow children={children} className={className} />),
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
