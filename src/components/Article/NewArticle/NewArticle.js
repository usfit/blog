import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useLocation, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { messageRequired } from '../../Forms/formConstants';
import getResponse from '../../../sevises/getResponse';
import Tags from '../Tags';
import * as actions from '../../../redux/actions';

import '../../Forms/formStyle.scss';

function NewArticle({ token, setIsError }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isEditing] = useState(!!location.state);

  const { title, description, body, slug, tagList } = isEditing ? location.state.article : '';

  const articleData = isEditing
    ? {
        url: `/articles/${slug}`,
        method: 'PUT',
        titlePage: 'Edit article',
        path: `/articles/${slug}`,
      }
    : {
        url: '/articles',
        method: 'POST',
        titlePage: 'Create new article',
        path: '/',
      };

  const onSubmit = (data) => {
    const newTagList = Object.values(data.tagList);
    data.tagList = newTagList;
    const newBody = JSON.stringify({ article: data });
    getResponse(articleData.url, articleData.method, newBody, token)
      .then(() => {
        setIsError(false);
        navigate(articleData.path);
      })
      .catch((err) => {
        setIsError({ error: true, message: err.message });
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
      <h5 className="FormSign__title">{articleData.titlePage}</h5>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="formsSign__inputs">
          <label htmlFor="title">
            Title
            <input name="title" defaultValue={title} {...register('title', { required: messageRequired })} />
            <ErrorMessage
              errors={errors}
              name="title"
              render={({ message }) => <p className="formsSign__error">{message}</p>}
            />
          </label>
          <label htmlFor="description">
            Short description
            <input
              name="description"
              defaultValue={description}
              {...register('description', { required: messageRequired })}
            />
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
              defaultValue={body}
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
            <Tags register={register} unregister={unregister} tagList={tagList} />
          </fieldset>
        </div>
        <input className="formsSign__buttonSubmit" type="submit" />
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  const token = state.user.token;
  return { token };
};

const mapDispatchToProps = (dispatch) => {
  const { setIsError } = bindActionCreators(actions, dispatch);
  return { setIsError };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewArticle);
