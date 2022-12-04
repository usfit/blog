import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import { messageRequired, emailPattern } from '../formConstants';

import '../formStyle.scss';

function FormSignIn() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
  });
  const onSubmit = (data) => {
    const loginInfo = { user: { ...data } };
    const body = JSON.stringify(loginInfo);
    console.log(body);
    fetch('https://blog.kata.academy/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Произошла ошибка, статус ${res.status}`);
        }
        return res.json();
      })
      .then((ans) => console.log(ans))
      .catch((err) => console.log(err));
  };
  return (
    <div className="formsSign">
      <h5 className="FormSign__title">Sign In</h5>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="formsSign__inputs">
          <label htmlFor="email">
            Email address
            <input
              className={errors.email ? 'errorInput' : ''}
              name="email"
              placeholder="Email address"
              {...register('email', {
                required: messageRequired,
                pattern: {
                  value: emailPattern,
                  message: 'Введите корректный e-mail',
                },
              })}
            />
          </label>
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => <p className="formsSign__error">{message}</p>}
          />
          <label htmlFor="password">
            Password
            <input
              className={errors.password ? 'errorInput' : ''}
              name="password"
              placeholder="Password"
              {...register('password', {
                required: messageRequired,
              })}
            />
          </label>
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => <p className="formsSign__error">{message}</p>}
          />
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
