import { useEffect } from "react";
import withAuth from "../../hocs/withAuth";
import Header from "./Header";
import TableReportAds from "./TableReportAds";

function ReportView() {

  useEffect(() => {
    document.title = "Báo cáo"
  }, []);
  
  return (
    <div className="px-4">
      <Header />
      <TableReportAds />
    </div>
  )
}

const ReportViewWithAuth = withAuth(ReportView);

export default ReportViewWithAuth;