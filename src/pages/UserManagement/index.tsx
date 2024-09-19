import { useEffect, useState } from "react";
import User from "../../entities/User";
import withAuth from "../../hocs/withAuth";
import Header from "./Header";
import TableUser from "./TableUser";

export interface SearchFormType {
  search?: string;
  system_id?: number;
  group_id?: number;
  user_id?: number;
  page?: number;
  page_size?: number;
}

function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchForm, setSearchForm] = useState<SearchFormType>({
    search: '',
    system_id: 0,
    group_id: 0,
    user_id: 0,
    page: 1,
    page_size: 20
  })

  useEffect(() => {
    document.title = "Quản lý người dùng"
  }, []);

  return (
    <div className="px-4">
      <Header setLoading={setLoading} setSearchForm={setSearchForm} />
      <TableUser setUsers={setUsers} users={users} setLoading={setLoading} loading={loading} searchForm={searchForm} setSearchForm={setSearchForm} />
    </div>
  )
}

const UserManagementWithAuth = withAuth(UserManagement);

export default UserManagementWithAuth;