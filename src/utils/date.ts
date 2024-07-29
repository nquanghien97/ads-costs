export const formatDate = (date: Date) => {
  const padZero = (num: number) => num < 10 ? `0${num}` : num;

  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1);
  const day = padZero(date.getDate());
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  const seconds = padZero(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const convertToDate = (date: string) => {
  const [day, month] = date.split('/').map(Number);
  const year = new Date().getFullYear(); // Sử dụng năm hiện tại hoặc thay thế bằng năm cụ thể nếu cần
  return new Date(year, month - 1, day); // Tháng bắt đầu từ 0 (tức là tháng 1 là 0, tháng 2 là 1, ...)
};