import { create } from "zustand";
import { InformationSettingType } from "../entities/InformationSetting";
import { getAllAdAccountStatus, getAllAdAccountTypes, getAllBanks, getAllChannels, getAllCurrencies, getAllTimezones } from "../services/information_settings";

interface SystemStore {
  channels: InformationSettingType[],
  currencies: InformationSettingType[],
  timezones: InformationSettingType[],
  adAccountTypes: InformationSettingType[],
  adAccountStatus: InformationSettingType[],
  banks: InformationSettingType[],
  setChannels: (channels: InformationSettingType[] | ((prev: InformationSettingType[]) => InformationSettingType[])) => void,
  setCurrencies: (currencies: InformationSettingType[] | ((prev: InformationSettingType[]) => InformationSettingType[])) => void,
  setTimezones: (timezones: InformationSettingType[] | ((prev: InformationSettingType[]) => InformationSettingType[])) => void,
  setAdAccountTypes: (adAccountTypes: InformationSettingType[] | ((prev: InformationSettingType[]) => InformationSettingType[])) => void,
  setAdAccountStatus: (adAccountStatus: InformationSettingType[] | ((prev: InformationSettingType[]) => InformationSettingType[])) => void,
  setBanks: (banks: InformationSettingType[] | ((prev: InformationSettingType[]) => InformationSettingType[])) => void,
  getInformation: () => Promise<void>;
  loading: boolean;
}

export const useInformationSettingsStore = create<SystemStore>()((set) => ({
  channels: [],
  currencies: [],
  timezones: [],
  adAccountTypes: [],
  adAccountStatus: [],
  banks: [],
  setChannels: (channels) => set((state) => ({
    channels: typeof channels === 'function' ? channels(state.channels) : channels
  })),
  setCurrencies: (currencies) => set((state) => ({
    currencies: typeof currencies === 'function' ? currencies(state.currencies) : currencies
  })),
  setTimezones: (timezones) => set((state) => ({
    timezones: typeof timezones === 'function' ? timezones(state.timezones) : timezones
  })),
  setAdAccountTypes: (adAccountTypes) => set((state) => ({
    adAccountTypes: typeof adAccountTypes === 'function' ? adAccountTypes(state.adAccountTypes) : adAccountTypes
  })),
  setAdAccountStatus: (adAccountStatus) => set((state) => ({
    adAccountStatus: typeof adAccountStatus === 'function' ? adAccountStatus(state.adAccountStatus) : adAccountStatus
  })),
  setBanks: (banks) => set((state) => ({
    banks: typeof banks === 'function' ? banks(state.banks) : banks
  })),
  getInformation: async () => {
    set(() => ({ loading: true}))
    try {
      const [
        channelsResponse, currenciesResponse, timezonesResponse,
        adAccountTypesResponse, adAccountStatusResponse, banksResponse
      ] = await Promise.all([
        getAllChannels(), getAllCurrencies(), getAllTimezones(),
        getAllAdAccountTypes(), getAllAdAccountStatus(), getAllBanks()
      ]);

      set(() => ({ channels: channelsResponse.data.data.list }))
      set(() => ({ currencies: currenciesResponse.data.data.list }))
      set(() => ({ timezones: timezonesResponse.data.data.list }))
      set(() => ({ adAccountTypes: adAccountTypesResponse.data.data.list }))
      set(() => ({ adAccountStatus: adAccountStatusResponse.data.data.list }))
      set(() => ({ banks: banksResponse.data.data.list }))

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      set(() => ({ loading: false }))
    }
  },
  loading: false
}))