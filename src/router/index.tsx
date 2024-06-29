import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Invoice from "../pages/Invoice";
import BankTransaction from "../pages/BankTransaction";
import InfomationSettings from "../pages/InformationSettings";
import AdvertAccountDeclaration from "../pages/AdvertAccountDeclaration";
import BankAccountDeclaration from "../pages/BankAccountDeclaration";
import UserManagement from "../pages/UserManagement";
import BusinessHouseholdSystemDeclaration from "../pages/BusinessHouseholdSystemDeclaration";
import ReportView from "../pages/ReportView";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/cpqc-hoa-don",
    element: <Invoice />,
  },
  {
    path: "/giao-dich-ngan-hang",
    element: <BankTransaction />,
  },
  {
    path: "/cai-dat-thong-tin",
    element: <InfomationSettings />,
  },
  {
    path: "/khai-bao-tkqc",
    element: <AdvertAccountDeclaration />,
  },
  {
    path: "/khai-bao-tk-ngan-hang",
    element: <BankAccountDeclaration />,
  },
  {
    path: "/quan-ly-nguoi-dung",
    element: <UserManagement />,
  },
  {
    path: "/khai-bao-he-thong-ho-kinh-doanh",
    element: <BusinessHouseholdSystemDeclaration />,
  },
  {
    path: "/xem-bao-cao",
    element: <ReportView />,
  },
]);

export default router;