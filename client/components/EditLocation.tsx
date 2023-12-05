import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { motion } from 'framer-motion'

import { getLocationById, updateLocation } from '../apis/api'

import type { Location } from '../../models/location'

function EditLocation() {
  const { id } = useParams<string>()
  const [locationData, setLocationData] = useState<Location>()
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  useEffect(() => {
    const fetchLocationById = async () => {
      if (id) {
        const locData = await getLocationById(Number(id))
        setLocationData(locData)
      }
    }
    fetchLocationById()
  }, [id])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Location>()

  const onSubmit: SubmitHandler<Location> = async (data: Location) => {
    await updateLocation(data)
    setIsSubmitted(true)
  }

  return (
    <>
      {isSubmitted ? (
        <motion.div
          animate={{ opacity: 1 }}
          transition={{ ease: 'easeInOut', duration: 0.4 }}
          className="success-message opacity-0"
        >
          <img className="success-icon" src="/images/success.svg" alt="" />
          <p>Location updated!</p>
        </motion.div>
      ) : locationData ? (
        <>
          <h2 className="relative font-serif text-5xl text-dd-yellow italic mb-10">
            <motion.span
              animate={{ width: 0 }}
              transition={{ ease: 'easeInOut', duration: 1 }}
              className="fade-left bg-dd-dark-purple"
            ></motion.span>
            Edit {locationData.name}
          </h2>
          <motion.form
            animate={{ opacity: 1 }}
            transition={{ ease: 'easeInOut', duration: 0.4 }}
            onSubmit={handleSubmit(onSubmit)}
            className="form opacity-0"
          >
            <input type="hidden" value={locationData.id} {...register('id')} />

            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              defaultValue={locationData.name}
              {...register('name', { required: true })}
            ></input>
            {errors.name && (
              <>
                <div></div>
                <p>This field is required</p>
              </>
            )}

            <label htmlFor="description">Description</label>
            <textarea
              rows={3}
              id="description"
              defaultValue={locationData.description}
              {...register('description', { required: true })}
            ></textarea>
            {errors.description && (
              <>
                <div></div>
                <p>This field is required</p>
              </>
            )}

            <div></div>
            <button
              type="submit"
              className="btn self-center rounded-md border border-dd-yellow/50 hover:border-dd-yellow font-serif text-dd-gold hover:text-dd-yellow px-10 py-2"
            >
              Update event
            </button>
          </motion.form>
        </>
      ) : (
        <p>Loading form</p>
      )}
    </>
  )
}

export default EditLocation
