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

export const amount = (payload: PayloadRent): Promise<AmountSuccess> => {
    return apiClient.post('https://trio-bike-rent-api.herokuapp.com/api/bikes/amount', {
        bikeId: payload.bikeId,
        userId: payload.userId,
        dateFrom: payload.dateFrom,
        dateTo: payload.dateTo
    }, config).then(data => {
        return {
            rentAmount: data.data.rentAmount,
            fee: data.data.fee,
            totalAmount: data.data.totalAmount
        }
    })
}

interface RentSuccess{
    msg: string
    rentted: boolean
}

export const rent = (payload: PayloadRent): Promise<RentSuccess> => {
     return apiClient.post('https://trio-bike-rent-api.herokuapp.com/api/bikes/rent', {
        bikeId: payload.bikeId,
        userId: payload.userId,
        dateFrom: payload.dateFrom,
        dateTo: payload.dateTo
      }, config).then(() =>{
        return  {
            rentted: true,
            msg: ''
        }
      }).catch(err => {
        console.log(err.response.data.message)
        return {
            rentted: false,
            msg: err.response.data.message
        }
      })
}