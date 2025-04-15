import React from 'react'
import { useForm } from "@mantine/form"
import { validateString } from '../utils/common'
import { Button, Group, Select, TextInput } from '@mantine/core'
import useCountries from '../hooks/useCountries'
import Map from './Map'

const AddLocation = ({ propertyDetails, setPropertyDetails, nextStep }) => {
  const { getAll } = useCountries()
  const form = useForm({
    initialValues: {
      country: "Nigeria",
      state: propertyDetails?.state,
      address: propertyDetails?.address,
      lga: propertyDetails?.lga
    },
    validate: {
      country: (value) => validateString(value),
      state: (value) => validateString(value),
      address: (value) => validateString(value),
      lga: (value) => validateString(value),
    }
  })

  const { country, state, address, lga } = form.values

  const handleSubmit = () => {
    const { hasErrors } = form.validate()
    if (!hasErrors) {
      setPropertyDetails((prev) => ({ ...prev, country, state, address, lga }))
      nextStep()
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
    >
      <div className='flex flex-col md:flex-row'>
        {/* LEFT SIDE */}
        <div className='flexCenter flex-1 [&>*]:w-[min(100%,500px)]'>
          {/* INPUTS */}
          <div className='mr-4'>
            <Select
              w={"100%"}
              withAsterisk
              label="Country"
              clearable
              searchable
              data={getAll()}
              placeholder='Select country'
              disabled
              {...form.getInputProps("country", { type: "input" })}
            />
            <TextInput
              w={"100%"}
              withAsterisk
              label="State"
              placeholder='State of property'
              {...form.getInputProps("state", { type: "input" })}
            />
            <TextInput
              w={"100%"}
              withAsterisk
              label="Address"
              placeholder='Address of property'
              {...form.getInputProps("address", { type: "input" })}
            />
            <TextInput
              w={"100%"}
              withAsterisk
              label="Local Goverment Area"
              placeholder='(LGA) Local Goverment Area'
              {...form.getInputProps("lga", { type: "input" })}
            />
          </div>
        </div>
        {/* RIGHT SIDE */}
        <div className='flex-1'>
          <Map address={address} state={state} country={country} lga={lga} />
        </div>
      </div>
      <Group justify='center' mt={'xl'}>
        <Button type='submit'>Next Step</Button>
      </Group>
      <br /><br />
    </form>
  )
}

export default AddLocation