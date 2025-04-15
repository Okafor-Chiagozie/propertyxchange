import React from "react";
import {
  Box,
  Button,
  Checkbox,
  Group,
  NumberInput,
  Select,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { validateString } from "../utils/common";

const BasicDetails = ({
  prevStep,
  nextStep,
  propertyDetails,
  setPropertyDetails,
}) => {
  
  const form = useForm({
    initialValues: {
      title: propertyDetails.title,
      description: propertyDetails.description,
      purpose: propertyDetails.purpose,
      type: propertyDetails.type,
      dimensions: propertyDetails.dimensions,
      furnished: propertyDetails.furnished,
      parking: propertyDetails.parking,
      serviced: propertyDetails.serviced,
      newlyBuilt: propertyDetails.newlyBuilt,
      extraFeatures: propertyDetails.extraFeatures
    },
    validate: {
      title: (value) => validateString(value),
      description: (value) => validateString(value),
      purpose: (value) => validateString(value),
      type: (value) => validateString(value),
      dimensions: (value) => value !== 0 && (Number(value) < 1 ? "Must be minimum of 1 sqft " : null),
      furnished: (value) => (typeof value === "boolean" ? null : "Invalid value"),
      parking: (value) => (typeof value === "boolean" ? null : "Invalid value"),
      serviced: (value) => (typeof value === "boolean" ? null : "Invalid value"),
      newlyBuilt: (value) => (typeof value === "boolean" ? null : "Invalid value"),
      extraFeatures: (value) => {
        // If value is an empty string, don't trigger an error (optional field)
        if (value === "") return null;
        return validateString(value); // Else, apply the string validation function
      },
    },
  });

  const { title, description, purpose, type, dimensions, furnished, parking, serviced, newlyBuilt, extraFeatures } = form.values;
  const handleSubmit = () => {
    const { errors, hasErrors } = form.validate();
    if (!hasErrors) {
      setPropertyDetails((prev) => ({ ...prev, title, description, purpose, type, dimensions, furnished, parking, serviced, newlyBuilt, extraFeatures,  }));
      console.log(propertyDetails);
      nextStep();
    }else{ console.log(errors) }
  };

  return (
    <Box mx="auto" my={"md"}>
      <form onSubmit={(e)=> {
        e.preventDefault();
        handleSubmit();
      }} className="flex flex-col justify-center items-center [&>*]:w-[min(100%,500px)] ">
        <TextInput
          withAsterisk
          label="Title"
          placeholder="Property Name"
          {...form.getInputProps("title")}
        />
        <Textarea
          withAsterisk
          label="Description"
          placeholder="Description"
          autosize
          minRows={3}
          maxRows={6}
          {...form.getInputProps("description")}
        />
        <Select
          withAsterisk
          label="Purpose"
          clearable
          data={["Rent", "Sale"]}
          placeholder="For Sale or Rent"
          {...form.getInputProps("purpose")}
        />
        <Select
          withAsterisk
          label="Property Type"
          clearable
          data={["House", "Land", "Apartment"]}
          placeholder="Select Property Type"
          {...form.getInputProps("type")}
        />
        <NumberInput
          label="Dimensions (in sqft)"
          placeholder="1000"
          min={0}
          {...form.getInputProps("dimensions")}
        />
        <Group position="center" mt="lg">
          <Checkbox 
            label="Furnished"
            {...form.getInputProps("furnished", { type: "checkbox" })}
          />

          <Checkbox 
            label="Parking Space"
            {...form.getInputProps("parking", { type: "checkbox" })}
          />

          <Checkbox 
            label="Serviced"
            {...form.getInputProps("serviced", { type: "checkbox" })}
          />

          <Checkbox 
            label="Newly Built"
            {...form.getInputProps("newlyBuilt", { type: "checkbox" })}
          />
        </Group>

        <Textarea
          className="mt-2" 
          label="Extra Features"
          placeholder="Eg: Swimming Pool, Gym, Bar, Garden etc."
          autosize
          minRows={3}
          maxRows={6}
          {...form.getInputProps("extraFeatures")}
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

export default BasicDetails;
