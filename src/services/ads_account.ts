import api from "../config/api"
import { AddNewAdAccountDTO, EditAdsAccountDTO } from "../dto/AdsAccountDTO"

export const getListAdsAccount = ({ page, page_size } : { page: number, page_size: number}) => {
  const params = new URLSearchParams();
  
  if (page) params.append('page', page.toString());
  if (page_size) params.append('page_size', page_size.toString());
  return api.get(`/ad-accounts?${params.toString()}`)
}

export const editAdsAccount = (id: number, data: EditAdsAccountDTO) => {
  return api.put(`/ad-accounts/${id}`, data)
}

export const getAdsAccount = (id: number) => {
  return api.get(`/ad-accounts/${id}`)
}

export const addNewAdAccount = (data: AddNewAdAccountDTO) => {
  return api.post('ad-accounts', data)
}

export const deleteAdAccount = (id: number) => {
  return api.delete(`ad-accounts/${id}`)
}