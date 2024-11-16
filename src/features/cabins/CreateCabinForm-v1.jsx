import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";

import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";

import { toast } from "react-hot-toast";

import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();

  console.log(getValues().image);

  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: createCabin,

    onSuccess: () => {
      toast("Cabin has been created successfully");

      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });

      reset();
    },

    onError: () => {
      toast("Something went wrong");
    },
  });

  const { errors } = formState;

  function onSubmit(data) {
    console.log(data);
    mutate({ ...data, image: data.image[0] });
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label={"name"} error={errors.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "Name is required",
          })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow label="maxCapacity" error={errors.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "Max capacity is required",

            validate: (value) => {
              return (
                (value >= 2 && value <= 5) || "Capacity must be between 2 and 5"
              );
            },
          })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow label="regularPrice" error={errors.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "Regular price is required",
          })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow label="discount" error={errors.discount?.message}>
        <Input
          type="number"
          id="discount"
          {...register("discount", {
            required: "Discount is required",

            validate: (value) => {
              console.table(typeof value, typeof getValues().regularPrice);

              const compute =
                (Number(value) >= 0 &&
                  Number(value) <= Number(getValues().regularPrice)) ||
                "Discount must be between 0 and regular price";

              console.log(compute);

              return compute;
            },
          })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow label="description" error={errors.description?.message}>
        <Input
          type="text"
          id="description"
          {...register("description", {
            required: "Description is required",
          })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow label="Cabin Photo" error={errors.image?.message}>
        <FileInput
          {...register("image", {
            required: "Image is required",
          })}
          disabled={isLoading}
          onChaange={(e) => {
            console.log(e.target.files[0]);
          }}
          id="image"
          accept="image/*"
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isLoading}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;

// we didnt make the inputs controlled

// we gotta register the inputs with react-hook-form
