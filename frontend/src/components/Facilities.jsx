import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Group, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useContext } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import UserDetailContext from "../context/UserDetailContext";
import useProperties from "../hooks/useProperties";
import { createResidency } from "../utils/api";

const Facilities = ({
  prevStep,
  propertyDetails,
  setPropertyDetails,
  setOpened,
  setActiveStep,
}) => {
  const form = useForm({
    initialValues: {
      bedrooms: propertyDetails.facilities.bedrooms,
      toilets: propertyDetails.facilities.toilets,
      bathrooms: propertyDetails.facilities.bathrooms,
    },
    validate: {
      bedrooms: (value) =>
        value < 1 ? "Must have at least one bedroom" : null,
      bathrooms: (value) =>
        value < 1 ? "Must have at least one bathroom" : null,
      toilets: (value) =>
        value < 1 ? "Must have at least one toilet" : null,
    },
  });

  const { bedrooms, toilets, bathrooms } = form.values;

  const handleSubmit = () => {
    const {  errors, hasErrors } = form.validate();
    if (!hasErrors) {
      setPropertyDetails((prev) => ({
        ...prev,
        facilities: { bedrooms, toilets, bathrooms },
      }));
      mutate();
    }else{ console.log(errors) }

  };

  //   UPLOAD
  const { user } = useAuth0();
  const {
    userDetails: { token },
  } = useContext(UserDetailContext);
  const { refetch: refetchProperties } = useProperties();

  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      createResidency(
        {
          ...propertyDetails,
          facilities: { bedrooms, toilets, bathrooms },
        },
        token, user?.email
      ),
    onError: ({ response }) =>
      toast.error(response.data.message, { position: "bottom-right" }),
    onSettled: () => {
        toast.success("Added Successfully", { position: "bottom-right" });
        setPropertyDetails({
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
        });
        setOpened(false);
        setActiveStep(0);
        refetchProperties();
      },
  });

  return (
    <Box mx="auto" my={"sm"}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="flex flex-col justify-center items-center [&>*]:w-[min(100%,500px)]"
      >
        <NumberInput
          label="No of Bedrooms"
          min={0}
          {...form.getInputProps("bedrooms")}
        />
        <NumberInput
          label="No of bathrooms"
          min={0}
          {...form.getInputProps("bathrooms")}
        />
        <NumberInput
          label="No of toilets"
          min={0}
          {...form.getInputProps("toilets")}
        />

        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit" color="green" disabled={isLoading}>
            {isLoading ? "Submitting" : "Add Property"}
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default Facilities;
