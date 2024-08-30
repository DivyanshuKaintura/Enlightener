import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';
import Deep from './components/Deep.jsx';
import Header from './components/Header.jsx';
import Chat from './components/Chat.jsx';
import Footer from './components/Footer.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <Deep />
    <Chat />
    <Footer />
  </React.StrictMode>
);

