import React, { ChangeEvent, useEffect, useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
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
    control,
    reset,
  } = useForm();

  const {
    mutate,
    isLoading: storeWordLoading,
    data,
  } = useMutation(data => axios.post('/words', data));

  useEffect(() => {
    data && reset();
  }, [data]);

  const onSubmit = (data: object) => mutate(data);

  const components = useMemo(
    () => ({
      Definition({}) {
        const word = useWatch({ control, name: 'word' });
        const {
          mutate: getDefaultDefinition,
          data: definition,
          isLoading,
        } = useMutation(word => axios.get('/default-definition/' + word));
        useEffect(() => {
          word ? getDefaultDefinition(word) : setValue('defaultDefinition', '');
        }, [word]);
        useEffect(() => {
          setValue('defaultDefinition', definition?.data?.data || '');
        }, [definition]);
        return (
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
        );
      },
    }),
    []
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='p-3'>
      <div className='mb-4'>
        <Label>Word</Label>
        <Input
          className='general-input'
          {...register('word', {
            required: 'Please Enter The Word',
          })}
        />
        <ErrorMessage>{errors.word?.message}</ErrorMessage>
      </div>
      <components.Definition />
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
