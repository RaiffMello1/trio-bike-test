import { useState } from 'react'
import BikeImageSelector from './BikeImageSelector.component'

interface BikeImageSelectorProps {
  imageUrls: string[]
  handleSelectedUrl: (imageUrl: string) => void
}

const BikeImageSelectorContainer = ({ imageUrls, handleSelectedUrl }: BikeImageSelectorProps) => {
  const [selectedImageUrl, setSelectedImageUrl] = useState(imageUrls[0])
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const handleSelectImage = (imageUrl: string, index: number) => {
    setSelectedImageUrl(imageUrl)
    setSelectedImageIndex(index)
    handleSelectedUrl(imageUrl)
  }

  const handleIsImageLoaded = (isLoading: boolean) => {
    setIsImageLoaded(isLoading)
  }

  return (
    <BikeImageSelector
      selectedImageUrl={selectedImageUrl}
      selectedImageIndex={selectedImageIndex}
      isImageLoaded={isImageLoaded}
      handleIsImageLoaded={handleIsImageLoaded}
      imageUrls={imageUrls}
      handleSelectImage={handleSelectImage}
    />
  )
}

export default BikeImageSelectorContainer
