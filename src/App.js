import React from 'react';
import { BrowserRouter } from "react-router-dom"
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

  }, [])


  return (
    <BrowserRouter>
      <div className="App">
        <div className='content'>
          <div> <Header></Header></div>
          <div className='cont-mgt80'>
            <AppRouter />
          </div>
        </div>

        <Footer></Footer>
        {/* <DatabaseService></DatabaseService> */}
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


    </BrowserRouter>
  );
})

export default App;

