import React, { useContext, useState } from 'react';
import AppContext from '../../context/AppContext';
import formatCurrency from '../../utils/formatCurrency';

import './Checkout.css';

function Checkout() {
  const { cartItems } = useContext(AppContext);
  const [address, setAddress] = useState('');
  const [cep, setCep] = useState('');
  const [city, setCity] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [orderSent, setOrderSent] = useState(false);

  const totalPrice = cartItems.reduce((acc, item) => item.price + acc, 0);

  const handleFinishOrder = (e) => {
    e.preventDefault();
    console.log('Pedido finalizado:', {
      items: cartItems,
      totalPrice,
      address,
      cep,
      city,
      paymentMethod,
    });
    setOrderSent(true);
    setTimeout(() => {
      window.location.href = '/'; // Redireciona para a página principal após 3 segundos
    }, 3000);
  };

  // const handlePaymentChange = (e) => {
  //   setPaymentMethod(e.target.value);
  // };

  return (
    <>
      {orderSent ? (
        <>
          <div className="success-message">
            <p>Pedido enviado com sucesso!</p>
          </div>
        </>
      ) : (
        <div className="checkout container">
          <div className="summary">
            <h3>Resumo do Pedido</h3>
            {cartItems.map((item) => (
              <div key={item.id} className="item">
                <img src={item.thumbnail} alt={item.title} className="item-image" />
                <div className="item-details">
                  <p className="title">{item.title}</p>
                  <p className="price">{formatCurrency(item.price, 'BRL')}</p>
                  <p>Quantidade: 1</p> {/* Você pode ajustar para exibir a quantidade real se houver */}
                </div>
              </div>
            ))}
            <p className="total">Total: {formatCurrency(totalPrice, 'BRL')}</p>
          </div>
          <form onSubmit={handleFinishOrder}>
            <input type="text" placeholder="Endereço" value={address} onChange={(e) => setAddress(e.target.value)} />
            <input type="text" placeholder="CEP" value={cep} onChange={(e) => setCep(e.target.value)} />
            <input type="text" placeholder="Cidade" value={city} onChange={(e) => setCity(e.target.value)} />
            <div className="input-options">
              <h5>Forma de Pagamento</h5>
              <div className="pix">
                <input className="input-container" type="radio" id="pix" name="paymentMethod" value="Pix" checked={paymentMethod === 'Pix'} onChange={(e) => setPaymentMethod(e.target.value)} />
                <label htmlFor="pix">Pix</label>
              </div>
              <div className="cartao">
                <input className="input-container" type="radio" id="card" name="paymentMethod" value="Cartão" checked={paymentMethod === 'Cartão'} onChange={(e) => setPaymentMethod(e.target.value)} />
                <label htmlFor="card">Cartão</label>
              </div>
              <div className="dinheiro">
                <input className="input-container" type="radio" id="dinheiro" name="paymentMethod" value="Dinheiro" checked={paymentMethod === 'Dinheiro'} onChange={(e) => setPaymentMethod(e.target.value)} />
                <label htmlFor="dinheiro">Dinheiro</label>
              </div>
            </div>
            <div className="button-div">
              <button className="button__finalizar" type="submit">
                Finalizar Pedido
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default Checkout;
