import withAuth from "../../hocs/withAuth";
import Header from "./Header";
import TableUser from "./TableUser";

function UserManagement() {
  return (
    <div className="px-4">
      <Header />
      <TableUser />
    </div>
  )
}

const UserManagementWithAuth = withAuth(UserManagement);

export default UserManagementWithAuth;