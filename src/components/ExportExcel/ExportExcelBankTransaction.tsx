import * as XLSX from 'xlsx';
import { BankTransactionsDTO } from '../../dto/BankTransactionsDTO';
import FileSaver from 'file-saver';

export const exportExcelBankTransaction = (data: BankTransactionsDTO[] | undefined) => {

  if (!data) return "Chưa có dữ liệu"
  // Chuyển đổi dữ liệu
  const transformedData = [];
  
  // Tạo header
  const header = [
    "Mã TKQC", "Hệ thống", "Hộ kinh doanh", "Họ tên", "STK Ngân hàng", "Ngân hàng", "Tiền nhận", "TT Hóa đơn", "TT Chi phí khác",
    "Số dư hiện tại"
  ];
  
  // Tìm tất cả các ngày duy nhất
  const allDates = new Set<string>();
  Object.values(data).forEach(system => {
    system.group_datas.forEach(group => {
      group.bank_account_datas.forEach(account => {
        Object.keys(account.datas).forEach(date => {
          allDates.add(date);
        });
      });
    });
  });
  console.log(allDates)
  
  // Thêm các cột ngày vào header
  allDates.forEach(date => {
    header.push(`${date} - Tiền nhận`, `${date} - TT Hóa đơn`, `${date} - TT Chi phí khác`);
  });
  
  transformedData.push(header);
  
  // Điền dữ liệu
  Object.values(data).forEach(system => {
    system.group_datas.forEach(group => {
      group.bank_account_datas.forEach(account =>  {
        const row = [
          `TK${account.bank_account.id}`,
          system.system.name,
          group.group.name,
          account.bank_account.name,
          account.bank_account.card_number,
          account.bank_account.bank_name,
          account.total_received,
          account.total_paid_bill,
          account.total_paid_other,
          account.balance
        ];
        
        allDates.forEach((date) => {
          const dateData = account.datas[date] || {};
          row.push(dateData.received || '', dateData.paid_bill || '', dateData.paid_other || '');
        });
        
        transformedData.push(row);
       
      });
    });
  });

  // Tạo workbook và worksheet
  const ws = XLSX.utils.json_to_sheet(transformedData);
  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };

  // Thêm worksheet vào workbook
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

  // Xuất file
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  const dataExport = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(dataExport, 'Giao dịch ngân hàng' + fileExtension);
};
