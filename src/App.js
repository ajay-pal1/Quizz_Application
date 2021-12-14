import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Header from "./Header";

import Login from "./components/account/login.component";
import SignUp from "./components/account/signup.component";

import Home from "./components/userDashboard/Home";
import Subcategory from "./components/userDashboard/subcategory";
import Watingoppenent from "./components/userDashboard/wating";
import Matchpage from "./components/userDashboard/matchpage";
import Result from "./components/userDashboard/result";


import Addquestion from "./components/adminDashboard/addquestion";
import Viewquestion from "./components/adminDashboard/viewquestion";


function App() {
  let user = JSON.parse(localStorage.getItem('user-info'))

  return (
    <div>
      <>
        <BrowserRouter>
          <Header />
          <Routes>
            {
              user ?
                <>
                  {user.is_staff === true ?
                    <>
                      <Route path='/admin/view' element={<Viewquestion />} />
                      <Route path='/admin/add' element={<Addquestion />} />
                    </>
                    :
                    <>
                      <Route path="/home" element={<Home />} />
                      <Route path="/sub_category" element={<Subcategory/>} />
                      <Route path="/waiting" element={<Watingoppenent />} />
                      <Route path="/matchstart" element={<Matchpage />} />
                      <Route path="/result" element={<Result />} />
                    </>
                  }
                </>
                : <>
                  <Route exact path='/' element={<Login />} />
                  <Route path="/sign-up" element={<SignUp />} />
                </>
            }
          </Routes>
        </BrowserRouter>
      </>
    </div>

  )
}

export default App;
