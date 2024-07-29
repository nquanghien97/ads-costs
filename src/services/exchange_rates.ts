import api from "../config/api"
import { ExchangeRateDTO } from "../dto/ExchangeRateDTO"

export const ExchangeRateDeclaration = (data: ExchangeRateDTO[]) => {
  return api.post(`/exchange-rates`, { data })
}

export const getListExchangeRate = () => {
  return api.get('/exchange-rates')
}