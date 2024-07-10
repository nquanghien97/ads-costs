import InformationSetting from "./InformationSetting";

const fakeData = [
  {
    id: '1',
    name: 'Kênh 1'
  },
  {
    id: '2',
    name: 'Kênh 2'
  },
  {
    id: '3',
    name: 'Kênh 3'
  },
  {
    id: '4',
    name: 'Kênh 4'
  },
  {
    id: '5',
    name: 'Kênh 5'
  },
]

function InfomationSettings() {
  return (
    <div className="px-4">
      <div className="py-2 flex justify-center">
        <h2 className="px-6 py-2 rounded-full bg-[#0071BA] text-white text-2xl uppercase text-center">Cài đặt thông tin</h2>
      </div>
      <div className="flex flex-col gap-4">
        <InformationSetting data={fakeData} title="Kênh chạy" color="#29A9E0" titleColor="#0071BA" />
        <InformationSetting data={fakeData} title="Tiền tệ" color="#91deab" titleColor="#3f8e4d" />
        <InformationSetting data={fakeData} title="Múi giờ" color="#eb94b9" titleColor="#c12f5b" />
        <InformationSetting data={fakeData} title="Loại TKQC" color="#79ceba" titleColor="#469783" />
        <InformationSetting data={fakeData} title="Trạng thái TKQC" color="#f6ca99" titleColor="#e7963e" />
        <InformationSetting data={fakeData} title="Trạng thái TKQC" color="#dbcfc2" titleColor="#9e7e58" />
      </div>
    </div>
  )
}

export default InfomationSettings;