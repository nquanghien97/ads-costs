import withAuth from "../../hocs/withAuth";
import InformationSetting from "./InformationSetting";
import { addBank, addChannel, addCurrency, addSheetId, addTimezone, deleteBank, deleteChannel, deleteCurrency, deleteSheetId, deleteTimezone, editAdAccountStatus, editBank, editChannel, editCurrency, editSheetId, editTimezone } from "../../services/information_settings";
import { InformationSettingType } from "../../entities/InformationSetting";
import { useEffect, useState } from "react";
import { useInformationSettingsStore } from "../../zustand/information_settings.store";
import { useNotification } from "../../hooks/useNotification";

function InfomationSettings() {
  const {
    channels, currencies, timezones, adAccountTypes,
    banks, sheetIds, setChannels, setCurrencies,
    setTimezones, setAdAccountStatus, setBanks,
    setSheetIds,
    loading
  } = useInformationSettingsStore();

  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const notification = useNotification();

  const handleEdit = async (type: string, data: InformationSettingType) => {
    setLoadingEdit(true);
    try {
      switch (type) {
        case 'channel':
          await editChannel(data);
          notification.success('Sửa Kênh chạy thành công')
          setChannels((prev) => prev?.map((i) => (i.id === data.id ? data : i)));
          break;
        case 'currency':
          await editCurrency(data);
          notification.success('Sửa Tiền tệ thành công')
          setCurrencies((prev) => prev?.map((i) => (i.id === data.id ? data : i)));
          break;
        case 'timezone':
          await editTimezone(data);
          notification.success('Sửa Múi giờ thành công')
          setTimezones((prev) => prev?.map((i) => (i.id === data.id ? data : i)));
          break;
        // case 'adAccountType':
        //   await editAdAccountType(data);
        //   setAdAccountTypes((prev) => prev?.map((i) => (i.id === data.id ? data : i)));
        //   break;
        case 'adAccountStatus':
          await editAdAccountStatus(data);
          notification.success('Sửa Loại TKQC thành công')
          setAdAccountStatus((prev) => prev?.map((i) => (i.id === data.id ? data : i)));
          break;
        case 'bank':
          await editBank(data);
          notification.success('Sửa Ngân hàng thành công')
          setBanks((prev) => prev?.map((i) => (i.id === data.id ? data : i)));
          break;
        case 'sheetId':
          await editSheetId(data);
          notification.success('Sửa ID Google sheet thành công')
          setSheetIds((prev) => prev?.map((i) => (i.id === data.id ? data : i)));
          break;
        default:
          console.error('Unknown type:', type);
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error('Error editing item:', err);
        notification.error(err.message);
      }
    } finally {
      setLoadingEdit(false)
    }
  };

  const handleDelete = async (type: string, id: number) => {
    setLoadingDelete(true);
    try {
      switch (type) {
        case 'channel':
          await deleteChannel(id);
          notification.success('Xóa Kênh chạy thành công')
          setChannels((prev) => prev.filter((i) => i.id !== id));
          break;
        case 'currency':
          await deleteCurrency(id);
          notification.success('Xóa Tiền tệ thành công')
          setCurrencies((prev) => prev.filter((i) => i.id !== id));
          break;
        case 'timezone':
          await deleteTimezone(id);
          notification.success('Xóa Múi giờ thành công')
          setTimezones((prev) => prev.filter((i) => i.id !== id));
          break;
        // case 'adAccountType':
        //   await deleteAdAccountType(id);
        //   setAdAccountTypes((prev) => prev.filter((i) => i.id !== id));
        //   break;
        // case 'adAccountStatus':
        //   await deleteAdAccountStatus(id);
        //   setAdAccountStatus((prev) => prev.filter((i) => i.id !== id));
        //   break;
        case 'bank':
          await deleteBank(id);
          notification.success('Xóa Ngân hàng thành công')
          setBanks((prev) => prev.filter((i) => i.id !== id));
          break;
        case 'sheetId':
          await deleteSheetId(id);
          notification.success('Xóa ID Google sheet thành công')
          setSheetIds((prev) => prev.filter((i) => i.id !== id));
          break;
        default:
          console.error('Unknown type:', type);
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error('Error delete item:', err);
        notification.error(err.message);
      }
    } finally {
      setLoadingDelete(false)
    }
  };

  const handleAdd = async (type: string, name: string) => {
    setLoadingAdd(true);
    try {
      switch (type) {
        case 'channel': {
          const newChannel = await addChannel(name);
          notification.success('Thêm Kênh chạy thành công')
          setChannels((prev) => [...prev, newChannel.data.data]);
          break;
        }
        case 'currency': {
          const newCurrency = await addCurrency(name);
          notification.success('Thêm Tiền tệ thành công')
          setCurrencies((prev) => [...prev, newCurrency.data.data]);
          break;
        }
        case 'timezone': {
          const newTimezone = await addTimezone(name);
          notification.success('Thêm Múi giờ thành công')
          setTimezones((prev) => [...prev, newTimezone.data.data]);
          break;
        }
        // case 'adAccountType': {
        //   const newAdAccountType = await addAdAccountType(name);
        //   setAdAccountTypes((prev) => [...prev, newAdAccountType.data.data]);
        //   break;
        // }
        // case 'adAccountStatus': {
        //   const newAdAccountStatus = await addAdAccountStatus(name);
        //   setAdAccountStatus((prev) => [...prev, newAdAccountStatus.data.data]);
        //   break;
        // }
        case 'bank': {
          const newBank = await addBank(name);
          notification.success('Thêm Ngân hàng thành công')
          setBanks((prev) => [...prev, newBank.data.data]);
          break;
        }
        case 'sheetId': {
          const newSheetId = await addSheetId(name);
          notification.success('Thêm ID Google sheet thành công')
          setSheetIds((prev) => [...prev, newSheetId.data.data]);
          break;
        }
        default:
          console.error('Unknown type:', type);
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error('Error add item:', err);
        notification.error(err.message);
      }
    } finally {
      setLoadingAdd(false);
    }
  };

  useEffect(() => {
    document.title = 'Cài đặt thông tin';
  }, []);
  
  return (
    <div className="px-4">
      <div className="py-2 flex justify-center">
        <h2 className="px-6 py-2 rounded-full bg-[#68c2ed] font-bold text-xl uppercase text-center">CÀI ĐẶT THÔNG TIN</h2>
      </div>
      <div className="flex flex-col gap-4">
        <InformationSetting
          data={channels}
          title="Kênh chạy" color="#29A9E0"
          titleColor="#0071BA"
          onAdd={handleAdd}
          loading={loading}
          loadingAdd={loadingAdd}
          onDelete={handleDelete}
          loadingDelete={loadingDelete}
          handleEdit={handleEdit}
          loadingEdit={loadingEdit}
          type="channel"
        />
        <InformationSetting
          data={currencies}
          title="Tiền tệ" color="#91deab"
          titleColor="#3f8e4d"
          loading={loading}
          onAdd={handleAdd}
          loadingAdd={loadingAdd}
          onDelete={handleDelete}
          loadingDelete={loadingDelete}
          handleEdit={handleEdit}
          loadingEdit={loadingEdit}
          type="currency"
        />
        <InformationSetting
          data={timezones}
          title="Múi giờ" color="#eb94b9"
          titleColor="#c12f5b"
          loading={loading}
          onAdd={handleAdd}
          loadingAdd={loadingAdd}
          onDelete={handleDelete}
          loadingDelete={loadingDelete}
          handleEdit={handleEdit}
          loadingEdit={loadingEdit}
          type="timezone"
        />
        <InformationSetting
          data={adAccountTypes}
          title="Loại TKQC" color="#79ceba"
          titleColor="#469783"
          loading={loading}
          onAdd={handleAdd}
          loadingAdd={loadingAdd}
          onDelete={handleDelete}
          loadingDelete={loadingDelete}
          handleEdit={handleEdit}
          loadingEdit={loadingEdit}
          type="adAccountType"
        />
        {/* <InformationSetting
          data={adAccountStatus}
          title="Trạng thái TKQC" color="#f6ca99"
          titleColor="#e7963e"
          loading={loading}
          onAdd={handleAdd}
          loadingAdd={loadingAdd}
          onDelete={handleDelete}
          loadingDelete={loadingDelete}
          handleEdit={handleEdit}
          loadingEdit={loadingEdit}
          type="adAccountStatus"
        /> */}
        <InformationSetting
          data={banks}
          title="Ngân hàng"
          color="#dbcfc2"
          titleColor="#9e7e58"
          loading={loading}
          onAdd={handleAdd}
          loadingAdd={loadingAdd}
          onDelete={handleDelete}
          loadingDelete={loadingDelete}
          handleEdit={handleEdit}
          loadingEdit={loadingEdit}
          type="bank"
        />
        <InformationSetting
          data={sheetIds}
          title="ID Google Sheet"
          color="#ef9f40"
          titleColor="#db8116"
          loading={loading}
          onAdd={handleAdd}
          loadingAdd={loadingAdd}
          onDelete={handleDelete}
          loadingDelete={loadingDelete}
          handleEdit={handleEdit}
          loadingEdit={loadingEdit}
          type="sheetId"
        />
      </div>
    </div>
  )
}

const InfomationSettingsWithAuth = withAuth(InfomationSettings);

export default InfomationSettingsWithAuth;


