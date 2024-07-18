import axios from "axios"

export const GetListAdsAccount = () => {
  return axios.get(`${import.meta.env.VITE_API_URL}/ad-accounts`)
}