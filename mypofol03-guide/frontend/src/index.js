import React from "react"
import ReactDOM from 'react-dom/client';
import App from './App';

//
// replace console.* for disable log on production mode
//
if (process.env.NODE_ENV === 'production') {
    console.log = () => { };
    console.error = () => { };
    console.debug = () => { };
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);