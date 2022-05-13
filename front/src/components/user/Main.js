import React, { Component, useState, useEffect } from 'react';

import SectionHome from './SectionHome';
import SectionMain from './SectionMain';
import Header from '../Header';

import * as Api from '../../api';
import LoginForm from './LoginForm';
import RegisterForm from './register/RegisterForm';

function Main() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  const handleCloseRegister = () => setShowRegister(false);
  const handleShowRegister = () => setShowRegister(true);

  return (
    <>
      <Header showLogin={handleShowLogin} showRegister={handleShowRegister} />
      <SectionMain />
      <SectionHome />
      <LoginForm
        show={showLogin}
        showRegister={handleShowRegister}
        handleClose={handleCloseLogin}
      />
      <RegisterForm
        show={showRegister}
        handleClose={handleCloseRegister}
      ></RegisterForm>
    </>
  );
}

export default Main;
