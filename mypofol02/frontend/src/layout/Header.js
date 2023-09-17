import React from 'react';
import '../assets/css/layout/header.css';

const Header = () => {
  return (
    <header class="header">
    <div class="globalbar">
        <div class="inner-start">
            <a href="/" class="app-logo">MyPofol</a>
                <div class="header-context">
                    <ul>
                        <li>
                            <a href="/bella" class="context-item">bella</a>
                        </li>
                    </ul>
                </div>
        </div>
        <div class="inner-end">     
                <a class="header-button has-indicator">
                    <svg viewBox="0 0 16 16" class="inbox">
                        <path d="M2.8 2.06A1.75 1.75 0 0 1 4.41 1h7.18c.7 0 1.333.417 1.61 1.06l2.74 6.395c.04.093.06.194.06.295v4.5A1.75 1.75 0 0 1 14.25 15H1.75A1.75 1.75 0 0 1 0 13.25v-4.5c0-.101.02-.202.06-.295Zm1.61.44a.25.25 0 0 0-.23.152L1.887 8H4.75a.75.75 0 0 1 .6.3L6.625 10h2.75l1.275-1.7a.75.75 0 0 1 .6-.3h2.863L11.82 2.652a.25.25 0 0 0-.23-.152Zm10.09 7h-2.875l-1.275 1.7a.75.75 0 0 1-.6.3h-3.5a.75.75 0 0 1-.6-.3L4.375 9.5H1.5v3.75c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25Z"></path>
                    </svg>
                </a>
                <label class="header-user" for="side-pannel-open">
                    <img src="/images/default_profile.png" />
                </label>                  
        </div>
    </div>
</header>

  );
};

export default Header;