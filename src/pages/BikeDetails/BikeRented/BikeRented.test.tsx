import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { mockedBike } from 'mocks/Bike'
import BikeRented from './BikeRented'

describe('BikeRented component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <BikeRented bikeName={mockedBike.name} selectedUrl={mockedBike.imageUrls[0]} bikeType={mockedBike.type} />
      </BrowserRouter>,
    )
  })
  it('should has the booked message', () => {
    const typographyElement = screen.getByTestId('bike-rented')
    expect(typographyElement).toBeInTheDocument()
  })

  it('should has the bike name', () => {
    const typographyElement = screen.getByTestId('bike-name-details')
    expect(typographyElement).toBeInTheDocument()
  })

  it('should has the bike type', () => {
    const typographyElement = screen.getByTestId('bike-type')
    expect(typographyElement).toBeInTheDocument()

  })
})
