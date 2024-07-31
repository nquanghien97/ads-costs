import { UserRole } from "../entities/User";

export const roleOptions = [
  {
    label: "Admin tổng",
    value: UserRole.ROOT
  },
  {
    label: "Admin Hệ thống",
    value: UserRole.SYSTEM_ADM
  },
  {
    label: "Admin Hộ kinh doanh",
    value: UserRole.GROUP_ADM
  },
  {
    label: "Người dùng",
    value: UserRole.USER
  },
  {
    label: "Kế toán",
    valuiue: UserRole.ACCOUNTANT
  }
]