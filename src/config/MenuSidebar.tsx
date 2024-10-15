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
import ContentIcon from "../assets/icons/ContentIcon";

export interface MenuSidebar {
  title: string;
  subTitle?: string;
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
    icon: <CurrencyIcon  />,
  },
  {
    title: 'Content',
    path: '/content',
    allowedRoles: [UserRole.GROUP_ADM, UserRole.ROOT, UserRole.SYSTEM_ADM, UserRole.USER, UserRole.ACCOUNTANT],
    icon: <ContentIcon />
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
        icon: <AdjustIcon width={16} />,
      },
      {
        title: 'Chiến dịch',
        path: '/khai-bao-chien-dich',
        allowedRoles: [UserRole.GROUP_ADM, UserRole.ROOT, UserRole.SYSTEM_ADM, UserRole.USER, UserRole.ACCOUNTANT],
        icon: <AdjustIcon width={16} />,
      },
      {
        title: 'TKQC (live)',
        path: '/khai-bao-tkqc-live',
        allowedRoles: [UserRole.GROUP_ADM, UserRole.ROOT, UserRole.SYSTEM_ADM, UserRole.USER, UserRole.ACCOUNTANT],
        icon: <AdjustIcon width={16} />,
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
    icon: <DepartmentIcon />
  },
  {
    title: 'Xem báo cáo',
    path: '/xem-bao-cao',
    allowedRoles: [UserRole.GROUP_ADM, UserRole.ROOT, UserRole.SYSTEM_ADM, UserRole.USER, UserRole.ACCOUNTANT],
    icon: <ReportIcon />
  },
  {
    title: 'CPQC - Hóa đơn',
    subTitle: '(chưa khai báo)',
    path: '/cpqc-hoa-don-chua-khai-bao',
    allowedRoles: [UserRole.GROUP_ADM, UserRole.ROOT, UserRole.SYSTEM_ADM, UserRole.USER, UserRole.ACCOUNTANT],
    icon: <CurrencyIcon  />
  },
]

export default MenuSidebar;