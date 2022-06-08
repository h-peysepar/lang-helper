import * as React from 'react';
import { useForm } from 'react-hook-form';
import Label from '../../components/Label';
export interface SettingProps {}

export default function Setting(props: SettingProps) {
  const { handleSubmit, register, setValue } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <form className="p-2" onSubmit={handleSubmit(onSubmit)}>
      <div className="p-2">
        <Label className="text-sm">Quize Per Day</Label>
        <input
          className="general-input"
          {...register('quiz_per_day', { setValueAs: i => +i })}
        />
      </div>
      <div className="p-2">
        <Label className="text-xs">Correct Answers To Pass A Word</Label>
        <input
          className="general-input"
          {...register('countof_correct_answers_to_pass_word', {
            setValueAs: i => +i,
          })}
        />
      </div>
      <button className="button">Submit</button>
      <button
        onClick={() => {
          localStorage.clear();
          window.location.reload();
        }}
        className="border border-red-700 block py-3 px-5 w-full font-bold text-xl rounded-lg bg-gray-50 bg-opacity-95 "
      >
        Logout
      </button>
    </form>
  );
}
Setting.private = true;