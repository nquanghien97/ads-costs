import { UserRole } from "../entities/User";

const MenuSidebar = [
  {
    title: 'CPQC HÓA ĐƠN',
    path: '/cpqc-hoa-don',
    allowedRoles: [UserRole.GROUP_ADM, UserRole.ROOT, UserRole.SYSTEM_ADM, UserRole.USER]
  },
  {
    title: 'GIAO DỊCH NGÂN HÀNG',
    path: '/giao-dich-ngan-hang',
    allowedRoles: [UserRole.GROUP_ADM, UserRole.ROOT, UserRole.SYSTEM_ADM, UserRole.USER]
  },
  {
    title: 'CÀI ĐẶT THÔNG TIN',
    path: '/cai-dat-thong-tin',
    allowedRoles: [UserRole.ROOT]
  },
  {
    title: 'KHAI BÁO TKQC',
    path: '/khai-bao-tkqc',
    allowedRoles: [UserRole.GROUP_ADM, UserRole.ROOT, UserRole.SYSTEM_ADM, UserRole.USER]
  },
  {
    title: 'KHAI BÁO TK NGÂN HÀNG',
    path: '/khai-bao-tk-ngan-hang',
    allowedRoles: [UserRole.GROUP_ADM, UserRole.ROOT, UserRole.SYSTEM_ADM, UserRole.USER]
  },
  {
    title: 'QUẢN LÝ NGƯỜI DÙNG',
    path: '/quan-ly-nguoi-dung',
    allowedRoles: [UserRole.ROOT]
  },
  {
    title: 'KHAI BÁO HỆ THỐNG - HỘ KINH DOANH',
    path: '/khai-bao-he-thong',
    allowedRoles: [UserRole.ROOT]
  },
  {
    title: 'XEM BÁO CÁO',
    path: '/xem-bao-cao',
    allowedRoles: [UserRole.GROUP_ADM, UserRole.ROOT, UserRole.SYSTEM_ADM, UserRole.USER] 
  },
]

export default MenuSidebar;