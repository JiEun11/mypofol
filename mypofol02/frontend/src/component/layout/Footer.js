import React from 'react';
import '../../assets/css/layout/Footer.css';

const Footer = () => {
  return (
    <div className={'footer'}>
      <div className={'content-inner'}>
        <div className={'row align-items-center'}>
          <div className={'col-md-6'}>
            <p>
              &copy;{' Copyright 2023 '}
              <a href='https://github.com/JiEun11'>Bella Jin</a>
              {'All Rights Reserved'}
            </p>
          </div>
          <div className='col-md-6'>
            <p>
              {'Powered by '}
              <a href='https://github.com/JiEun11'>Bella Jin</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
