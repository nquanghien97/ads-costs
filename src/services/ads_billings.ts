import axios from "axios"

// export const GetAdsBillingsByUser = () => {
//   return axios.get(`${import.meta.env.VITE_API_URL}/ads-billings`)
// }

export const GetAdsBillingsByUser = () => {
  return axios.get(`https://6685fe4883c983911b007cf3.mockapi.io/ads-billings`)
}