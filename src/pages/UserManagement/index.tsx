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
}

function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchForm, setSearchForm] = useState<SearchFormType>()

  useEffect(() => {
    document.title = "Quản lý người dùng"
  }, []);

  return (
    <div className="px-4">
      <Header setUsers={setUsers} setLoading={setLoading} setSearchForm={setSearchForm} />
      <TableUser setUsers={setUsers} users={users} setLoading={setLoading} loading={loading} searchForm={searchForm} />
    </div>
  )
}

const UserManagementWithAuth = withAuth(UserManagement);

export default UserManagementWithAuth;