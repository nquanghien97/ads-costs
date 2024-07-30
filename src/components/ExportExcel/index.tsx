import FileSaver from "file-saver";
import * as XLSX from "xlsx";

interface ExportToExcelProps<T> {
  apiData: T[];
  fileName: string;
}

export const ExportToExcel = <T,>({ apiData, fileName }: ExportToExcelProps<T>) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (apiData: T[], fileName: string) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <span onClick={() => exportToCSV(apiData, fileName)}>Export</span>
  );
};