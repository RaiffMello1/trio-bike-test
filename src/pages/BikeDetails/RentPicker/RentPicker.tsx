import { Box, Divider, Typography } from '@mui/material'
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { BOILERPLATE_USER_ID } from 'config';
import { BookingButton, InfoIcon, OverviewContainer, PriceRow } from 'pages/BikeDetails/BikeDetails.styles';
import { useEffect, useState } from 'react';
import { amount, rent } from 'services/bike';
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';
import { formatMonth } from '../BikeDetails.utils';

interface RentProps {
    rateByDay: number
    servicesFee: number
    total: number
    bikeId: number
    setRentted: (rent: boolean) => void

}

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const Rent = ({ rateByDay, servicesFee, total, bikeId, setRentted }: RentProps) => {

  const [value, handleSelect] = useState<Value>([new Date(), new Date()]);

  const [dateFrom, setDateFrom] = useState<string>('')
  const [dateTo, setDateTo] = useState<string>('')

  const [rentAmmount, setRentAmmount] = useState<number>(0)
  const [fee, setFee] = useState<number>(0)
  const [totalAmmount, setTotalAmmount] = useState<number>(0)

  useEffect(() =>{
    if(value && bikeId != 0){
      const dataSplitted = value?.toString().split(',')
      const dateStart = new Date(dataSplitted![0])
      const dateEnd = new Date(dataSplitted![1])

      const startMonth = formatMonth(dateStart.getMonth())
      const endMonth = formatMonth(dateStart.getMonth())
      
      const dateFrom = `${dateStart.getFullYear()}-${startMonth}-${dateStart.getDate()}`
      const dateTo = `${dateEnd.getFullYear()}-${endMonth}-${dateEnd.getDate()}`
      setDateFrom(dateFrom)
      setDateTo(dateTo)

      const fetchData = async () => {
        try {
            await amount({
                bikeId: bikeId,
                userId: parseInt(BOILERPLATE_USER_ID),
                dateFrom: dateFrom,
                dateTo: dateTo
              }).then((data: any) => {
                setRentAmmount(data.rentAmount)
                setFee(data.fee)
                setTotalAmmount(data.totalAmount)
              })
            
        } catch (error) {
          'catch'
        } finally {
         'finally'
        }
      };

      fetchData()
      
    }
    
    
  }, [value])

  const  handleBooking = async () => {
    const result = await rent({
      bikeId: bikeId,
      userId: parseInt(BOILERPLATE_USER_ID),
      dateFrom: dateFrom,
      dateTo: dateTo
    }).then((data) => {
        setRentted(data.rentted)
    })
    
  }


  return (
    <OverviewContainer variant='outlined' data-testid='bike-overview-container'>
          <Typography variant='h1' fontSize={20} marginBottom={1.25}>
            Select Date and Time
          </Typography>
          <DateRangePicker onChange={handleSelect} value={value} format='yyyy-MM-dd' minDate={new Date()}/>
          <Typography variant='h2' fontSize={16} marginBottom={1.25}>
            Booking Overview
          </Typography>

          <Divider />

          <PriceRow marginTop={1.75} data-testid='bike-overview-single-price'>
            <Box display='flex' alignItems='center'>
              <Typography marginRight={1}>Subtotal</Typography>
              <InfoIcon fontSize='small' />
            </Box>

            <Typography>{rentAmmount > 0 ? rentAmmount : rateByDay} €</Typography>
          </PriceRow>

          <PriceRow marginTop={1.5} data-testid='bike-overview-single-price'>
            <Box display='flex' alignItems='center'>
              <Typography marginRight={1}>Service Fee</Typography>
              <InfoIcon fontSize='small' />
            </Box>

            <Typography>{fee > 0 ? fee : servicesFee} €</Typography>
          </PriceRow>

          <PriceRow marginTop={1.75} data-testid='bike-overview-total'>
            <Typography fontWeight={800} fontSize={16}>
              Total
            </Typography>
            <Typography variant='h2' fontSize={24} letterSpacing={1}>
              {totalAmmount > 0 ? totalAmmount : total} €
            </Typography>
          </PriceRow>

          <BookingButton
            fullWidth
            disableElevation
            variant='contained'
            data-testid='bike-booking-button'
            onClick={handleBooking}
          >
            Add to booking
          </BookingButton>
        </OverviewContainer>
  )
}

export default Rent
