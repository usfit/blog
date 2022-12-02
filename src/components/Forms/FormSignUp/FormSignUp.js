import React from 'react';
import { Checkbox, Divider } from 'antd';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function FormSignUp() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <div className="formsSign">
      <h5 className="FormSign__title">Create new account</h5>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="formsSign__inputs">
          <label htmlFor="username">
            Username
            <input name="username" placeholder="username" {...register('username')} />
          </label>
          <label htmlFor="email_address">
            Email_address
            <input name="email_address" placeholder="email_address" {...register('email_address')} />
          </label>
          <label htmlFor="password">
            Password
            <input name="password" placeholder="password" {...register('password')} />
          </label>
          <label htmlFor="repeat_Password">
            Repeat_Password
            <input name="repeat_Password" placeholder="repeat_Password" {...register('repeat_Password')} />
          </label>
        </div>
        <Divider />
        <Checkbox>I agree to the processing of my personal information</Checkbox>
        <input className="formsSign__buttonSubmit" type="submit" />
      </form>
      <p className="formLink">
        Already have an account?
        <Link to="/sign-in"> Sign In.</Link>
      </p>
    </div>
  );
}

export default FormSignUp;
