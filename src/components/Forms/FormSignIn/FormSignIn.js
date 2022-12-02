import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import './FormSignIn.scss';

function FormSignIn() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <div className="formsSign">
      <h5 className="FormSign__title">Sign In</h5>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="formsSign__inputs">
          <label htmlFor="email_address">
            Email address
            <input name="email_address" placeholder="Email address" {...register('email_adress')} />
          </label>
          <label htmlFor="Password">
            Password
            <input name="Password" placeholder="Password" {...register('Password')} />
          </label>
        </div>
        <input className="formsSign__buttonSubmit" type="submit" />
      </form>
      <p className="formLink">
        Don’t have an account?
        <Link to="/sign-up"> Sign Up</Link>
      </p>
    </div>
  );
}

export default FormSignIn;
