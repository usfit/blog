import React from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import getResponse from '../../sevises/getResponse';
import './DeleteModal.scss';
import modalMessage from '../../images/iconmodalmessage.svg';
import * as actions from '../../redux/actions';

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

const mapDispatchToProps = (dispatch) => {
  const { setIsError } = bindActionCreators(actions, dispatch);
  return { setIsError };
};

export default connect(null, mapDispatchToProps)(DeleteModal);
