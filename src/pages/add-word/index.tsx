import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from 'react-query';
import ErrorMessage from "../../components/errorMessage";
import Label from "../../components/Label";
import { axios } from '../../utils/api';
export interface AddFormProps {
  getDefaultDefinition: Function 
  defaultDefinition: string
  addWord: Function
}

export default function AddForm (props: AddFormProps) {
  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = useForm();
  const {mutate} = useMutation(data => axios.post('/words', data))
  const onSubmit = (data: object) => mutate(data);
  useEffect(()=>{
    setValue('defaultDefinition', props.defaultDefinition)
  },[props.defaultDefinition])
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-3">
    <div className="mb-6">
      <Label>Word</Label>
      <input
        className="general-input"
        {...(function () {
          const { onChange, ...methods } = register("word", {
            required: "Please Enter The Word",
          });
          return {
            onChange: (e: any) => {
              if(e.target.value.trim())
                // props.getDefaultDefinition(e.target.value);
              onChange(e);
            },
            ...methods,
          };
        })()}
      />
      <ErrorMessage>{errors.word?.message}</ErrorMessage>
    </div>
    <div className="mb-6">
      <Label>Translate</Label>
      <input {...register('defaultDefinition')} className="general-input" />
      <ErrorMessage>{""}</ErrorMessage>
    </div>
    <div className="mb-6">
      <Label>Custom Definition</Label>
      <input {...register('definition')} className="general-input" />
      <ErrorMessage>{""}</ErrorMessage>
    </div>
    <div className="mx-10">
      <button className="button">Add The Word</button>
    </div>
  </form>
  );
}