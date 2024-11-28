import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { mockedBike } from 'mocks/Bike'
import RentPicker from './RentPicker'


describe('RentPicker page', () => {
  const setRented = jest.fn()
  beforeEach(() => {
    render(
      <BrowserRouter>
        <RentPicker rateByDay={100} servicesFee={10} total={5} bikeId={mockedBike.id} setRented={setRented}  />
      </BrowserRouter>,
    )
  })

  it('should has the rent amount element', () => {
    const rentElement = screen.getByTestId('bike-rent-ammount')
    expect(rentElement).toBeInTheDocument()
  })

  it('should has the bike fee element', () => {
    const feeElement = screen.getByTestId('bike-fee')
    expect(feeElement).toBeInTheDocument()
  })

  it('should has the bike total element', () => {
    const totalElement = screen.getByTestId('bike-total')
    expect(totalElement).toBeInTheDocument()
  })
  
})

