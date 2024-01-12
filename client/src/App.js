import React, { useEffect } from 'react'
import store from './store'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import PageNotFound from './components/pages/error/PageNotFound'
import AppNavbar from './components/partials/AppNavbar'
import Footer from './components/partials/Footer'
import Dashboard from './components/pages/Dashboard'
import Home from './components/pages/Home'
import Manager from './components/pages/manager/Manager'
import Matches from './components/pages/matches/Matches'
import Players from './components/pages/Players'
import Training from './components/pages/Training'
import Register from './components/pages/auth/Register'
import PrivateRoutes from './privateRoutes/PrivateRoutes'
import { loadUser } from './actions/authActions'
import { io } from 'socket.io-client'

const App = () => {
  const socket = io('/', {
    transports: ['websocket'],
    path: '/socket',
  })

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected');
    });
    socket.on('event', (data) => {
      console.log(data);
    });

  }, []);

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <BrowserRouter>
      <AppNavbar />
      <Switch>
        <Route exact path='/' component={Dashboard} />
        <Route path='/register' component={Register} />
        <PrivateRoutes path='/manager' component={Manager} />
        <PrivateRoutes path='/matches' component={Matches} />
        <PrivateRoutes path='/training' component={Training} />
        <PrivateRoutes path='/player' component={Players} />
        <PrivateRoutes path='/home' component={Home} />
        <PrivateRoutes path='/user/:name' component={Manager} />
        <PrivateRoutes component={PageNotFound} />
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}

export default App
