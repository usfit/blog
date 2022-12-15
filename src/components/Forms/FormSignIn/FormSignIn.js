import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { messageRequired, emailPattern } from '../formConstants';
import getResponse from '../../../sevises/getResponse';
import * as actions from '../../../redux/actions';

import '../formStyle.scss';

function FormSignIn({ setLog, setIsError, setUser }) {
  useEffect(() => {
    setIsError({ error: false });
  }, [setIsError]);
  const navigate = useNavigate();
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
    getResponse('users/login', 'POST', body)
      .then((ans) => {
        setUser(ans.user);
        setLog(true);
        navigate('/');
      })
      .catch((err) => {
        setIsError({ error: true, message: err.message });
      });
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
              type="password"
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

const mapDispatchToProps = (dispatch) => {
  const { setIsError, setUser, setLog } = bindActionCreators(actions, dispatch);
  return { setIsError, setUser, setLog };
};

export default connect(null, mapDispatchToProps)(FormSignIn);
