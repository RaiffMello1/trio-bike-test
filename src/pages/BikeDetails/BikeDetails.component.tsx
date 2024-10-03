import { Box, Breadcrumbs, Divider, Link, Typography } from '@mui/material'
import BikeImageSelector from 'components/BikeImageSelector'
import BikeSpecs from 'components/BikeSpecs'
import BikeType from 'components/BikeType'
import BookingAddressMap from 'components/BookingAddressMap'
import Header from 'components/Header'
import Bike from 'models/Bike'
import { getServicesFee } from './BikeDetails.utils'
import {
  BookingButton,
  BreadcrumbContainer,
  BreadcrumbHome,
  BreadcrumbSeparator,
  Content,
  DetailsContainer,
  FavoriteIcon,
  InfoIcon,
  LikeButton,
  OverviewContainer,
  PriceRow,
} from './BikeDetails.styles'

import { useEffect, useState } from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import {BOILERPLATE_USER_ID} from 'config'
import { amount, rent } from 'services/bike'

interface BikeDetailsProps {
  bike?: Bike
}

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const BikeDetails = ({ bike }: BikeDetailsProps) => {
  const rateByDay = bike?.rate || 0
  const rateByWeek = rateByDay * 7

  const servicesFee = getServicesFee(rateByDay)
  const total = rateByDay + servicesFee

  const [value, handleSelect] = useState<Value>([new Date(), new Date()]);

  const [dateFrom, setDateFrom] = useState<string>('')
  const [dateTo, setDateTo] = useState<string>('')

  const [rentAmmount, setRentAmmount] = useState<number>(0)
  const [fee, setFee] = useState<number>(0)
  const [totalAmmount, setTotalAmmount] = useState<number>(0)
  const [rentted, setRentted] = useState<boolean>(false)
  const [selecterUrl, setSelectedUrl] = useState<string | undefined>(bike?.imageUrls[0])

  useEffect(() =>{
    const dataSplitted = value?.toString().split(',')
    const dateStart = new Date(dataSplitted![0])
    const dateEnd = new Date(dataSplitted![1])

    setDateFrom(`${dateStart.getFullYear()}-${dateStart.getUTCMonth()}-${dateStart.getDate()}`)
    setDateTo(`${dateEnd.getFullYear()}-${dateEnd.getMonth()}-${dateEnd.getDate()}`)
    
    const result = amount({
      bikeId: bike?.id ?? 0,
      userId: parseInt(BOILERPLATE_USER_ID),
      dateFrom: `${dateStart.getFullYear()}-${dateStart.getUTCMonth()}-${dateStart.getDate()}`,
      dateTo: `${dateEnd.getFullYear()}-${dateEnd.getMonth()}-${dateEnd.getDate()}`
    })
    setRentAmmount(result.rentAmount)
    setFee(result.fee)
    setTotalAmmount(result.totalAmount)
    
  }, [value])


  function handleBooking(){
    const result = rent({
      bikeId: bike?.id ?? 0,
      userId: parseInt(BOILERPLATE_USER_ID),
      dateFrom: dateFrom,
      dateTo: dateTo
    })
    setRentted(result.rentted)
  }

  function handleSelectedUrl(selecterUrl: string){
    setSelectedUrl(selecterUrl)
  }

  return (
    <div data-testid='bike-details-page'>
      <Header />

      <BreadcrumbContainer data-testid='bike-details-breadcrumbs'>
        <Breadcrumbs separator={<BreadcrumbSeparator />}>
          <Link underline='hover' display='flex' alignItems='center' color='white' href='/'>
            <BreadcrumbHome />
          </Link>

          <Typography fontWeight={800} letterSpacing={1} color='white'>
            {bike?.name}
          </Typography>
        </Breadcrumbs>
      </BreadcrumbContainer>

      <Content>
        <DetailsContainer variant='outlined' data-testid='bike-details-container'>
        {!!bike?.imageUrls && <BikeImageSelector imageUrls={bike.imageUrls} handleSelectedUrl={handleSelectedUrl}/>}

          <BikeSpecs bodySize={bike?.bodySize} maxLoad={bike?.maxLoad} ratings={bike?.ratings} />

          <Divider />

          <Box marginY={2.25}>
            <Box display='flex' alignItems='center' justifyContent='space-between'>
              <div>
                <Typography
                  variant='h1'
                  fontSize={38}
                  fontWeight={800}
                  marginBottom={0.5}
                  data-testid='bike-name-details'
                >
                  {bike?.name}
                </Typography>

                <BikeType type={bike?.type} />
              </div>

              <LikeButton>
                <FavoriteIcon />
              </LikeButton>
            </Box>

            <Typography marginTop={1.5} fontSize={14}>
              {bike?.description}
            </Typography>
          </Box>

          <Divider />

          <Box marginY={2.25} data-testid='bike-prices-details'>
            <PriceRow>
              <Typography>Day</Typography>
              <Typography fontWeight={800} fontSize={24} letterSpacing={1}>
                {rateByDay} €
              </Typography>
            </PriceRow>

            <PriceRow>
              <Typography>Week</Typography>
              <Typography fontWeight={800} fontSize={24} letterSpacing={1}>
                {rateByWeek} €
              </Typography>
            </PriceRow>
          </Box>

          <Divider />

          <Box marginTop={3.25}>
            <Typography variant='h1' fontSize={24} fontWeight={800}>
              Full adress after booking
            </Typography>

            <BookingAddressMap />
          </Box>
        </DetailsContainer>

        { !rentted ? <OverviewContainer variant='outlined' data-testid='bike-overview-container'>
          <Typography variant='h1' fontSize={20} marginBottom={1.25}>
            Select Date and Time
          </Typography>
          <DateRangePicker onChange={handleSelect} value={value} />
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
        : 
        <OverviewContainer variant='outlined' data-testid='bike-overview-container'>
          
          <Box display='flex-col' textAlign='center' justifyContent='space-between'>
            <Typography variant='h2' fontSize={16} marginBottom={1.25}>
              Thank you
            </Typography>

            <Typography>Your bike is booked</Typography>

            <img src={selecterUrl} width='100%' />
            
            <Typography
              variant='h1'
              fontSize={38}
              fontWeight={800}
              marginBottom={0.5}
              data-testid='bike-name-details'
            >
              {bike?.name}
            </Typography>

          </Box>


        </OverviewContainer>}
      </Content>
    </div>
  )
}

export default BikeDetails
