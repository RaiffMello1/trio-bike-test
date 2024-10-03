import { render, screen } from '@testing-library/react'
import { mockedImageUrls } from 'mocks/Bike'
import BikeImageSelector from '.'

describe('BikeImageSelector component', () => {
  const handleSelectedUrl = jest.fn()
  beforeEach(() => {
    render(<BikeImageSelector imageUrls={mockedImageUrls} handleSelectedUrl={handleSelectedUrl}/>)
  })

  it('should has an images list to select', () => {
    const listElement = screen.getByTestId('bike-images-list')
    expect(listElement).toBeInTheDocument()
  })

  it('should has a bigger image selected', () => {
    const imageElement = screen.getByTestId('bike-selected-image')
    expect(imageElement).toBeInTheDocument()
  })
})
