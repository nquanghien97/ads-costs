// import { Select } from 'antd';
import { TableColumnsType } from 'antd';
import { UserData, TotalDailyData } from '../../../../dto/AdsBillingsDTO';
import EyeIcon from '../../../../assets/icons/EyeIcon';
import { formatCurrency } from '../../../../utils/currency';
import { useMemo } from 'react';
import React from 'react';
interface GenerateDynamicColumnsProps {
  setDataDetails: React.Dispatch<React.SetStateAction<{
    ad_account_id: number;
    date: string;
    currency: string;
  }>>;
  datas: TotalDailyData;
  setOpenAdCostsDetails: React.Dispatch<React.SetStateAction<boolean>>
  setLoadingTable: React.Dispatch<React.SetStateAction<boolean>>
  showAdCosts: boolean
  showBillCosts: boolean
}

export const GenerateDynamicColumns = (props: GenerateDynamicColumnsProps): TableColumnsType<UserData> => {
  const { setDataDetails, datas, setOpenAdCostsDetails, showAdCosts, showBillCosts } = props;

  const dates = Object.keys(datas);
  return useMemo(() => dates.flatMap((date, index) => ({
    title: date,
    children: [
      showBillCosts && {
        title: `Tổng hóa đơn`,
        key: `bill_${index}`,
        width: 140,
        className: "dynamic-col",
        render: (_: unknown, record: UserData) => {
          return record.ad_account_datas.flatMap(data => (
            <div key={data.ad_account.id} className="border-t-[1px]">
              <div className="row-custom flex items-center gap-2 bg-[#e9e9e9]">
                {formatCurrency(data.datas?.[date]?.bill)}
                <div
                  onClick={() => {
                    setOpenAdCostsDetails(true);
                    setDataDetails({
                      ad_account_id: data.ad_account_id,
                      date: date,
                      currency: data.ad_account.currency
                    });
                  }}
                  className="cursor-pointer"
                >
                  <EyeIcon width={18} height={18} />
                </div>
              </div>
              <div className="row-custom flex items-center justify-between gap-2 ">
                {formatCurrency(data.datas?.[date]?.bill_vnd)}
              </div>
            </div>
          ));
        },
      },
      showAdCosts && {
        title: `Tổng CPQC`,
        key: `ads_${index}`,
        width: 120,
        className: "dynamic-col",
        render: (_: unknown, record: UserData) => {
          return record.ad_account_datas.flatMap(data => (
            <div key={data.ad_account.id} className="border-b-[1px] border-black">
              <div className="row-custom bg-[#e9e9e9]">{formatCurrency(data.datas?.[date]?.ads) || 0}</div>
              <div className="row-custom">{formatCurrency(data.datas?.[date]?.ads_vnd) || 0}</div>
            </div>
          ));
        },
      },
    ].filter(Boolean),
  })), [dates, showBillCosts, showAdCosts, setOpenAdCostsDetails, setDataDetails]);
};

