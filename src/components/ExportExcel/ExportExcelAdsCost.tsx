import * as XLSX from 'xlsx';
import { SystemData } from '../../dto/AdsBillingsDTO';
import FileSaver from 'file-saver';

export const exportToExcel = (data: SystemData[] | undefined) => {

  if (!data) return "Chưa có dữ liệu"
  // Chuyển đổi dữ liệu
  const transformedData = [];
  
  // Tạo header
  const header = [
    "Mã TKQC", "Hệ thống", "Hộ kinh doanh", "Họ tên", "Kênh chạy", "ID TKQC", "Tiền tệ", "Múi giờ", "Loại TKQC",
    "Bank liên kết TKQC", "Tỷ giá", "Phí thuê", "Trạng thái TKQC", "Tổng CPQC (TKQC)", "Tổng CPQC (VNĐ)",
    "Tổng hóa đơn (TKQC)", "Tổng hóa đơn (VNĐ)"
  ];
  
  // Tìm tất cả các ngày duy nhất
  const allDates = new Set<string>();
  Object.values(data).forEach(system => {
    system.group_datas.forEach(group => {
      group.user_datas.forEach(user => {
        user.ad_account_datas.forEach(account => {
          Object.keys(account.datas).forEach(date => {
            allDates.add(date);
          });
        });
      });
    });
  });
  
  // Thêm các cột ngày vào header
  allDates.forEach(date => {
    header.push(`${date} - Tổng CPQC (TKQC)`, `${date} - Tổng CPQC (VNĐ)`, `${date} - Tổng hóa đơn (TKQC)`, `${date} - Tổng hóa đơn (VNĐ)`, `${date} - Xác nhận số liệu`);
  });
  
  transformedData.push(header);
  
  // Điền dữ liệu
  Object.values(data).forEach(system => {
    system.group_datas.forEach(group => {
      group.user_datas.forEach(user => {
        user.ad_account_datas.forEach(account => {
          const row = [
            `TK${account.ad_account_id}`,
            account.ad_account.system.name,
            account.ad_account.group.name,
            user.name,
            account.ad_account.channel,
            account.ad_account.account_id,
            account.ad_account.currency,
            account.ad_account.timezone,
            account.ad_account.type,
            account.ad_account.bank_account?.bank_name || '',
            account.ad_account.exchange_rate || 0,
            account.ad_account.rental_fee || 0,
            account.ad_account.status,
            account.total_ads,
            account.total_ads_vnd,
            account.total_bill,
            account.total_bill_vnd
          ];
          
          allDates.forEach((date) => {
            const dateData = account.datas[date] || {};
            row.push(dateData.ads || '', dateData.ads_vnd || '', dateData.bill || '', dateData.bill_vnd || '', dateData.status || '');
          });
          
          transformedData.push(row);
        });
      });
    });
  });

  // Tạo workbook và worksheet
  const ws = XLSX.utils.aoa_to_sheet(transformedData);
  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };

  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

  // Xuất file
  // Xuất file
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  const dataExport = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(dataExport, 'CPQC - Hóa đơn' + fileExtension);
};
