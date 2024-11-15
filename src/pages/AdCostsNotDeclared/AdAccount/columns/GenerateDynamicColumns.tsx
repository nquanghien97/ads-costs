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
          return record.ad_account_datas.flatMap((data, index) => (
            <div key={data.ad_account.id} className={`min-h-[60px] max-h-[78px] border-b-[1px] border-black gap-2 flex items-center justify-center ${index % 2 === 0 ? '' : 'bg-[#e9e9e9]'}`}>
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
          ));
        },
      },
      showAdCosts && {
        title: `Tổng CPQC`,
        key: `ads_${index}`,
        width: 120,
        className: "dynamic-col",
        render: (_: unknown, record: UserData) => {
          return record.ad_account_datas.flatMap((data, index) => (
            <div key={data.ad_account.id} className={`border-b-[1px] border-black min-h-[60px] max-h-[78px] flex items-center justify-center ${index % 2 === 0 ? '' : 'bg-[#e9e9e9]'}`}>
              {formatCurrency(data.datas?.[date]?.ads) || 0}
            </div>
          ));
        },
      },
    ].filter(Boolean),
  })), [dates, showBillCosts, showAdCosts, setOpenAdCostsDetails, setDataDetails]);
};

