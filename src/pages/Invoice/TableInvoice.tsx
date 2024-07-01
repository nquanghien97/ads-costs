import type { ColumnsType } from 'rc-table';
import Table from 'rc-table';

interface RecordType {
  a?: string;
  b?: string;
  c?: string;
  d?: string;
  e?: string;
  key?: string;
}

const columns: ColumnsType<RecordType> = [
  {
    title: 'Số điện thoại',
    dataIndex: 'a',
    colSpan: 2,
    width: 100,
    key: 'a',
    render(o, row, index) {
      return index === 0 ? <a href="#">{o}</a> : o;
    },
    onCell: (_, index) => {
      const props: React.TdHTMLAttributes<HTMLTableCellElement> = {};

      // Hợp nhất hai cột ở hàng thứ 5
      if (index === 4) {
        props.colSpan = 2;
      }

      if (index === 5) {
        props.colSpan = 6;
      }

      return props;
    },
  },
  {
    title: 'Điện thoại',
    dataIndex: 'b',
    colSpan: 0,
    width: 100,
    key: 'b',
    onCell(_, index) {
      // Các bảng đã hợp nhất cột sẽ đặt colSpan=0, không được render
      if (index === 4 || index === 5) {
        return { colSpan: 0 };
      }
      return {};
    },
  },
  {
    title: 'Tên',
    dataIndex: 'c',
    width: 100,
    key: 'c',
    onCell(_, index) {
      if (index === 5) {
        return { colSpan: 0 };
      }
      return {};
    },
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'd',
    width: 200,
    key: 'd',
    onCell(_, index) {
      const props: React.TdHTMLAttributes<HTMLTableCellElement> = {};
      if (index === 0) {
        props.rowSpan = 2;
      }
      if (index === 1 || index === 5) {
        props.rowSpan = 0;
      }

      if (index === 5) {
        props.colSpan = 0;
      }
      return props;
    },
  },
  {
    title: 'Giới tính',
    dataIndex: 'e',
    width: 200,
    key: 'e',
    onCell(_, index) {
      if (index === 5) {
        return { colSpan: 0 };
      }
      return {};
    },
  },
  {
    title: 'Thao tác',
    key: 'f',
    render() {
      return <a href="#">Thao tác</a>;
    },
    onCell(_, index) {
      if (index === 5) {
        return {
          colSpan: 0,
        };
      }
      return {};
    },
  },
];

const data: RecordType[] = [
  { a: '13812340987', b: '0571-12345678', c: 'Trương Tam', d: 'Đường Văn Nhất Tây', e: 'Nam', key: '1' },
  { a: '13812340986', b: '0571-98787658', c: 'Vợ Trương', d: 'Đường Văn Nhất Tây', e: 'Nữ', key: '2' },
  { a: '13812988888', b: '0571-099877', c: 'Lý Tứ', d: 'Đường Văn Nhị Tây', e: 'Nam', key: '3' },
  { a: '1381200008888', b: '0571-099877', c: 'Vương Ngũ', d: 'Đường Văn Nhị Tây', e: 'Nam', key: '4' },
  { a: '0571-88888110', c: 'Cảnh sát Lý', d: 'Cửa Vũ Lâm', e: 'Nam', key: '5' },
  { a: 'Hoàn tất thống kê dữ liệu vào ngày xxxx tháng xxx năm xxx', key: '6' },
];

const TableInvoice = () => (
  <div>
    <Table columns={columns} data={data} className="bordered" />
  </div>
);

export default TableInvoice;