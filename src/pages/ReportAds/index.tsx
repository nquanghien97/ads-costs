import { useEffect, useState } from "react";
import withAuth from "../../hocs/withAuth";
import Header from "./Header";
import TableReportSystem from "./TableReportAds/TableReportSystem";
import { GroupData } from "./TableReportAds/TableReportSystem/type";
import TableReportGroup from "./TableReportAds/TableReportGroup";

export interface SearchForm {
  search: string;
  system_id: number;
  system_name: string;
  group_id: number;
  group_name: string;
  user_id: number;
  since?: string;
  until?: string;
}

function ReportView() {

  const [dataGroup, setDataGroup] = useState<GroupData[]>([]);
  const [searchForm, setSearchForm] = useState<SearchForm>({
    search: '',
    system_id: 0,
    system_name: '',
    group_id: 0,
    group_name: '',
    user_id: 0,
    since: '',
    until: ''
  });
  useEffect(() => {
    document.title = "Báo cáo"
  }, []);
  console.log(searchForm)

  const renderTable = () => {
    if (searchForm.group_id) return <TableReportGroup searchForm={searchForm} />
    if (searchForm.system_id && !searchForm.group_id) return <TableReportSystem dataGroup={dataGroup} setDataGroup={setDataGroup} searchForm={searchForm} />
  }
  
  return (
    <div className="px-4">
      <Header setSearchForm={setSearchForm} />
      {renderTable()}
    </div>
  )
}

const ReportViewWithAuth = withAuth(ReportView);

export default ReportViewWithAuth;