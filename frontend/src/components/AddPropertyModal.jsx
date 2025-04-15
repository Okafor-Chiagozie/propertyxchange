import { Container, Modal, Stepper } from '@mantine/core'
import React, { useState } from 'react'
import AddLocation from './AddLocation'
import { useAuth0 } from "@auth0/auth0-react"
import UploadImage from './UploadImage'
import BasicDetails from './BasicDetails'
import Facilities from './Facilities'
import PaymentOption from './PaymentOption'

const AddPropertyModal = ({ opened, setOpened }) => {

    const [active, setActive] = useState(0)
    const { user } = useAuth0()
    const [propertyDetails, setPropertyDetails] = useState({
      country: "",
      state: "",
      address: "",
      lga: "",
      image: null,
      title: "",
      description: "",
      purpose: "",
      type: "",
      dimensions: 0,
      furnished: false,
      parking: false,
      serviced: false,
      newlyBuilt: false,
      extraFeatures: "",
      facilities: {
        bedrooms: 0,
        bathrooms: 0,
        toilets: 0
      },
      price: 0,
      discountPercentage: 0,
      discountEndDate: null,
      installment: "",
      initialPayment: 0,
      installmentPayment: 0,
      installmentFrequency: "",
      userEmail: user?.email
    })

    const nextStep = () => {
        setActive((current) => (current < 5 ? current + 1 : current))
    }

    const prevStep = () => {
        setActive((current) => (current > 0 ? current - 1 : current))
    }

    return (
        <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            closeOnClickOutside
            size={"90rem"}
        >
            <Container h={"34rem"} w={"100%"}>
                <>
                    <Stepper active={active} onStepClick={setActive}>
                        <Stepper.Step label="Location" description="Address">
                            <AddLocation
                                nextStep={nextStep}
                                propertyDetails={propertyDetails}
                                setPropertyDetails={setPropertyDetails}
                            />
                        </Stepper.Step>
                        <Stepper.Step label="Image" description="Upload">
                            <UploadImage
                                prevStep={prevStep}
                                nextStep={nextStep}
                                propertyDetails={propertyDetails}
                                setPropertyDetails={setPropertyDetails}
                            />
                        </Stepper.Step>
                        <Stepper.Step label="Basics" description="Details">
                            <BasicDetails
                                prevStep={prevStep}
                                nextStep={nextStep}
                                propertyDetails={propertyDetails}
                                setPropertyDetails={setPropertyDetails}
                            />
                        </Stepper.Step>
                        <Stepper.Step label="Payment Options" description="Payment">
                            <PaymentOption
                                prevStep={prevStep}
                                nextStep={nextStep}
                                propertyDetails={propertyDetails}
                                setPropertyDetails={setPropertyDetails}
                            />
                        </Stepper.Step>
                        <Stepper.Step>
                            <Facilities
                                prevStep={prevStep}
                                propertyDetails={propertyDetails}
                                setPropertyDetails={setPropertyDetails}
                                setOpened={setOpened}
                                setActiveStep={setActive}
                            />
                        </Stepper.Step>
                        <Stepper.Completed>
                            Completed, click back button to get to previous step
                        </Stepper.Completed>
                    </Stepper>
                </>
            </Container>
        </Modal>
    )
}

export default AddPropertyModal