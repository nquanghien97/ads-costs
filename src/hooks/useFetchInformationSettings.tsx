import { useState, useEffect } from 'react';
import {
  getAllChannels, getAllCurrencies, getAllTimezones,
  getAllAdAccountTypes, getAllAdAccountStatus, getAllBanks,
} from '../services/information_settings';
import { InformationSettingType } from '../entities/InformationSetting';

const useFetchInformationSettings = () => {
  const [channels, setChannels] = useState<InformationSettingType[]>([]);
  const [currencies, setCurrencies] = useState<InformationSettingType[]>([]);
  const [timezones, setTimezones] = useState<InformationSettingType[]>([]);
  const [adAccountTypes, setAdAccountTypes] = useState<InformationSettingType[]>([]);
  const [adAccountStatus, setAdAccountStatus] = useState<InformationSettingType[]>([]);
  const [banks, setBanks] = useState<InformationSettingType[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [
          channelsResponse, currenciesResponse, timezonesResponse,
          adAccountTypesResponse, adAccountStatusResponse, banksResponse
        ] = await Promise.all([
          getAllChannels(), getAllCurrencies(), getAllTimezones(),
          getAllAdAccountTypes(), getAllAdAccountStatus(), getAllBanks()
        ]);

        setChannels(channelsResponse.data.data.list);
        setCurrencies(currenciesResponse.data.data.list);
        setTimezones(timezonesResponse.data.data.list);
        setAdAccountTypes(adAccountTypesResponse.data.data.list);
        setAdAccountStatus(adAccountStatusResponse.data.data.list);
        setBanks(banksResponse.data.data.list);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { channels, currencies, timezones, adAccountTypes, adAccountStatus, banks, setChannels, setCurrencies, setTimezones, setAdAccountTypes, setAdAccountStatus, setBanks, loading };
};

export default useFetchInformationSettings;
