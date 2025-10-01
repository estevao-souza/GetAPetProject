// CSS
import './PetForm.css'

// Utils
import { uploads } from '../../utils/config'

// Hooks
import { useState, useEffect, useRef } from 'react'

// Components
import Input from '../Input/Input'
import Select from '../../components/Form/Select'

const PetForm = ({
  handleSubmit,
  sendPhotoTypeErrorMessage,
  petData,
  buttonText,
  loading,
}) => {
  const [formPet, setFormPet] = useState({})
  const [photos, setPhotos] = useState([])
  const [previewPhotos, setPreviewPhotos] = useState([])
  const photoRef = useRef(null)
  const types = ['Dog', 'Cat']

  // Load Pet Form Data after Any Pet Data Change
  useEffect(() => {
    setFormPet(JSON.parse(JSON.stringify(petData || {}))) // Deep Copy of Object
    setPreviewPhotos([])
  }, [petData])

  // Handle Every Form Field Change
  const handleOnChange = (e) => {
    setFormPet({ ...formPet, [e.target.name]: e.target.value })
  }

  // Handle Pet Type
  const handlePetType = (e) => {
    const selected = e.target.options[e.target.selectedIndex].text

    // Set Pet Type Only If An Option is Selected
    if (selected && selected.trim() !== 'Select an option') {
      setFormPet((formPet) => ({
        ...formPet,
        type: selected,
      }))
    }
  }

  // Handle Pet Photo Files
  const handlePhotoFiles = (e) => {
    // Get Photos
    const photos = e.target.files

    // Check if there are Photos
    if (!photos) {
      setPreviewPhotos([])
      setPhotos([])
      return
    }

    // Validate Photos Format
    const photosArray = Array.from(photos)
    const validExtensions = ['.jpg', '.png']

    const hasInvalidExtension = photosArray.some((photo) => {
      const filename = photo.name.toLowerCase()
      const fileExtension = filename.substring(filename.lastIndexOf('.'))
      return !validExtensions.includes(fileExtension)
    })

    if (hasInvalidExtension) {
      // Call Send Error Message Method
      sendPhotoTypeErrorMessage()

      // Clean Photo Ref
      if (photoRef.current) {
        photoRef.current.value = ''
      }

      return
    }

    // Photos Preview
    setPreviewPhotos(photosArray)

    // Update Pet Photos
    setPhotos(photos)
  }

  // Call Submit Method
  const submit = async (e) => {
    e.preventDefault()

    // Check Pet Photos
    if (photos && photos.length > 0) {
      formPet.photos = photos
    }

    // Build Form Data
    const formData = new FormData()
    Object.keys(formPet).forEach((key) => {
      if (key === 'photos') {
        for (let i = 0; i < formPet[key].length; i++) {
          formData.append(key, formPet[key][i])
        }
      } else {
        formData.append(key, formPet[key])
      }
    })

    handleSubmit(formData)
  }

  return (
    <div className="petForm">
      <div className="pet-images-preview">
        {previewPhotos.length > 0
          ? previewPhotos.map((photo, index) => (
              <img
                src={URL.createObjectURL(photo)}
                alt={formPet.name}
                key={`${index}`}
              />
            ))
          : Array.isArray(formPet.photos) &&
            formPet.photos.map((photo, index) => (
              <img
                src={`${uploads}/pets/${photo}`}
                alt={formPet.name}
                key={`${index}`}
              />
            ))}
      </div>
      <form onSubmit={submit} className="form-container">
        <Input
          text="Pet Photos"
          type="file"
          name="photos"
          handleOnChange={handlePhotoFiles}
          multiple={true}
          ref={photoRef}
        />
        <Input
          text="Pet Name"
          type="text"
          name="name"
          placeholder="Type the pet's name"
          handleOnChange={handleOnChange}
          value={formPet.name || ''}
        />
        <Input
          text="Pet Age"
          type="text"
          name="age"
          placeholder="Type the pet's age"
          handleOnChange={handleOnChange}
          value={formPet.age || ''}
        />
        <Input
          text="Pet Weight"
          type="text"
          name="weight"
          placeholder="Type the pet's weight"
          handleOnChange={handleOnChange}
          value={formPet.weight || ''}
        />
        <Select
          text="Select the type of pet"
          name="type"
          options={types}
          handleOnChange={handlePetType}
          value={formPet.type || ''}
        />
        {!loading && <input type="submit" value={buttonText} />}
        {loading && <input type="submit" value="Wait..." disabled />}
      </form>
    </div>
  )
}

export default PetForm
