import React, { useState } from 'react';
import { ErrorMessage as ErrorMessageHook } from '@hookform/error-message';
import { useForm } from 'react-hook-form';

import { messageRequired, emailPattern, imagePattern } from '../formConstants';

import '../formStyle.scss';

function FormProfile({ user, setUser, setIsError }) {
  const [success, setSuccess] = useState(false);
  const token = user.token;
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
  });
  const onSubmit = (data) => {
    setSuccess(false);
    if (data.image.length === 0) {
      delete data.image;
    }
    if (data.password.length === 0) {
      delete data.password;
    }
    const body = JSON.stringify({ user: data });
    fetch('https://blog.kata.academy/api/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${token}`,
      },
      body,
    })
      .then((res) => res.json())
      .then((ans) => {
        setSuccess(true);
        setUser(() => {
          return { ...user, ...ans.user };
        });
      })
      .catch((err) => {
        setIsError({ error: true, message: err.message });
        setSuccess(false);
      });
  };
  return (
    <div className="formsSign">
      {success ? <h5 className="success">Данные успешно изменены!</h5> : null}
      <h5 className="FormSign__title">Edit Profile</h5>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="formsSign__inputs">
          <label htmlFor="username">
            Username
            <input
              name="username"
              className={errors.username ? 'errorInput' : ''}
              placeholder="Username"
              defaultValue={user.username}
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
          <label htmlFor="email">
            Email address
            <input
              name="email"
              className={errors.email_address ? 'errorInput' : ''}
              placeholder="Email address"
              defaultValue={user.email}
              {...register('email', {
                required: messageRequired,
                pattern: {
                  value: emailPattern,
                  message: 'Введите корректный e-mail',
                },
              })}
            />
            <ErrorMessageHook
              errors={errors}
              name="email"
              render={({ message }) => <p className="formsSign__error">{message}</p>}
            />
          </label>
          <label htmlFor="newPassword">
            New password
            <input
              name="newPassword"
              className={errors.newPassword ? 'errorInput' : ''}
              placeholder="New password"
              {...register('password', {
                minLength: {
                  value: 6,
                  message: 'New password должен быть от 6 символов',
                },
                maxLength: {
                  value: 40,
                  message: 'New password должен быть до 40 символов (включительно)',
                },
              })}
            />
            <ErrorMessageHook
              errors={errors}
              name="password"
              render={({ message }) => <p className="formsSign__error">{message}</p>}
            />
          </label>
          <label htmlFor="avatar">
            Avatar image (url)
            <input
              name="image"
              className={errors.avatar ? 'errorInput' : ''}
              placeholder="Avatar image"
              {...register('image', {
                pattern: {
                  value: imagePattern,
                  message: 'Введите корректный url для картинки',
                },
              })}
            />
            <ErrorMessageHook
              errors={errors}
              name="image"
              render={({ message }) => <p className="formsSign__error">{message}</p>}
            />
          </label>
        </div>
        <input className="formsSign__buttonSubmit" type="submit" value="save" />
      </form>
    </div>
  );
}

export default FormProfile;
