import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import Button from '../../components/Button';
import { Input } from '../../components/Input';
import Label from '../../components/Label';
import Styled from '../../components/Styled';
import { axios } from '../../utils/api';
import { clearToken, fetcher } from '../../utils/helpers';
export interface SettingProps {}

export default function Setting(props: SettingProps) {
  const { handleSubmit, register, reset } = useForm();
  const { data, refetch } = useQuery('SETTING', fetcher('/setting', {}));
  const { mutate, data: updatedData } = useMutation(data =>
    axios.patch('/setting', data)
  );
  useEffect(() => {
    data && reset(data);
  }, [data]);

  useEffect(() => {
    if (updatedData) {
      refetch();
    }
  }, [updatedData]);

  const onSubmit = (data: any) => {
    mutate(data);
  };
  return (
    <form className='p-2' onSubmit={handleSubmit(onSubmit)}>
      <div className='p-2'>
        <Label className='text-sm'>Quize Per Day</Label>
        <Input
          className='general-input'
          {...register('quiz_per_day', { setValueAs: i => +i })}
        />
      </div>
      <div className='p-2'>
        <Label className='text-xs'>Correct Answers To Pass A Word</Label>
        <Input
          className='general-input'
          {...register('countof_correct_answers_to_pass_word', {
            setValueAs: i => +i,
          })}
        />
      </div>
      <div className='mx-6'>
        <Button className=''>Submit</Button>
      </div>
      <div className='mx-12'>
        <LogoutButton
          onClick={() => {
            clearToken();
            window.location.reload();
          }}
        >
          Logout
        </LogoutButton>
      </div>
    </form>
  );
}
Setting.private = true;

const LogoutButton = Styled('button')`
  border
  border-red-700
  h-9
  px-5
  w-full
  text-md
  rounded-lg
  bg-gray-50
  bg-opacity-70
`;
