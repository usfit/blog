import React, { useState, useEffect } from 'react';
import { Divider } from 'antd';
import { Link } from 'react-router-dom';
import { ErrorMessage as ErrorMessageHook } from '@hookform/error-message';
import { useForm } from 'react-hook-form';

import { messageRequired, emailPattern } from '../formConstants';
import getResponse from '../../../sevises/getResponse';

import '../formStyle.scss';

function FormSignUp({ setIsError }) {
  const [success, setSuccess] = useState(false);
  useEffect(() => setIsError({ error: false }), [setIsError]);
  let userInfo = null;
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    userInfo = { user: { username: data.username, email: data.email_address, password: data.password } };
    const body = JSON.stringify(userInfo);
    getResponse('users', 'POST', body)
      .then(() => {
        setSuccess(true);
        setIsError({ error: false });
      })
      .catch((err) => {
        setIsError({ error: true, message: err.message });
        setSuccess(false);
      });
  };

  return (
    <div className="formsSign">
      {success ? (
        <h5 className="success">
          <Link to="/sign-in"> Регистрация прошла успешно! Войти </Link>
        </h5>
      ) : null}
      <h5 className="FormSign__title">Create new account</h5>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="formsSign__inputs">
          <label htmlFor="username">
            Username
            <input
              className={errors.username ? 'errorInput' : ''}
              name="username"
              placeholder="Username"
              {...register('username', {
                required: messageRequired,
                minLength: {
                  value: 3,
                  message: 'username должен быть от 3 символов',
                },
                maxLength: {
                  value: 20,
                  message: 'username должен быть до 20 символов (включительно)',
                },
              })}
            />
            <ErrorMessageHook
              errors={errors}
              name="username"
              render={({ message }) => <p className="formsSign__error">{message}</p>}
            />
          </label>
          <label htmlFor="email_address">
            Email address
            <input
              className={errors.email_address ? 'errorInput' : ''}
              name="email_address"
              placeholder="Email address"
              {...register('email_address', {
                required: messageRequired,
                pattern: {
                  value: emailPattern,
                  message: 'Введите корректный e-mail',
                },
              })}
            />
            <ErrorMessageHook
              errors={errors}
              name="email_address"
              render={({ message }) => <p className="formsSign__error">{message}</p>}
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              className={errors.password ? 'errorInput' : ''}
              name="password"
              placeholder="Password"
              {...register('password', {
                required: messageRequired,
                minLength: {
                  value: 6,
                  message: 'password должен быть от 6 символов',
                },
                maxLength: {
                  value: 40,
                  message: 'password должен быть до 40 символов (включительно)',
                },
              })}
            />
          </label>
          <ErrorMessageHook
            errors={errors}
            name="password"
            render={({ message }) => <p className="formsSign__error">{message}</p>}
          />
          <label htmlFor="repeat_password">
            Repeat Password
            <input
              className={errors.repeat_password ? 'errorInput' : ''}
              name="repeat_password"
              placeholder="Repeat Password"
              {...register('repeat_password', {
                required: messageRequired,
                validate: (e) => e === getValues('password') || 'Passwords must match',
              })}
            />
          </label>
          <ErrorMessageHook
            errors={errors}
            name="repeat_password"
            render={({ message }) => <p className="formsSign__error">{message}</p>}
          />
        </div>
        <Divider />
        <label htmlFor="personal_info" className="formsSign__personalInfo">
          <input
            type="checkbox"
            name="personal_info"
            id="personal_info"
            {...register('personal_info', { required: 'Вы должны согласиться с обработкой персональных данных' })}
          />
          I agree to the processing of my personal information
        </label>
        <ErrorMessageHook
          errors={errors}
          name="personal_info"
          render={({ message }) => <p className="formsSign__error">{message}</p>}
        />
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
