import { ConfigProvider, Table } from 'antd';
import { BankBillingsDTO } from "../../../dto/BankBillingsDTO";
import { generateDynamicColumns, staticColumns } from './columns';

interface TableBankTransactionProps {
  setOpenBankBillingDetails: React.Dispatch<React.SetStateAction<boolean>>
  datas: BankBillingsDTO
}

function TableBankTransaction(props: TableBankTransactionProps) {

  const { setOpenBankBillingDetails, datas } = props
  const allDatas = datas.group_datas.flatMap(item =>
      item.bank_account_datas.flatMap(account => account.datas)
  );
  const dynamicColumns = generateDynamicColumns(allDatas, setOpenBankBillingDetails);

  const allBankAccountDatas = datas.group_datas.flatMap(item =>
    item.bank_account_datas
  );

  return (
    <div className="my-8">
      <div className="m-auto w-full my-4">
        <div className="px-6 py-2 rounded-full bg-[#eb9d4d] uppercase w-[60%]">{datas.system.name}</div>
      </div>
      <div className="flex gap-2">
        <div className="flex-[0_0_60%] w-full">
          <div className="px-6 py-2 my-2 rounded-full h-10 text-white top-0 z-50 flex"></div>
          <ConfigProvider
            theme={{
              token: {
                // Seed Token
                colorPrimary: 'red',
                borderRadius: 8,
                colorBorder: "#eb9d4d",
                // Alias Token
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
              rowKey={(record) => record.bank_account_id}
              bordered
              scroll={{ x: 2000, y: 240 }}
              rowHoverable={false}
            />
          </ConfigProvider>
        </div>
      </div>
    </div>
  )
}

export default TableBankTransaction;
