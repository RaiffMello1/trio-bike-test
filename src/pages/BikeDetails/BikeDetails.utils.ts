import { SERVICE_FEE_PERCENTAGE } from './BikeDetails.contants'

export const getServicesFee = (amount: number): number =>
  Math.floor(amount * SERVICE_FEE_PERCENTAGE)


export const formatMonth = (month : number) =>{
  const tmp = month + 1
  if(tmp < 10) return '0'+ tmp.toString()
  return tmp.toString()
}