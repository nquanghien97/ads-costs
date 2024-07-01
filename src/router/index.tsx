import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Login from "../pages/Login";
import Invoice from "../pages/Invoice";
import BankTransaction from "../pages/BankTransaction";
import InformationSettings from "../pages/InformationSettings";
import AdsAccountDeclaration from "../pages/AdsAccountDeclaration";
import BankAccountDeclaration from "../pages/BankAccountDeclaration";
import UserManagement from "../pages/UserManagement";
import BusinessHouseholdSystemDeclaration from "../pages/BusinessHouseholdSystemDeclaration";
import ReportView from "../pages/ReportView";
import Home from "../pages/Home";
import Sidebar from "../components/Sidebar";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<Sidebar />}>
        <Route path="/" element={<Home />} />
        <Route path="/cpqc-hoa-don" element={<Invoice />} />
        <Route path="/giao-dich-ngan-hang" element={<BankTransaction />} />
        <Route path="/cai-dat-thong-tin" element={<InformationSettings />} />
        <Route path="/khai-bao-tkqc" element={<AdsAccountDeclaration />} />
        <Route path="/khai-bao-tk-ngan-hang" element={<BankAccountDeclaration />} />
        <Route path="/quan-ly-nguoi-dung" element={<UserManagement />} />
        <Route path="/khai-bao-he-thong-ho-kinh-doanh" element={<BusinessHouseholdSystemDeclaration />} />
        <Route path="/xem-bao-cao" element={<ReportView />} />
        <Route path="/khai-bao-he-thong-ho-kinh-doanh" element={<BusinessHouseholdSystemDeclaration />} />
      </Route>
    </>
  )
);
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/cpqc-hoa-don",
//     element: <Invoice />,
//   },
//   {
//     path: "/giao-dich-ngan-hang",
//     element: <BankTransaction />,
//   },
//   {
//     path: "/cai-dat-thong-tin",
//     element: <InfomationSettings />,
//   },
//   {
//     path: "/khai-bao-tkqc",
//     element: <AdvertAccountDeclaration />,
//   },
//   {
//     path: "/khai-bao-tk-ngan-hang",
//     element: <BankAccountDeclaration />,
//   },
//   {
//     path: "/quan-ly-nguoi-dung",
//     element: <UserManagement />,
//   },
//   {
//     path: "/khai-bao-he-thong-ho-kinh-doanh",
//     element: <BusinessHouseholdSystemDeclaration />,
//   },
//   {
//     path: "/xem-bao-cao",
//     element: <ReportView />,
//   },
// ]);

export default router;