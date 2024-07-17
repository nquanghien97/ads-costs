import withAuth from "../../hocs/withAuth";
import InformationSetting from "./InformationSetting";
import { addAdAccountStatus, addAdAccountType, addBank, addChannel, addCurrency, addTimezone, deleteAdAccountStatus, deleteAdAccountType, deleteBank, deleteChannel, deleteCurrency, deleteTimezone, editAdAccountStatus, editAdAccountType, editBank, editChannel, editCurrency, editTimezone } from "../../services/information_settings";
import { InformationSettingType } from "../../entities/InformationSetting";
import { useState } from "react";
import { useInformationSettingsStore } from "../../zustand/information_settings.store";

function InfomationSettings() {
  const {
    channels, currencies, timezones, adAccountTypes,
    adAccountStatus, banks, setChannels, setCurrencies,
    setTimezones, setAdAccountTypes, setAdAccountStatus, setBanks,
    loading
  } = useInformationSettingsStore(); 

  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleEdit = async (type: string, data: InformationSettingType) => {
    setLoadingEdit(true);
    try {
      switch (type) {
        case 'channel':
          await editChannel(data);
          setChannels((prev) => prev?.map((i) => (i.id === data.id ? data : i)));
          break;
        case 'currency':
          await editCurrency(data);
          setCurrencies((prev) => prev?.map((i) => (i.id === data.id ? data : i)));
          break;
        case 'timezone':
          await editTimezone(data);
          setTimezones((prev) => prev?.map((i) => (i.id === data.id ? data : i)));
          break;
        case 'adAccountType':
          await editAdAccountType(data);
          setAdAccountTypes((prev) => prev?.map((i) => (i.id === data.id ? data : i)));
          break;
        case 'adAccountStatus':
          await editAdAccountStatus(data);
          setAdAccountStatus((prev) => prev?.map((i) => (i.id === data.id ? data : i)));
          break;
        case 'bank':
          await editBank(data);
          setBanks((prev) => prev?.map((i) => (i.id === data.id ? data : i)));
          break;
        default:
          console.error('Unknown type:', type);
      }
    } catch (error) {
      console.error('Error editing item:', error);
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
          setChannels((prev) => prev.filter((i) => i.id !== id));
          break;
        case 'currency':
          await deleteCurrency(id);
          setCurrencies((prev) => prev.filter((i) => i.id !== id));
          break;
        case 'timezone':
          await deleteTimezone(id);
          setTimezones((prev) => prev.filter((i) => i.id !== id));
          break;
        case 'adAccountType':
          await deleteAdAccountType(id);
          setAdAccountTypes((prev) => prev.filter((i) => i.id !== id));
          break;
        case 'adAccountStatus':
          await deleteAdAccountStatus(id);
          setAdAccountStatus((prev) => prev.filter((i) => i.id !== id));
          break;
        case 'bank':
          await deleteBank(id);
          setBanks((prev) => prev.filter((i) => i.id !== id));
          break;
        default:
          console.error('Unknown type:', type);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
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
          setChannels((prev) => [...prev, newChannel.data.data]);
          break;
        }
        case 'currency': {
          const newCurrency = await addCurrency(name);
          setCurrencies((prev) => [...prev, newCurrency.data.data]);
          break;
        }
        case 'timezone': {
          const newTimezone = await addTimezone(name);
          setTimezones((prev) => [...prev, newTimezone.data.data]);
          break;
        }
        case 'adAccountType': {
          const newAdAccountType = await addAdAccountType(name);
          setAdAccountTypes((prev) => [...prev, newAdAccountType.data.data]);
          break;
        }
        case 'adAccountStatus': {
          const newAdAccountStatus = await addAdAccountStatus(name);
          setAdAccountStatus((prev) => [...prev, newAdAccountStatus.data.data]);
          break;
        }
        case 'bank': {
          const newBank = await addBank(name);
          setBanks((prev) => [...prev, newBank.data.data]);
          break;
        }
        default:
          console.error('Unknown type:', type);
      }
    } catch (error) {
      console.error('Error adding item:', error);
    } finally {
      setLoadingAdd(false);
    }
  };
  
  return (
    <div className="px-4">
      <div className="py-2 flex justify-center">
        <h2 className="px-6 py-2 rounded-full bg-[#0071BA] text-white text-2xl uppercase text-center">Cài đặt thông tin</h2>
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
        <InformationSetting
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
        />
        <InformationSetting
          data={banks}
          title="Ngân hàng" color="#dbcfc2"
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
      </div>
    </div>
  )
}

const InfomationSettingsWithAuth = withAuth(InfomationSettings);

export default InfomationSettingsWithAuth;


