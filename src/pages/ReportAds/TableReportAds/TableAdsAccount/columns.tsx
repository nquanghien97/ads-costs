import { TableColumnsType } from "antd";

interface dataType {
  id: number;
  loaiTKQC: string;
  datas: {
    [key: string]: {
      tkqc: number;
      vnd: number;
    }
  }
}
export const data = [
  {
    id: 1,
    loaiTKQC: 'TKQC Thường',
    datas: {
      "tongCPQC": {
        tkqc: 10,
        vnd: 25000
      },
      "tongHoaDon": {
        tkqc: 10,
        vnd: 25000
      }
    }
  },
  {
    id: 2,
    loaiTKQC: 'TKQC Thường',
    datas: {
      "tongCPQC": {
        tkqc: 20,
        vnd: 50000
      },
      "tongHoaDon": {
        tkqc: 20,
        vnd: 50000
      }
    }
  },
  {
    id: 3,
    loaiTKQC: 'TKQC Thuê',
    datas: {
      "tongCPQC": {
        tkqc: 30,
        vnd: 75000
      },
      "tongHoaDon": {
        tkqc: 30,
        vnd: 75000
      }
    }
  },
  {
    id: 4,
    loaiTKQC: 'TKQC Thường',
    datas: {
      "tongCPQC": {
        tkqc: 4,
        vnd: 100000
      },
      "tongHoaDon": {
        tkqc: 4,
        vnd: 100000
      }
    }
  },
]

export const generateDynamicColumns = (datas: typeof data): TableColumnsType<dataType> => {
  return datas.flatMap((data, index) => ({
    title: `${data.loaiTKQC} - ${data.id}`,
    children: [
      {
        title: "Tổng CPQC",
        key: 1,
        children: [
          {
            title: `Theo TKQC`,
            key: `ads_${index}`,
            width: 120,
            render: () => {
              return (
                <div key={data.id}>
                  {data.datas.tongCPQC.tkqc}
                </div>
              )
            },
          },
          {
            title: `Theo VNĐ`,
            key: `bill_${index}`,
            width: 120,
            render: () => (
              <div key={data.id}>
                {data.datas.tongCPQC.vnd}
              </div>
            ),
          },
        ],
      },
      {
        title: "Tổng hóa đơn",
        key: 1,
        children: [
          {
            title: `Theo TKQC`,
            key: `ads_${index}`,
            width: 120,
            render: () => {
              return (
                <div key={data.id}>
                  {data.datas.tongHoaDon.tkqc}
                </div>
              )
            },
          },
          {
            title: `Theo VNĐ`,
            key: `bill_${index}`,
            width: 120,
            render: () => (
              <div key={data.id}>
                {data.datas.tongHoaDon.vnd}
              </div>
            ),
          },
        ],
      },
    ]
  }));
};
