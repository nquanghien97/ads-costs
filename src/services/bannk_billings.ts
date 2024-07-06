import axios from "axios"

export const GetBankBillings = () => {
  return axios.get(`${import.meta.env.VITE_API_URL}/bank-billings`)
}