import axios from "axios"

export const GetAdsBillingsByUser = () => {
  return axios.get(`${import.meta.env.VITE_API_URL}/ads-billings`)
}