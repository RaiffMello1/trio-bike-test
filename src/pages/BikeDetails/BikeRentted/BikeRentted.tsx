import { Box, Typography } from '@mui/material'
import { OverviewContainer } from 'pages/BikeDetails/BikeDetails.styles';

interface BikeRenttedProps {
    bikeName: string | undefined
    selecterUrl: string | undefined
}

const BikeRentted = ({ bikeName, selecterUrl }: BikeRenttedProps) => {
  return (
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
            {bikeName}
        </Typography>
        </Box>
    </OverviewContainer>
  )
}

export default BikeRentted
