import FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { AdsAccountType } from "../../entities/AdsAccount";
import { formatDate } from "../../utils/date";

interface ExportExcelAdsAccountProps {
  apiData: AdsAccountType[];
}

export const ExportExcelAdsAccount = ({ apiData }: ExportExcelAdsAccountProps) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const dataExportExcel = apiData.map(x => ({
    "Thời gian": formatDate(new Date(x.created_at)),
    "Hệ thống": x.system?.name || "Không có hệ thống",
    "Hộ kinh doanh": x.group?.name || "Không có HKD",
    "Mã MKT": x.user.username,
    "Họ tên": x.user.name,
    "Mã TKQC": x.id,
    "ID TKQC": x.account_id,
    "Tên TKQC": x.account_name,
    "Kênh chạy": x.channel,
    "Loại TKQC": x.type,
    "Tiền tệ": x.currency,
    "Múi giờ": x.timezone,
    "Tỷ giá TKQC": x.exchange_rate,
    "Phí thuê": x.rental_fee,
    "Tên ngân hàng": x.bank_account?.bank_name || "Chưa liên kết ngân hàng",
    "Số TKNH": x.bank_account?.card_number || "Chưa có STK",
    "Trạng thái": x.status
  }))


  const exportToCSV = (apiData: typeof dataExportExcel) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, "Danh sách tài khoản quảng cáo" + fileExtension);
  };

  return (
    <span onClick={() => exportToCSV(dataExportExcel)}>Export</span>
  );
};