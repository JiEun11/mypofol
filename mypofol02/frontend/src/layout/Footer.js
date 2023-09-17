import React from "react";
import '../assets/css/layout/footer.css';

const Footer = () => {
  return (
    <div class="footer">
      <div class="content-inner">
        <div class="row align-items-center">
          <div class="col-md-6">
            <p>
              &copy; Copyright 2023{" "}
              <a href="https://github.com/JiEun11">Bella Jin</a>. All Rights
              Reserved
            </p>
          </div>
          <div class="col-md-6">
            <p>
              Powered by <a href="https://github.com/JiEun11">Bella Jin</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
