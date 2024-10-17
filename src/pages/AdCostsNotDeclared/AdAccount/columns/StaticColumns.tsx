import { TableColumnsType } from "antd";
import { AdAccountData, UserData } from "../../../../dto/AdsBillingsDTO";
import { formatCurrency } from "../../../../utils/currency";
import ArrowRight from "../../../../assets/icons/ArrowRight";
import ArrowLeft from "../../../../assets/icons/ArrowLeft";

export const StaticColumns = (onExpandColumns: () => void, expandColumns: boolean): TableColumnsType<UserData> => {
  return [
    {
      title: 'Loại TK',
      dataIndex: 'ad_account_datas',
      width: 150,
      key: '1',
      fixed: 'left',
      render(value: AdAccountData[]) {
        return (
          <table className="h-full flex">
            <tbody className="w-full h-full flex flex-col justify-center items-center">
              {value.flatMap((innerData, index) => (
                index % 2 === 0 ? (
                  <tr key={innerData.ad_account.account_id} className="min-h-[60px] max-h-[78px] !h-full w-full flex justify-center items-center border-b border-black">
                    <td>{innerData.ad_account.type}</td>
                  </tr>
                ) : (
                  <tr key={innerData.ad_account.account_id} className="min-h-[60px] max-h-[78px] !h-full w-full flex justify-center items-center border-b border-black !bg-[#e9e9e9]">
                    <td>{innerData.ad_account.type}</td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        )
      }
    },
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
      title: 'Kênh chạy',
      dataIndex: 'ad_account_datas',
      width: 100,
      key: '3',
      fixed: 'left',
      render(value: AdAccountData[]) {
        return (
          <table className="h-full flex">
            <tbody className="w-full h-full flex flex-col justify-center items-center">
              {value.flatMap((innerData, index) => (
                index % 2 === 0 ? (
                  <tr key={innerData.ad_account.account_id} className="min-h-[60px] max-h-[78px] !h-full w-full flex justify-center items-center border-b border-black">
                    <td>{innerData.ad_account.channel}</td>
                  </tr>
                ) : (
                  <tr key={innerData.ad_account.account_id} className="min-h-[60px] max-h-[78px] !h-full w-full flex justify-center items-center border-b border-black !bg-[#e9e9e9]">
                    <td>{innerData.ad_account.channel}</td>
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
      title: (<div className="flex"><p className="mr-2 flex items-center">Múi giờ</p><div className="cursor-pointer flex justify-center items-center" onClick={onExpandColumns}>{expandColumns ? <ArrowLeft color="#e9e9e9" width={32} height={32} /> : <ArrowRight width={32} height={32} color="#e9e9e9" />}</div></div>),
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
      title: 'Bank LK TKQC',
      dataIndex: 'ad_account_datas',
      width: 150,
      key: '7',
      fixed: 'left',
      render(value: AdAccountData[]) {
        return (
          <table className="h-full flex">
            <tbody className="w-full h-full flex flex-col justify-center items-center">
              {value.flatMap((innerData, index) => (
                index % 2 === 0 ? (
                  <tr key={innerData.ad_account.account_id} className="min-h-[60px] max-h-[78px] !h-full w-full flex justify-center items-center  border-b border-[black]">
                    <td>
                      <p>{innerData.ad_account.bank_account?.bank_name || 'Không có ngân hàng liên kết'}</p>
                      <p>{(innerData.ad_account.bank_account?.card_number)}</p>
                    </td>
                  </tr>
                ) : (
                  <tr key={innerData.ad_account.account_id} className="min-h-[60px] max-h-[78px] !h-full w-full flex justify-center items-center border-b border-black !bg-[#e9e9e9]">
                    <td>
                      <p>{innerData.ad_account.bank_account?.bank_name || 'Không có ngân hàng liên kết'}</p>
                      <p>{innerData.ad_account.bank_account?.card_number}</p>
                    </td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        )
      }
    },
    {
      title: 'Phí thuê',
      dataIndex: 'ad_account_datas',
      width: 100,
      key: '8',
      fixed: 'left',
      render(value: AdAccountData[]) {
        return (
          <table className="h-full flex">
            <tbody className="w-full h-full flex flex-col justify-center items-center">
              {value.flatMap((innerData, index) => (
                index % 2 === 0 ? (
                  <tr key={innerData.ad_account.account_id} className="min-h-[60px] max-h-[78px] !h-full w-full flex justify-center items-center border-b border-black">
                    <td>{innerData.ad_account.rental_fee} %</td>
                  </tr>
                ) : (
                  <tr key={innerData.ad_account.account_id} className="min-h-[60px] max-h-[78px] !h-full w-full flex justify-center items-center border-b border-black !bg-[#e9e9e9]">
                    <td>{innerData.ad_account.rental_fee} %</td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        )
      }
    },
    {
      title: 'Tỷ giá TKQC thuê',
      dataIndex: 'ad_account_datas',
      width: 100,
      key: '9',
      fixed: 'left',
      render(value: AdAccountData[]) {
        return (
          <table className="h-full flex">
            <tbody className="w-full h-full flex flex-col justify-center items-center">
              {value.flatMap((innerData, index) => (
                index % 2 === 0 ? (
                  <tr key={innerData.ad_account.account_id} className="min-h-[60px] max-h-[78px] !h-full w-full flex justify-center items-center border-b border-black">
                    <td>{formatCurrency(innerData.ad_account.exchange_rate, 0)}</td>
                  </tr>
                ) : (
                  <tr key={innerData.ad_account.account_id} className="min-h-[60px] max-h-[78px] !h-full w-full flex justify-center items-center border-b border-black !bg-[#e9e9e9]">
                    <td>{formatCurrency(innerData.ad_account.exchange_rate, 0)}</td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        )
      }
    },
    {
      title: 'Trạng thái TKQC',
      dataIndex: 'ad_account_datas',
      width: 100,
      key: '10',
      fixed: 'left',
      render(value: AdAccountData[]) {
        return (
          <table className="h-full flex">
            <tbody className="w-full h-full flex flex-col justify-center items-center">
              {value.flatMap((innerData, index) => (
                index % 2 === 0 ? (
                  <tr key={innerData.ad_account.account_id} className="min-h-[60px] max-h-[78px] !h-full w-full flex justify-center items-center border-b border-black">
                    <td>{innerData.ad_account.status}</td>
                  </tr>
                ) : (
                  <tr key={innerData.ad_account.account_id} className="min-h-[60px] max-h-[78px] !h-full w-full flex justify-center items-center border-b border-black !bg-[#e9e9e9]">
                    <td>{innerData.ad_account.status}</td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        )
      }
    },
    {
      title: 'Số liệu',
      width: 100,
      dataIndex: 'ad_account_datas',
      key: '11',
      fixed: 'left',
      render: (value: AdAccountData[]) => {
        return value.flatMap((innerData) => (
          <div className="border-t-[1px] border-black first:border-t-0" key={innerData.ad_account.id}>
            <div className="row-custom bg-[#e9e9e9]">TKQC</div>
            <div className="row-custom">VNĐ</div>
          </div>
        ))
      },
    },
    {
      title: 'Tổng CPQC',
      dataIndex: 'ad_account_datas',
      width: 200,
      key: '12',
      render(value: AdAccountData[]) {
        return value.flatMap((innerData) => (
          <div className="border-t-[1px] border-black first:border-t-0" key={innerData.ad_account.id}>
            <div className="row-custom bg-[#e9e9e9]">{formatCurrency(innerData.total_ads)}</div>
            <div className="row-custom">{formatCurrency(innerData.total_ads_vnd)}</div>
          </div>
        ))
      },
    },
    {
      title: 'Tổng hóa đơn',
      dataIndex: 'ad_account_datas',
      width: 200,
      key: '13',
      render(value: AdAccountData[]){
        return value.flatMap((innerData) => (
          <div className="border-t-[1px] border-black first:border-t-0" key={innerData.ad_account.id}>
            <div className="row-custom bg-[#e9e9e9]">{formatCurrency(innerData.total_bill)}</div>
            <div className="row-custom">{formatCurrency(innerData.total_bill_vnd)}</div>
          </div>
        ))
      },
    }
  ]
}
