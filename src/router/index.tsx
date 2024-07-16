import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Login from "../pages/Login";
import Invoice from "../pages/Invoice";
import BankTransaction from "../pages/BankTransaction";
import InformationSettings from "../pages/InformationSettings";
import AdsAccountDeclaration from "../pages/AdsAccountDeclaration";
import BankAccountDeclaration from "../pages/BankAccountDeclaration";
import UserManagement from "../pages/UserManagement";
import ReportView from "../pages/ReportAds";
import Home from "../pages/Home";
import Sidebar from "../components/Sidebar";
import SystemDeclaration from "../pages/SystemDeclaration";
import GroupDeclaration from "../pages/GroupDeclaration";

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
        <Route path="/khai-bao-he-thong" element={<SystemDeclaration />} />
        <Route path="/khai-bao-ho-kinh-doanh/:groupId" element={<GroupDeclaration />} />
        <Route path="/xem-bao-cao" element={<ReportView />} />
      </Route>
    </>
  )
);

export default router;