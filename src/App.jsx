import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Provider from './context/Provider';
import Header from './Components/Header/Header';
import Products from './Components/Products/Products';
import Cart from './Components/Cart/Cart';
import Checkout from './Components/Checkout/Checkout';

function App() {
  return (
    <Router>
      <Provider>
        <Header />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <Cart/>
      </Provider>
    </Router>
  );
}

export default App;
