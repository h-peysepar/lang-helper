import React, { ChangeEvent, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import Button from '../../components/Button';
import ErrorMessage from '../../components/errorMessage';
import { Input } from '../../components/Input';
import Label from '../../components/Label';
import Loading from '../../components/Loading';
import { axios } from '../../utils/api';
export interface AddFormProps {}

export default function AddForm(props: AddFormProps) {
  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = useForm();

  const { mutate, isLoading: storeWordLoading } = useMutation(data => axios.post('/words', data));
  const { mutate: getDefaultDefinition, data: definition, isLoading } = useMutation(word =>
    axios.get('/default-definition/' + word)
  );

  useEffect(() => {
    setValue('defaultDefinition', definition?.data?.data);
  }, [definition]);
  const onSubmit = (data: object) => mutate(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='p-3'>
      <div className='mb-4'>
        <Label>Word</Label>
        <Input
          className='general-input'
          {...(function () {
            const { onChange, ...methods } = register('word', {
              required: 'Please Enter The Word',
            });
            return {
              onChange: (e: any) => {
                if (e.target.value.trim()) getDefaultDefinition(e.target.value)
                else {
                  setValue('defaultDefinition', '')
                }
                onChange(e);
              },
              ...methods,
            };
          })()}
        />
        <ErrorMessage>{errors.word?.message}</ErrorMessage>
      </div>
      <div className='mb-4'>
        <Label>Translate</Label>
        <span className='relative'>
          {isLoading && <Loading />}
          <Input
            {...register('defaultDefinition')}
            disabled
            className='general-input'
          />
        </span>
        <ErrorMessage>{''}</ErrorMessage>
      </div>
      <div className='mb-4'>
        <Label>Custom Definition</Label>
        <Input {...register('definition')} className='general-input' />
        <ErrorMessage>{''}</ErrorMessage>
      </div>
      <div className='mx-20'>
        <Button isLoading={storeWordLoading}>Add The Word</Button>
      </div>
    </form>
  );
}
