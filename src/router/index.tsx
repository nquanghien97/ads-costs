import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Login from "../pages/Login";
import AdCosts from "../pages/AdCosts";
import BankTransaction from "../pages/BankTransaction";
import InformationSettings from "../pages/InformationSettings";
import AdsAccountDeclarationWithAuth from "../pages/AdsAccountDeclaration";
import BankAccountDeclaration from "../pages/BankAccountDeclaration";
import UserManagementWithAuth from "../pages/UserManagement";
import ReportView from "../pages/ReportAds";
import Home from "../pages/Home";
import Layout from "../layout";
import SystemDeclaration from "../pages/SystemDeclaration";
import GroupDeclaration from "../pages/GroupDeclaration";
import { UserRole } from "../entities/User";
import PrivateRouteWithAuth from "./PrivateRoute";
import ExchangeRate from "../pages/ExchangeRate";
import ChangePasswordPage from "../pages/ChangePassword";
import CampaignsDeclarationWithAuth from "../pages/CampaignsDeclaration";
import Content from "../pages/Content";
import AdsAccountLiveDeclarationWithAuth from "../pages/AdsAccountLiveDeclaration";
import AdCostsNotDeclared from "../pages/AdCostsNotDeclared"

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
        <Route path="/khai-bao-tkqc" element={<AdsAccountDeclarationWithAuth />} />
        <Route path="/khai-bao-chien-dich" element={<CampaignsDeclarationWithAuth />} />
        <Route path="/khai-bao-tkqc-live" element={<AdsAccountLiveDeclarationWithAuth />} />
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
        <Route path="/content" element={<Content />} />
        <Route path="/xem-bao-cao" element={<ReportView />} />
        <Route path="/xem-ty-gia" element={<ExchangeRate />} />
        <Route
        path="/cpqc-hoa-don-chua-khai-bao"
        element={
          <PrivateRouteWithAuth roles={[UserRole.ROOT, UserRole.ACCOUNTANT]}>
            <AdCostsNotDeclared />
          </PrivateRouteWithAuth>
        }
      />
      </Route>
      <Route path="/thay-doi-mat-khau" element={<ChangePasswordPage />} />
    </>
  )
);

export default router;