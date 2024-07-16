import TableAdsAccount from "./TableAdsAccount"
import TableAdsChannel from "./TableAdsChannel"

function TableReportAds() {
  return (
    <div>
      <div className='flex flex-col items-center gap-4'>
        <div className="px-8 py-2 bg-[#29a9e0] rounded-full">
          <span>Hệ thống 1</span>
        </div>
        <div className="px-8 py-2 bg-[#0071ba] rounded-full w-full text-white">
          <span>Hộ kinh doanh 1</span>
        </div>
      </div>
      <TableAdsAccount />
      {/* <TableAdsChannel /> */}
    </div>
  )
}

export default TableReportAds