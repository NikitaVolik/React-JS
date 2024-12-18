import React, {useEffect, useState} from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './views/Main';
import Basket from './views/Basket';
import ModalBox from './components/ModalBox';
import Login from './components/Login';
import Registration from './components/Registration';
import Private from './views/Private';
import Loading from './components/Loading';
import Payment from './components/Payment';

function App() {

  const[page, setPage] = useState('Main')
  const[modalBox, setModalBox] = useState('none')
  const[products, setProducts] = useState([])
  const[productsInBasket, setProductsInBasket] = useState([])


  // Сработает после загрузки нового товара на сервер
  const onLoading = () => {
    console.log('loading');
    // Заново получить с сервера товары
    fetchProducts();
  }

  // Получает с сервера товары
  function fetchProducts() {
    const api = 'http://localhost:9001/products'

    fetch(api)
    .then(result => result.json())
    .then((result) => {
      console.log(result)
      setProducts(result.data)
    })
  }

  function addToBasket(productId){
    // Если продукт уже есть в корзине, не добавляем
    if( productsInBasket.includes(productId) ) return;

    setProductsInBasket([...productsInBasket, productId]);
  }

  function deleteFromBasket(productId){
    setProductsInBasket(productsInBasket.filter(pId => pId !== productId));

  }

  useEffect(() => {
    console.log('use effect')
    fetchProducts();
  }, [])

  const pages = {
    Main: <Main products={products} addToBasket={addToBasket} />,
    Basket: <Basket products={productsInBasket.map(productId => products.find(product => productId === product._id))} deleteFromBasket={deleteFromBasket} setModalBox={setModalBox}/>,
    Private: <Private />
  }

  const modalBoxes = {
    none: null,
    Login: <ModalBox setModalBox={setModalBox}><Login /></ModalBox>,
    Registration: <ModalBox setModalBox={setModalBox}><Registration /></ModalBox>,
    Loading: <ModalBox setModalBox={setModalBox}><Loading onLoading={onLoading} /></ModalBox>,
    Payment: <ModalBox setModalBox={setModalBox}><Payment /></ModalBox>
  }

  return (
    <div className="App">
      <Header setPage={ setPage } setModalBox={setModalBox} />
      { pages[page] }
      { modalBoxes[modalBox] }
      <Footer />
    </div>
  );
}

export default App;