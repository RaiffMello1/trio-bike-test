import { Box, Typography } from '@mui/material'
import BikeType from 'components/BikeType';
import { OverviewContainer } from 'pages/BikeDetails/BikeDetails.styles';

interface BikeRentedProps {
    bikeName: string | undefined
    selectedUrl: string | undefined
    bikeType: string | undefined
}

const BikeRented = ({ bikeName, selectedUrl, bikeType }: BikeRentedProps) => {
  return (
    <OverviewContainer variant='outlined' data-testid='bike-overview-container'>
        <Box display='flex-col' textAlign='center' justifyContent='space-between'>
        <Typography variant='h2' fontSize={16} marginBottom={1.25}>
            Thank you
        </Typography>
        <Typography data-testid='bike-rented'>Your bike is booked</Typography>
        <img src={selectedUrl} width='100%' />
        <Typography
            variant='h2'
            fontSize={16} marginBottom={1.25}
            fontWeight={800}
            data-testid='bike-name-details'
        >
            {bikeName}
        </Typography>
        <BikeType data-testid='bike-type' type={bikeType} />
        </Box>
    </OverviewContainer>
  )
}

export default BikeRented
