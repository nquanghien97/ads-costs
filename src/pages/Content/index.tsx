import { useState } from 'react'
import Header from './Header';
import User from '../../entities/User';
import TableContent from './TableContent';
import { Button } from 'antd';

export interface SearchFormType {
  search?: string;
  system_id?: number;
  group_id?: number;
  user_id?: number;
  page?: number;
  page_size?: number;
}
function Content() {

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchForm, setSearchForm] = useState<SearchFormType>()
  console.log({
    searchForm,
    users,
    loading
  })

  return (
    <div className="px-4">
      <Header setUsers={setUsers} setLoading={setLoading} setSearchForm={setSearchForm} />
      <div className="flex justify-between mb-4">
        <div className="m-auto">
          <span className="px-6 py-2 rounded-full bg-[#68c2ed] font-bold text-black uppercase">Quản lý content</span>
        </div>
        <div className="flex gap-2">
          <Button size="large" className="border-[1px] border-[#007bb5] rounded-lg">
            {/* <ExportExcelAdsAccount apiData={data} /> */}Export
          </Button>
        </div>
      </div>
      <TableContent />
      {/* <TableUser setUsers={setUsers} users={users} setLoading={setLoading} loading={loading} searchForm={searchForm} setSearchForm={setSearchForm} /> */}
    </div>
  )
}

export default Content