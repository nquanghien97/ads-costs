import { useState } from "react";
import User from "../../entities/User";
import withAuth from "../../hocs/withAuth";
import Header from "./Header";
import TableUser from "./TableUser";

function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  return (
    <div className="px-4">
      <Header setUsers={setUsers} setLoading={setLoading} />
      <TableUser setUsers={setUsers} users={users} setLoading={setLoading} loading={loading} />
    </div>
  )
}

const UserManagementWithAuth = withAuth(UserManagement);

export default UserManagementWithAuth;