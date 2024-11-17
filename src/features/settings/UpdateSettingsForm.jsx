import styled from "styled-components";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useForm } from "react-hook-form";

import useSettings from "./useSettings";

import useUpdateSettings from "./useUpdateSettings";

import Button from "../../ui/Button";

import Spinner from "../../ui/Spinner";


function UpdateSettingsForm() {
  const { data: settings, isLoading, error } = useSettings();

  const { isUpdating, mutate } = useUpdateSettings();

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: {
      minBookingLength: settings?.minBookingLength,
      maxBookingLength: settings?.maxBookingLength,
      maxGuestsPerBooking: settings?.maxGuestsPerBooking,
      breakfastPrice: settings?.breakfastPrice,
    },
  });

  const { errors } = formState;

  function onError(errors) {
    console.log(errors);
  }

  function handleOnBlur(key,value)
  {

     mutate({[key]:value})

  }


  if(isLoading)
    return <Spinner />



  return (
    <Form>
      <FormRow
        label="Minimum nights/booking"
        error={errors.minBookingLength?.message}
      >
        <Input
          {...register("minBookingLength", {
            required: false,

            validate: (value) => {
              return (
                (Number(value) > 0 &&
                  Number(value) <= Number(getValues("maxBookingLength"))) ||
                "Minimum nights must be greater than 0 and less than maximum nights"
              );
            },
          })}
          type="number"
          id="min-nights"
          onBlur={(e) => handleOnBlur("minBookingLength",e.target.value)}
        />
      </FormRow>
      <FormRow
        label="Maximum nights/booking"
        error={errors.maxBookingLength?.message}
      >
        <Input
          {...register("maxBookingLength", {
            required: false,
            validate: (value) => {
              return (
                Number(value) >= Number(getValues("minBookingLength")) ||
                "Maximum nights must be greater than or equal to minimum nights"
              );
            },
          })}
          type="number"
          id="max-nights"
          onBlur={(e) => handleOnBlur("maxBookingLength",e.target.value)}
        />
      </FormRow>
      <FormRow
        label="Maximum guests/booking"
        error={errors.maxGuestsPerBooking?.message}
      >
        <Input
          {...register("maxGuestsPerBooking", {
            required: false,
          })}
          type="number"
          id="max-guests"
          onBlur={(e) => handleOnBlur("maxGuestsPerBooking",e.target.value)}
        />
      </FormRow>
      
      <FormRow label="Breakfast price" error={errors.breakfastPrice?.message}>
        <Input
          {...register("breakfastPrice", {
            required: false,
          })}
          type="number"
          id="breakfast-price"
          onBlur={(e) => handleOnBlur("breakfastPrice",e.target.value)}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;


// the blur event is triggered when an element loses focus