import { Box, Typography } from '@mui/material'
import BikeType from 'components/BikeType';
import { OverviewContainer } from 'pages/BikeDetails/BikeDetails.styles';

interface BikeRenttedProps {
    bikeName: string | undefined
    selectedUrl: string | undefined
    bikeType: string | undefined
}

const BikeRentted = ({ bikeName, selectedUrl, bikeType }: BikeRenttedProps) => {
  return (
    <OverviewContainer variant='outlined' data-testid='bike-overview-container'>
        <Box display='flex-col' textAlign='center' justifyContent='space-between'>
        <Typography variant='h2' fontSize={16} marginBottom={1.25}>
            Thank you
        </Typography>
        <Typography>Your bike is booked</Typography>
        <img src={selectedUrl} width='100%' />
        <Typography
            variant='h2'
            fontSize={16} marginBottom={1.25}
            fontWeight={800}
            data-testid='bike-name-details'
        >
            {bikeName}
        </Typography>
        <BikeType type={bikeType} />
        </Box>
    </OverviewContainer>
  )
}

export default BikeRentted
