import React from 'react';
import Header from './Header';
import Sidebar from './account/Sidebar';
import Footer from './Footer';

import "../assets/css/layout/layout.css";

const LayoutAccount = ({children}) => {
  return (
    <>
      <Header />
      <div className={"wrapper"}>
        <Sidebar />
        <div className={"content"}>
          {children}
          <Footer />
        </div>
      </div>
      
    </>
  );
};

export default LayoutAccount;