import axios from "axios"

// export const GetBankBillings = () => {
//   return axios.get(`${import.meta.env.VITE_API_URL}/bank-billings`)
// }
export const GetBankBillings = () => {
  return axios.get(`https://6685fe4883c983911b007cf3.mockapi.io/bank-billings`)
}