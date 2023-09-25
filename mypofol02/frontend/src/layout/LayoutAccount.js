import React from 'react';
import Header from './Header';
import Sidebar from './SidebarAccount';
import Footer from './Footer';

import "../assets/css/layout/LayoutAccount.css";

const LayoutAccount = ({ children }) => {
  
  useEffect(() => {
    document.body.className = '';
  }, []);

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