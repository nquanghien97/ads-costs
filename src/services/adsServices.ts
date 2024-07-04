import axios from "axios"

export const AdsBillings = () => {
  return axios.get(`${import.meta.env.VITE_API_URL}/ads-billings`)
}