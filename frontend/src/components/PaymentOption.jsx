import React from "react";
import {
  Box,
  Button,
  Group,
  NumberInput,
  Select,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { validateString } from "../utils/common";

const PaymentOption = ({
  prevStep,
  nextStep,
  propertyDetails,
  setPropertyDetails,
}) => {
  
  const form = useForm({
    initialValues: {
      price: propertyDetails.price,
      discountPercentage: propertyDetails.discountPercentage,
      discountEndDate: propertyDetails.discountEndDate,
      installment: propertyDetails.installment,
      initialPayment: propertyDetails.initialPayment,
      installmentPayment: propertyDetails.installmentPayment,
      installmentFrequency: propertyDetails.installmentFrequency,
    },
    validate: {
      price: (value) => (value < 1000 ? "Must be minimum of 1000 naira" : null),
      discountPercentage: (value) => value !== 0 && (value < 1 ? "Must be minimum of 1%" : null),
      discountEndDate: (value) => value,
      installment: (value) => validateString(value),
      initialPayment: (value) => value !== 0 && (value < 1000 ? "Must be minimum of 1000 naira" : null),
      installmentPayment: (value) => value !== 0 && (value < 1000 ? "Must be minimum of 1000 naira" : null),
      installmentFrequency: (value) => {
        // If value is an empty string, don't trigger an error (optional field)
        if (value === "") return null;
        return validateString(value); // Else, apply the string validation function
      },
    },
  });

  const { price, discountPercentage, discountEndDate, installment, initialPayment, installmentPayment, installmentFrequency  } = form.values;
  const handleSubmit = () => {
    const { errors, hasErrors } = form.validate();
    if (!hasErrors) {
      setPropertyDetails((prev) => ({ ...prev, price, discountPercentage, discountEndDate, installment, initialPayment, installmentPayment, installmentFrequency }));
      console.log(propertyDetails);
      nextStep();
    }else{ console.log(errors) }
  };

  return (
    <Box mx="auto" my={"md"}>
      <form onSubmit={(e)=> {
        e.preventDefault();
        handleSubmit();
      }} className="flex flex-col justify-center items-center [&>*]:w-[min(100%,500px)]">
        
        <NumberInput
          withAsterisk
          label="Price"
          placeholder="1000"
          min={0}
          {...form.getInputProps("price")}
        />
        <NumberInput
          label="Discount Percentage"
          placeholder="10"
          min={0}
          {...form.getInputProps("discountPercentage")}
        />
        <TextInput
          label="Discount End Date"
          placeholder="Select Date"
          {...form.getInputProps("discountEndDate")}
        />
        <Select
          withAsterisk
          label="Pay On Installment"
          clearable
          data={["Allowed", "Not Allowed"]}
          placeholder="Allowed or Not Allowed"
          {...form.getInputProps("installment")}
        />
        <NumberInput
          label="Initial Payment"
          placeholder="1000"
          min={0}
          {...form.getInputProps("initialPayment")}
        />
        <NumberInput
          label="Installment Payment"
          placeholder="1000"
          min={0}
          {...form.getInputProps("installmentPayment")}
        />
        <Select
          label="Installment Frequency"
          clearable
          data={["Daily", "Weekly", "Monthly", "Yearly"]}
          placeholder="Set installment frequency"
          {...form.getInputProps("installmentFrequency")}
        />


        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit">Next</Button>
        </Group>
        <br /><br />
      </form>
    </Box>
  );
};

export default PaymentOption;
