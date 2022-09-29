import React from 'react';
// eslint-disable-next-line no-unused-vars
import { BrowserRouter, HashRouter } from "react-router-dom"
import './App.css';
import { useEffect } from 'react';
import { observer } from "mobx-react-lite";
import Header from './Components/Header/Header';
import { MainStore } from './Store/MainStore'
import 'bootstrap/dist/css/bootstrap.min.css';

import AppRouter from './Components/AppRouters/AppRouter';
import Footer from './Components/Footer/Footer';
import MsgModal from './Components/Modal/MsgModal';
import DishInfoModal from './Components/Modal/DishInfoModal';


const App = observer(() => {
  // let shopStore = MainStore.shopStore
  let currenUserNow = MainStore.userNow
  let msgStore = MainStore.infoMsg
  let infoDish = MainStore.infoDish


  useEffect(() => {

    let dataLocalStore = localStorage.getItem('userSushi')

    if (dataLocalStore) {
      if (dataLocalStore === 'undefined') {
        localStorage.setItem('userSushi', JSON.stringify({}));
      } else {
        dataLocalStore = JSON.parse(dataLocalStore)
        currenUserNow.setIsAuth(true)
        currenUserNow.setUser(dataLocalStore)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <BrowserRouter>
      {/* <HashRouter > */}
      <div className="App">
        <div className='content'>
          <div> <Header></Header></div>
          <div className='cont-mgt80'>
            <AppRouter />
          </div>
        </div>

        <Footer></Footer>
      </div>
      <MsgModal
        show={msgStore.show}
        onHide={() => msgStore.hideMsg()}
        msg={msgStore.msg}
      />

      {infoDish.show && <DishInfoModal
        show={infoDish.show}
        onHide={() => infoDish.hideMsg()}
      />}


      {/* </HashRouter> */}
    </BrowserRouter >
  );
})

export default App;

