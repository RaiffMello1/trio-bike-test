import { BOILERPLATE_CANDIDATE_TOKEN } from 'config'
import apiClient from './api'

interface PayloadRent{
    bikeId: number,
    userId: number,
    dateFrom: string,
    dateTo: string
}

interface AmountSuccess{
    rentAmount: number,
    fee: number,
    totalAmount: number
}

const config = {
    headers: {
      'Authorization': BOILERPLATE_CANDIDATE_TOKEN
    }
}

export const amount = (payload: PayloadRent): AmountSuccess => {
    let rsp = {
        rentAmount: 0,
        fee: 0,
        totalAmount: 0
    }

    apiClient.post('https://trio-bike-rent-api.herokuapp.com/api/bikes/amount', {
        bikeId: payload.bikeId,
        userId: payload.userId,
        dateFrom: payload.dateFrom,
        dateTo: payload.dateTo
      }, config).then(data =>{
        rsp =  {
            rentAmount: data.data.rentAmount,
            fee: data.data.fee,
            totalAmount: data.data.totalAmount
        }
      })
    return rsp
}

interface RentSuccess{
    rentted: boolean
}

export const rent = (payload: PayloadRent): RentSuccess => {
    let rsp = {
        rentted: false
    }
     apiClient.post('https://trio-bike-rent-api.herokuapp.com/api/bikes/rent', {
        bikeId: payload.bikeId,
        userId: payload.userId,
        dateFrom: payload.dateFrom,
        dateTo: payload.dateTo
      }, config).then(data =>{
        rsp =  {
            rentted: true
        }
      })
    return rsp
}