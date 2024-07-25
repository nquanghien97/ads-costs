import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Login from "../pages/Login";
import AdCosts from "../pages/AdCosts";
import BankTransaction from "../pages/BankTransaction";
import InformationSettings from "../pages/InformationSettings";
import AdsAccountDeclaration from "../pages/AdsAccountDeclaration";
import BankAccountDeclaration from "../pages/BankAccountDeclaration";
import UserManagementWithAuth from "../pages/UserManagement";
import ReportView from "../pages/ReportAds";
import Home from "../pages/Home";
import Layout from "../layout";
import SystemDeclaration from "../pages/SystemDeclaration";
import GroupDeclaration from "../pages/GroupDeclaration";
import { UserRole } from "../entities/User";
import PrivateRouteWithAuth from "./PrivateRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/cpqc-hoa-don" element={<AdCosts />} />
        <Route path="/giao-dich-ngan-hang" element={<BankTransaction />} />
        <Route
          path="/cai-dat-thong-tin"
          element={
            <PrivateRouteWithAuth roles={[UserRole.ROOT]}>
              <InformationSettings />
            </PrivateRouteWithAuth>
          }
        />
        <Route path="/khai-bao-tkqc" element={<AdsAccountDeclaration />} />
        <Route path="/khai-bao-tk-ngan-hang" element={<BankAccountDeclaration />} />
        <Route
          path="/quan-ly-nguoi-dung"
          element={
            <PrivateRouteWithAuth roles={[UserRole.ROOT]}>
              <UserManagementWithAuth />
            </PrivateRouteWithAuth>
          }
        />
        <Route
          path="/khai-bao-he-thong"
          element={
            <PrivateRouteWithAuth roles={[UserRole.ROOT]}>
              <SystemDeclaration />
            </PrivateRouteWithAuth>
          }
        />
        <Route
          path="/khai-bao-ho-kinh-doanh/:systemId"
          element={
            <PrivateRouteWithAuth roles={[UserRole.ROOT]}>
              <GroupDeclaration />
            </PrivateRouteWithAuth>
          }
        />
        <Route path="/xem-bao-cao" element={<ReportView />} />
      </Route>
    </>
  )
);

export default router;