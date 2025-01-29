// import './App.css';
import { useState } from 'react';
import { DataContext } from './context/dataProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import Home from './Pages/home';
import Header from './Pages/header';
import Detail from './Pages/detail';
import Cart from './Pages/cart';

function App() {

  const [account, setAccount] = useState('');
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product)=>{
    const updatedCart = [...cartItems, product[0]];

    setCartItems(updatedCart);
  }

  const removeFromCart= (id)=>{
    const removeItem = cartItems.filter(xyz=>xyz.id!==id);
    setCartItems(removeItem);
  }

  return (
    <>
      <DataContext.Provider value={{ account, setAccount }}>
        <BrowserRouter>

          <Header cartItems={cartItems}/>
          <Routes>

            <Route path='/' element={<Home />} />
            <Route path='/detail/:id' element={<Detail addToCart={addToCart} cartItems={cartItems} />} />
            <Route path='/cart' element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />} />
          </Routes>

        </BrowserRouter>
      </DataContext.Provider>

    </>
  )
}

// i made ecommerce website using react so in this how to add different  different  products with it's multiple quantities from product pages to n Cart section page with just react or javascript without using redux ?

export default App;