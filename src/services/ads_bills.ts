import api from "../config/api"
import { DeclarationAdsBillsDTO } from "../dto/AdsBillingsDTO";

export const DeclarationAdsBills = (data: DeclarationAdsBillsDTO[]) => {
  return api.post('/bulk-ads-bills', {data})
}