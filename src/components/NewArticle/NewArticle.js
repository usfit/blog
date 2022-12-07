import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import { messageRequired } from '../Forms/formConstants';
import getResponse from '../../sevises/getResponse';

import Tags from './Tags';

import './NewArticle.scss';
import '../Forms/formStyle.scss';

function NewArticle({ token, setIsError }) {
  useEffect(() => setIsError({ error: false }), [setIsError]);
  const [success, setSuccess] = useState(false);
  const onSubmit = (data) => {
    const tagList = Object.values(data.tagList);
    data.tagList = tagList;
    const body = JSON.stringify({ article: data });
    getResponse('/articles', 'POST', body, token)
      .then(() => {
        setSuccess(true);
        setIsError(false);
      })
      .catch((err) => {
        setIsError({ error: true, message: err.message });
        setSuccess(false);
      });
  };
  const {
    register,
    handleSubmit,
    unregister,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });
  return (
    <div className="formsSign NewArticle">
      {success ? <h5 className="success">Статья успешно добавлена!</h5> : null}
      <h5 className="FormSign__title">Create new article</h5>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="formsSign__inputs">
          <label htmlFor="title">
            Title
            <input name="title" {...register('title', { required: messageRequired })} />
            <ErrorMessage
              errors={errors}
              name="title"
              render={({ message }) => <p className="formsSign__error">{message}</p>}
            />
          </label>
          <label htmlFor="description">
            Short description
            <input name="description" {...register('description', { required: messageRequired })} />
            <ErrorMessage
              errors={errors}
              name="description"
              render={({ message }) => <p className="formsSign__error">{message}</p>}
            />
          </label>
          <label htmlFor="text">
            Text
            <textarea
              className="formsSign__inputs--area"
              type="text"
              {...register('body', { required: messageRequired })}
            />
            <ErrorMessage
              errors={errors}
              name="body"
              render={({ message }) => <p className="formsSign__error">{message}</p>}
            />
          </label>
          <fieldset>
            Tags
            <Tags register={register} unregister={unregister} />
          </fieldset>
        </div>
        <input className="formsSign__buttonSubmit" type="submit" />
      </form>
    </div>
  );
}

export default NewArticle;
