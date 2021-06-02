import { useState } from 'react';

import AppContext from './context/app-context';

import AppModal from './components/modal/Modal';
import Basket from './pages/basket/Basket';
import Products from './pages/products/Products';

import Logo from './assests/images/vitl-logo.png';
import './App.css';

const App = () => {
  const [data, setData] = useState({
    products: [],
  });
  const [basket, setBasket] = useState([]);
  const [limitReached, setlimitReached] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');

  const contextData = {
    data,
    setData,
    basket,
    setBasket,
    limitReached,
    setlimitReached,
    showModal,
    setShowModal,
    message,
    setMessage,
  };

  return (
    <div className="app-container">
      <img className="logo" src={Logo} alt="Logo"/>
      <AppContext.Provider value={contextData}>
        <AppModal />
        <Basket />
        <Products />
      </AppContext.Provider>
    </div>
  );
};

export default App;
