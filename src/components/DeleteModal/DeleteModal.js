import React from 'react';
import { useNavigate } from 'react-router-dom';

import getResponse from '../../sevises/getResponse';

import './DeleteModal.scss';
import modalMessage from './iconmodalmessage.svg';

function DeleteModal({ isHide, setIsHide, setIsError, slug, token }) {
  const navigate = useNavigate();
  const handleClickOnDelete = () => {
    getResponse(`/articles/${slug}`, 'DELETE', null, token)
      .then(() => navigate('/'))
      .catch((err) => setIsError({ error: true, message: err.message }));
  };
  return (
    <div className={isHide ? 'Modal hide' : 'Modal'}>
      <div className="main-block DeleteModal">
        <div className="DeleteModal__Message">
          <img src={modalMessage} alt="iconModal" />
          <p className="DeleteModal__text">Are you sure to delete this article?</p>
        </div>
        <div className="DeleteModal__Buttons">
          <input className="inputButton" type="button" value="No" onClick={() => setIsHide(true)} />
          <input className="inputButton Yes" type="button" value="Yes" onClick={() => handleClickOnDelete()} />
        </div>
      </div>
      <div className="DeleteModal__Arrow" />
    </div>
  );
}

export default DeleteModal;
