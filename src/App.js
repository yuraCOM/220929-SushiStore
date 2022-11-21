import React from 'react';
// eslint-disable-next-line no-unused-vars
import { BrowserRouter, HashRouter, } from "react-router-dom"
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
import toast, { Toaster } from 'react-hot-toast';
import moment from 'moment/dist/moment';
import 'moment/dist/locale/ru';
import { follow } from './FireBase/DatabaseService';

moment.locale('ru');


const App = observer((props) => {

  const adminStore = MainStore.adminStore
  const currenUserNow = MainStore.userNow
  const msgStore = MainStore.infoMsg
  const infoDish = MainStore.infoDish



  useEffect(() => {

    let dataLocalStore = localStorage.getItem('userSushi')

    if (dataLocalStore) {
      if (dataLocalStore === 'undefined') {
        localStorage.setItem('userSushi', JSON.stringify({}));
      } else {
        dataLocalStore = JSON.parse(dataLocalStore)
        currenUserNow.setIsAuth(true)
        currenUserNow.setUser(dataLocalStore)
        follow(currenUserNow.user)
      }
    }
    !currenUserNow.isAuth && msgStore.showMsg()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (currenUserNow.user.userRole === 'ADMIN' && adminStore.qtyNewOrders > 0) {
      notify(adminStore.qtyNewOrders)
    }

  }, [adminStore.qtyNewOrders, currenUserNow.user.userRole])

  const notify = (n) => toast((t) => (
    <span>
      {moment().format('L LT')} * NewOrders: <b>{n}</b>
      <button className='btn-del-order btn btn-outline-danger btn-sm' onClick={() => toast.remove(t.id)}>
        x
      </button>
    </span>
  ));


  return (
    // <BrowserRouter>
    <HashRouter >
      <div className="App">
        <div className='content'>
          <div> <Header></Header></div>
          <div className='cont-mgt80'>
            <AppRouter />
          </div>
        </div>
        <Footer></Footer>

        {currenUserNow.isAuth && currenUserNow.user.userRole === 'ADMIN' &&
          <Toaster position="bottom-right" reverseOrder={true}
            toastOptions={{
              duration: 1 / 0,
              style: {
                background: '#00bcd4',
              },
            }}
          />}
      </div>

      {/* //msg - стартовое инфо окно  */}
      < MsgModal
        show={msgStore.show}
        onHide={() => msgStore.hideMsg()}
        msg={msgStore.msg}
      />

      {infoDish.show && <DishInfoModal
        show={infoDish.show}
        onHide={() => infoDish.hideMsg()}
      />}

    </HashRouter>
    // {/* </BrowserRouter > */}
  );
})

export default App;

