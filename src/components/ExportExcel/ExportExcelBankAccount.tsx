import FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { BankAccountType } from "../../entities/BankAccount";

interface ExportExcelBankAccountProps {
  apiData:  BankAccountType[];
}

export const ExportExcelBankAccount = ({ apiData }: ExportExcelBankAccountProps) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const dataExportExcel = apiData.map(item => ({
    "ID TKNH": item.id,
    "Hệ thống": item.system?.name || "Không có hệ thống",
    "Hộ kinh doanh": item.group?.name || "Không có HKD",
    "Mã MKT": item.user.username,
    "Họ tên": item.name,
    "Số TKNH": item.card_number,
    "Ngân hàng": item.bank_name,
    "Trạng thái sử dụng": item.status,
  }))

  const exportToCSV = (apiData: typeof dataExportExcel) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, "Danh sách tài khoản ngân hàng" + fileExtension);
  };

  return (
    <span onClick={() => exportToCSV(dataExportExcel)}>Export</span>
  );
};