import { UserRole } from "../entities/User";
import CurrencyIcon from "../assets/icons/CurrencyIcon";
import BankIcon from "../assets/icons/BankIcon";
import SettingIcon from "../assets/icons/SettingIcon";
import UserManage from "../assets/icons/UserManageIcon";
import DepartmentIcon from "../assets/icons/DepartmentIcon";
import ReportIcon from "../assets/icons/ReportIcon";
import AccountBankIcon from "../assets/icons/AccountBankIcon";
import AdsAccountIcon from "../assets/icons/AdsAccountIcon";
import AdjustIcon from "../assets/icons/AdjustIcon";

export interface MenuSidebar {
  title: string;
  path: string;
  allowedRoles: UserRole[];
  icon: JSX.Element;
  children?: MenuSidebar[];
}

const MenuSidebar: MenuSidebar[] = [
  {
    title: 'CPQC-Hóa đơn',
    path: '/cpqc-hoa-don',
    allowedRoles: [UserRole.GROUP_ADM, UserRole.ROOT, UserRole.SYSTEM_ADM, UserRole.USER, UserRole.ACCOUNTANT],
    icon: <CurrencyIcon />,
  },
  {
    title: 'Giao dịch TKNH',
    path: '/giao-dich-ngan-hang',
    allowedRoles: [UserRole.GROUP_ADM, UserRole.ROOT, UserRole.SYSTEM_ADM, UserRole.USER, UserRole.ACCOUNTANT],
    icon: <BankIcon />,
  },
  {
    title: 'Cài đặt thông tin',
    path: '/cai-dat-thong-tin',
    allowedRoles: [UserRole.ROOT],
    icon: <SettingIcon />,
  },
  {
    title: 'Khai báo TKQC',
    path: '#',
    allowedRoles: [UserRole.GROUP_ADM, UserRole.ROOT, UserRole.SYSTEM_ADM, UserRole.USER, UserRole.ACCOUNTANT],
    icon: <AdsAccountIcon />,
    children: [
      {
        title: 'TKQC',
        path: '/khai-bao-tkqc',
        allowedRoles: [UserRole.GROUP_ADM, UserRole.ROOT, UserRole.SYSTEM_ADM, UserRole.USER, UserRole.ACCOUNTANT],
        icon: <AdjustIcon fill="white" width={16} className="duration-300 hover:text-[#ccc]" />,
      },
      {
        title: 'Chiến dịch',
        path: '/khai-bao-chien-dich',
        allowedRoles: [UserRole.GROUP_ADM, UserRole.ROOT, UserRole.SYSTEM_ADM, UserRole.USER, UserRole.ACCOUNTANT],
        icon: <AdjustIcon fill="white" width={16} className="duration-300" />,
      }
    ]
  },
  {
    title: 'Khai báo TKNH',
    path: '/khai-bao-tk-ngan-hang',
    allowedRoles: [UserRole.GROUP_ADM, UserRole.ROOT, UserRole.SYSTEM_ADM, UserRole.USER, UserRole.ACCOUNTANT],
    icon: <AccountBankIcon />,
  },
  {
    title: 'Quản lý người dùng',
    path: '/quan-ly-nguoi-dung',
    allowedRoles: [UserRole.ROOT],
    icon: <UserManage />
  },
  {
    title: 'Quản lý HT-HKD',
    path: '/khai-bao-he-thong',
    allowedRoles: [UserRole.ROOT],
    icon: <DepartmentIcon color="white" />
  },
  {
    title: 'Xem báo cáo',
    path: '/xem-bao-cao',
    allowedRoles: [UserRole.GROUP_ADM, UserRole.ROOT, UserRole.SYSTEM_ADM, UserRole.USER, UserRole.ACCOUNTANT],
    icon: <ReportIcon />
  },
]

export default MenuSidebar;