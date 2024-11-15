import { TableColumnsType } from "antd";
import { AdAccountData, UserData } from "../../../../dto/AdsBillingsDTO";
import { formatCurrency } from "../../../../utils/currency";

export const StaticColumns = (): TableColumnsType<UserData> => {
  return [
    {
      title: 'Mã TKQC',
      dataIndex: 'ad_account_datas',
      key: '2',
      width: 100,
      fixed: 'left',
      render(value: AdAccountData[]) {
        return (
          <table className="h-full flex">
            <tbody className="w-full h-full flex flex-col justify-center items-center">
              {value.flatMap((innerData, index) => (
                index % 2 === 0 ? (
                  <tr key={innerData.ad_account.account_id} className="min-h-[60px] max-h-[78px] !h-full w-full flex justify-center items-center border-b border-black">
                    <td>TK {innerData.ad_account.id}</td>
                  </tr>
                ) : (
                  <tr key={innerData.ad_account.account_id} className="min-h-[60px] max-h-[78px] !h-full w-full flex justify-center items-center border-b border-black !bg-[#e9e9e9]">
                    <td>TK {innerData.ad_account.id}</td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        )
      }
    },
    {
      title: 'ID TKQC',
      dataIndex: 'ad_account_datas',
      key: '4',
      width: 150,
      fixed: 'left',
      render(value: AdAccountData[]) {
        return (
          <table className="h-full flex">
            <tbody className="w-full h-full flex flex-col justify-center items-center">
              {value.flatMap((innerData, index) => (
                index % 2 === 0 ? (
                  <tr key={innerData.ad_account.account_id} className="min-h-[60px] max-h-[78px] !h-full w-full flex justify-center items-center border-b border-black">
                    <td>{innerData.ad_account.account_id}</td>
                  </tr>
                ) : (
                  <tr key={innerData.ad_account.account_id} className="min-h-[60px] max-h-[78px] !h-full w-full flex justify-center items-center border-b border-black !bg-[#e9e9e9]">
                    <td>{innerData.ad_account.account_id}</td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        )
      }
    },
    {
      title: 'Tiền tệ',
      dataIndex: 'ad_account_datas',
      key: '5',
      width: 80,
      fixed: 'left',
      render(value: AdAccountData[]) {
        return (
          <table className="h-full flex">
            <tbody className="w-full h-full flex flex-col justify-center items-center">
              {value.flatMap((innerData, index) => (
                index % 2 === 0 ? (
                  <tr key={innerData.ad_account.account_id} className="min-h-[60px] max-h-[78px] !h-full w-full flex justify-center items-center border-b border-black">
                    <td>{innerData.ad_account.currency}</td>
                  </tr>
                ) : (
                  <tr key={innerData.ad_account.account_id} className="min-h-[60px] max-h-[78px] !h-full w-full flex justify-center items-center border-b border-black !bg-[#e9e9e9]">
                    <td>{innerData.ad_account.currency}</td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        )
      },
    },
    {
      title: 'Múi giờ',
      dataIndex: 'ad_account_datas',
      key: '6',
      width: 100,
      fixed: 'left',
      render(value: AdAccountData[]) {
        return (
          <table className="h-full flex">
            <tbody className="w-full h-full flex flex-col justify-center items-center">
              {value.flatMap((innerData, index) => (
                index % 2 === 0 ? (
                  <tr key={innerData.ad_account.account_id} className="min-h-[60px] max-h-[78px] !h-full w-full flex justify-center items-center border-b border-black">
                    <td>{innerData.ad_account.timezone}</td>
                  </tr>
                ) : (
                  <tr key={innerData.ad_account.account_id} className="min-h-[60px] max-h-[78px] !h-full w-full flex justify-center items-center border-b border-black !bg-[#e9e9e9]">
                    <td>{innerData.ad_account.timezone}</td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        )
      },
    },
    {
      title: 'Số liệu',
      width: 100,
      dataIndex: 'ad_account_datas',
      key: '11',
      fixed: 'left',
      render: (value: AdAccountData[]) => (
        // <div className="border-t-[1px] border-black first:border-t-0" key={innerData.ad_account.id}>
        //   {/* <div className="row-custom bg-[#e9e9e9]">TKQC</div>
        //   <div className="row-custom">VNĐ</div> */}
        //   TKQC
        // </div>
        <table className="h-full flex">
          <tbody className="w-full h-full flex flex-col justify-center items-center">
            {value.flatMap((innerData, index) => (
              index % 2 === 0 ? (
                <tr key={innerData.ad_account.account_id} className="min-h-[60px] max-h-[78px] !h-full w-full flex justify-center items-center border-b border-black">
                  <td>TKQC</td>
                </tr>
              ) : (
                <tr key={innerData.ad_account.account_id} className="min-h-[60px] max-h-[78px] !h-full w-full flex justify-center items-center border-b border-black !bg-[#e9e9e9]">
                  <td>TKQC</td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      ),
    },
    {
      title: 'Tổng CPQC',
      dataIndex: 'ad_account_datas',
      width: 200,
      key: '12',
      render: (value: AdAccountData[]) => (
        // <div className="border-t-[1px] border-black first:border-t-0" key={innerData.ad_account.id}>
        //   {/* <div className="row-custom bg-[#e9e9e9]"></div>
        //   <div className="row-custom">{formatCurrency(innerData.total_ads_vnd)}</div> */}
        //   {formatCurrency(innerData.total_ads)}
        // </div>
        <table className="h-full flex">
          <tbody className="w-full h-full flex flex-col justify-center items-center">
            {value.flatMap((innerData, index) => (
              index % 2 === 0 ? (
                <tr key={innerData.ad_account.account_id} className="min-h-[60px] max-h-[78px] !h-full w-full flex justify-center items-center border-b border-black">
                  <td>{formatCurrency(innerData.total_ads)}</td>
                </tr>
              ) : (
                <tr key={innerData.ad_account.account_id} className="min-h-[60px] max-h-[78px] !h-full w-full flex justify-center items-center border-b border-black !bg-[#e9e9e9]">
                  <td>{formatCurrency(innerData.total_ads)}</td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      ),
    },
  {
    title: 'Tổng hóa đơn',
    dataIndex: 'ad_account_datas',
    width: 200,
    key: '13',
    render: (value: AdAccountData[]) => (
      <table className="h-full flex">
        <tbody className="w-full h-full flex flex-col justify-center items-center">
          {value.flatMap((innerData, index) => (
            index % 2 === 0 ? (
              <tr key={innerData.ad_account.account_id} className="min-h-[60px] max-h-[78px] !h-full w-full flex justify-center items-center border-b border-black">
                <td>{formatCurrency(innerData.total_bill)}</td>
              </tr>
            ) : (
              <tr key={innerData.ad_account.account_id} className="min-h-[60px] max-h-[78px] !h-full w-full flex justify-center items-center border-b border-black !bg-[#e9e9e9]">
                <td>{formatCurrency(innerData.total_bill)}</td>
              </tr>
            )
          ))}
        </tbody>
      </table>
    ),
    }
  ]
}
