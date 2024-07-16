import withAuth from "../../hocs/withAuth";
import Header from "./Header";
import TableReportAds from "./TableReportAds";

function ReportView() {
  return (
    <div className="px-4">
      <Header />
      <TableReportAds />
    </div>
  )
}

const ReportViewWithAuth = withAuth(ReportView);

export default ReportViewWithAuth;