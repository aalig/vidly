import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Movies from './components/feature/movies'
import NavBar from './components/common/nav/navbar'
import Customers from './components/feature/customers'
import Rentals from './components/feature/rentals'
import Login from './components/feature/login'
import NotFound from './components/common/utils/notFound'
import MovieForm from './components/feature/movieForm'
import './App.css'

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main className='container'>
        <Switch>
          <Route path='/movies/:id' component={MovieForm} />
          <Route path='/movies' component={Movies} />
          <Route path='/customers' component={Customers} />
          <Route path='/rentals' component={Rentals} />
          <Route path='/login' component={Login} />
          <Route path='/not-found' component={NotFound} />
          <Redirect from='/' exact to='/movies' />
          <Redirect to='/not-found' />
        </Switch>
      </main>
    </React.Fragment>
  )
}

export default App
